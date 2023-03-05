class DataItemSheetModel {
  constructor(sectionName= '', langId= '', sportType= '', entityType= '', entityId= '', element= '', action= '', text= '') {
    this.sectionName = sectionName;
    this.langId = Number(langId);
    this.sportType = sportType;
    this.entityType = entityType;
    this.entityId = entityId;
    this.element = Number(element);
    this.action = action;
    this.text = text;
  }

  get term() {
    //create term [SectionName]_[SportType]_[EntityType]_[Element]
  }

  addAbove() {
    //add above term
  }

  addBelow() {
    //add below term
  }

  override() {
    //override current term value
  }

  hide() {
    //hide term value
  }
}

module.exports = DataItemSheetModel