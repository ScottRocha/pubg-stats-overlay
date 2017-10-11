/* eslint-disable no-process-env */

const { PubgAPI } = require("pubg-api-redis");

const config = {
  "redisConfig": {
    "host": process.env.REDIS_HOST,
    "port": process.env.REDIS_PORT,
    "expiration": 300, // Optional - defaults to 300.
    "password": process.env.REDIS_PASSWORD,
  },
};

const api = new PubgAPI(Object.assign({}, { "apikey": process.env.PUBG_API_KEY }, config));

class StatsAPI {

  static getProfileByNickname(nickname) {

    return api.getProfileByNickname(nickname);

  }

  static getAccountBySteamID(id) {

    return api.getAccountBySteamID(id);

  }

}

module.exports = StatsAPI;
