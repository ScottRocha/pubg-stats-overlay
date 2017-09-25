const cron = require("node-cron");

let collectionCleanupJob = null;

module.exports = {

  "startAllJobs": (mongodb, logger) => {

    collectionCleanupJob = cron.schedule("0 0 * * *", () => {

      require("./cleanupCollection")(mongodb.models.stats, logger);

    }, true);

  },

  "stopAllJobs": () => {

    collectionCleanupJob || collectionCleanupJob.stop();

  },

};
