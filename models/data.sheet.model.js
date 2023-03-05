const SheetModel = require("./sheet.model");

class DataSheetModel extends SheetModel {
  constructor(model, rows) {
    super(model)

    this.rows = rows;
  }

  get data() {}
}

module.exports = DataSheetModel