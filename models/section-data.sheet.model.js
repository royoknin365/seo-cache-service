const DataPointSectionSheetModel = require("./data-point.section.sheet.model");
const SectionElementSheetModel = require("./section-element.sheet.model");
const DataSheetModel = require("./data.sheet.model");

class SectionDataSheetModel extends DataSheetModel {
  get data() {
    let dataPoints = []
    let elements = this.rows[0].map((name, index) => index !== 0 ? new SectionElementSheetModel(name, this.title, this.rows[1][index]) : null).filter(x => !!x);

    this.rows.forEach((row, index) => {
      if (index > 2) {
        dataPoints.push(new DataPointSectionSheetModel(row[0], row[1], row[2], row[3], row[4], row[5], row[6]));
      }
    });

    elements.forEach(element => element.dataPoints = dataPoints.filter((dataPoint => dataPoint.element === element.name)))

    return elements;
  }
}

module.exports = SectionDataSheetModel