const redis = require('redis')
const {promisify} = require('util');

const client = redis.createClient({
  // socket: {
  //   host: 'web-seo-managment-tool.sytl4r.ng.0001.use1.cache.amazonaws.com',
  //   port: 6379
  // },
  // url: 'redis://default:redispw@localhost:32768',
  legacyMode: true
});

client.on('message', (channel, message) => {
  console.log(`Received message on channel ${channel}: ${message}`);
});

// client.on('error', err => console.log('Error ' + err));

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

const getValue = async (key, promise) => {
  await client.get(key, promise)
}

const setValue = async (key, val) => {
  const value = JSON.stringify(val);
  await client.set(key, value)
}

const deleteValue = async (key) => {
  await client.del(key)
}

const startClient = async () => {
  await client.connect();
  console.log('connected...')
}

const stopClient = async (msg) => {
  await client.disconnect();
  console.log('disconnected...', msg)
}

const publishClient = async (key, obj) => {
  const stringifyObj = JSON.stringify(obj);

  await client.sPublish(key, Buffer.from(stringifyObj));
}

const subscribeClient = async (key, promise) => {
  await client.sSubscribe(key, promise);
}

module.exports = {getValue, setValue, deleteValue, startClient, stopClient, publishClient, subscribeClient, setAsync, getAsync};
