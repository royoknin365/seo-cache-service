const DataItemSheetModel = require("./data-item.sheet.model");
const DataSheetModel = require("./data.sheet.model");

class CustomDataSheetModel extends DataSheetModel {
  get data() {
    let customData = this.rows.map((row, index) =>
      index !== 0 ? new DataItemSheetModel(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]) : null)
      .filter(x => !!x);

    return customData;
  }
}

module.exports = CustomDataSheetModel