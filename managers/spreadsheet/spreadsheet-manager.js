const SheetModel = require("../../models/sheet.model");
const SPREADSHEET = require("./spreadsheet.consts");
const CustomDataSheetModel = require("../../models/custom-data.sheet.model");
const SectionDataSheetModel = require("../../models/section-data.sheet.model");
const {google} = require("googleapis");

let auth, spreadsheetClient, service;

const init = async () => {
  auth = new google.auth.GoogleAuth({
    keyFile: process.env.SPREADSHEET_KEY_FILE,
    scopes: process.env.SPREADSHEET_SCOPES,
  });

  spreadsheetClient = await auth.getClient() // Create client instance for auth
  service = google.sheets({version: process.env.SPREADSHEET_VERSION, auth: spreadsheetClient});  // Instance of Google Sheets API
};

const readFromSheet = async (spreadsheetId, sheetTitle) => {
  if(spreadsheetId) {
    return await service.spreadsheets.values.get({auth, spreadsheetId, range: sheetTitle})
      .then((data) => data); // Read rows from spreadsheet
  }
}

const getSheet = async (spreadsheetId, sheetModel) => {
  if(spreadsheetId) {
    return await readFromSheet(spreadsheetId, sheetModel.title).then((sheet) => {
      const rows = sheet.data.values?.filter(row => row.length > 0);

      return new (sheetType(sheetModel))(sheetModel, rows);
    });
  }
}

const getAllSheets = async (spreadsheetId) => {
  const metadata = await service.spreadsheets.get({auth, spreadsheetId});
  const sheets = metadata.data.sheets.map(sheet => new SheetModel(sheet.properties))
    .filter(sheet => !SPREADSHEET.invalidSheetsId.includes(sheet.sheetId));

  return Promise.all(sheets.map(async sheet => await getSheet(process.env.SPREADSHEET_ID, sheet).then(dataSheet => dataSheet)));
}

const sheetType = (model) => model.sheetId === 0 ? CustomDataSheetModel : SectionDataSheetModel;

module.exports = {init, getSheet, getAllSheets, sheetType};
