/* eslint-disable no-process-env */

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const jobs = require("../../jobs");

module.exports = (logger) => {

  logger.info("Using MongoDB database...");

  const dbConnectionString = "mongodb://"
    + process.env.DATABASE_USERNAME + ":"
    + process.env.DATABASE_PASSWORD + "@"
    + process.env.DATABASE_HOST + ":"
    + process.env.DATABASE_PORT + "/"
    + process.env.DATABASE_NAME;

  const connection = mongoose.createConnection(dbConnectionString, {
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "reconnectTries": 30,
    "useMongoClient": true,
  });

  const stats = require("./models/Stats")(connection);

  connection.on("connecting", () => {

    logger.info("connecting to MongoDB...");

  });

  connection.on("error", (error) => {

    logger.error("Error in MongoDb connection: " + error);
    mongoose.disconnect();

  });

  connection.on("open", () => {

    logger.info("MongoDB connection opened!");

    jobs.startAllJobs({
      connection,
      "models": { stats },
    }, logger);

  });

  connection.on("connected", () => {

    logger.info("MongoDB connected!");

  });

  connection.on("reconnected", () => {

    logger.info("MongoDB reconnected!");

  });

  connection.on("disconnected", () => {

    logger.info("MongoDB disconnected!");

    jobs.stopAllJobs();

    mongoose.connect(dbConnectionString, { "server": { "auto_reconnect": true } });

  });

  return {
    connection,
    "models": { stats },
  };

};
