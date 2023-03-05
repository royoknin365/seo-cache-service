const express = require('express')
const RedisManager = require("./managers/redis/redis-manager");
const DataService = require("./data-service");
require("dotenv").config();

const init = (async () => {
  await RedisManager.startClient();
  await DataService.setDataInCache();
})()

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(3001, () => console.log('server started on port 3001'));