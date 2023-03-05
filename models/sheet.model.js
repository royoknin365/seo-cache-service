class SheetModel {
  constructor(model) {
    this.sheetId = model.sheetId;
    this.title = model.title;
    this.index = model.index;
  }

  get isCustomData() {
    return this.sheetId === 0;
  }
}

module.exports = SheetModel