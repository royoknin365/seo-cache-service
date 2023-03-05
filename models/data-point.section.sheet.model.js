class DataPointSectionSheetModel {
  constructor(name = "", element= "", type = "", isRequired = "false", category = 1, linkType = null, aliasName = null) {

    this.name = name;
    this.element = element;
    this.type = type;
    this.isRequired = isRequired.toLowerCase() === "true";
    this.category = parseInt(category);
    this.linkType = linkType;
    this.aliasName = aliasName;
  }
}

module.exports = DataPointSectionSheetModel