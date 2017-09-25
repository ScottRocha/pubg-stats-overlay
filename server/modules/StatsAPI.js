/* eslint-disable no-process-env */

const { PubgAPI } = require("pubg-api-redis");

// const config = {
//   "redisConfig": {
//     "host": process.env.REDIS_HOST,
//     "port": process.env.REDIS_PORT,
//     "expiration": 300, // Optional - defaults to 300.
//     "password": process.env.REDIS_PASSWORD,
//   },
// };

class StatsAPI {

  constructor(key) {

    this.api = new PubgAPI(Object.assign({}, { "apikey": key })) // , config));

  }

  getProfileByNickname(nickname) {

    return this.api.getProfileByNickname(nickname);

  }

  getAccountBySteamID(id) {

    return this.api.getAccountBySteamID(id);

  }

}

module.exports = StatsAPI;
