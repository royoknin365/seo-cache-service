class SectionElementSheetModel {
  constructor(name = "", sectionName, minDataPoints = 0, dataPoints) {
    this.name = name;
    this.sectionName = sectionName;
    this.minDataPoints = Number(minDataPoints);
    this.dataPoints = dataPoints;
  }
}

module.exports = SectionElementSheetModel