class SpreadsheetModel {
  constructor(key, lastModified, sheets) {
    this.key = key;
    this.lastModified = lastModified;
    this.sheets = sheets;
  }
}

module.exports = SpreadsheetModel;