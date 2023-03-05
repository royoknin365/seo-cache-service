const RedisManager = require('./managers/redis/redis-manager')
const SpreadsheetManager = require('./managers/spreadsheet/spreadsheet-manager')
const REDIS = require("./managers/redis/redis.consts");
const SpreadsheetModel = require("./models/spreadsheet.model");

const getDataFromSpreadsheet = async () => {
  console.log('try reading from ss...')
  await SpreadsheetManager.init();
  const allSheets = await SpreadsheetManager.getAllSheets(process.env.SPREADSHEET_ID)
  const key = REDIS.KEYS.spreadsheet;
  const lastModified = await setLastModified();
  const storage = new SpreadsheetModel(key, lastModified, allSheets);

  await RedisManager.setValue(key, storage);
  await RedisManager.publishClient(key, storage)
}

const setLastModified = async () => {
  const date = new Date();
  const lastModified = date.toString();
  await RedisManager.setValue(REDIS.KEYS.lastModified, lastModified);

  return lastModified;
}

const setDataInCache = async () => {
  await RedisManager.getValue(REDIS.KEYS.lastModified, async (err, data) => {
    let lastModified = null;
    if (err) throw err;

    if (data !== null) {
      lastModified = new Date(JSON.parse(data));
      const updateCache = dateDiffInSeconds(new Date(), lastModified) > REDIS.updateCacheTimeBySeconds;

      if(updateCache){
        return await getDataFromSpreadsheet()
      } else {
        console.log('Redis cache already updated :-)')
      }
    } else {
      return await getDataFromSpreadsheet()
    }
  })
}

const dateDiffInSeconds = (date1, date2) => {
  const oneSecond = 1000;

  const diffInTime = date1.getTime() - date2.getTime(); // difference in milliseconds
  const diffInSeconds = Math.round(diffInTime / oneSecond); // round to nearest second
  return diffInSeconds;
}

module.exports = {setDataInCache}