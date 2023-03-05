class DataStorageManager {
  constructor() {
    this.data = null;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value
  }
}

module.exports = new DataStorageManager();