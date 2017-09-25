module.exports = (stats, logger) => {

  let date = new Date();
  date = date.setMonth(date.getMonth() - 1);

  stats.remove({ "last_used_at": { "$lt": date } }, (err) => {

    if (err) {

      logger.info(err);

    }

  });

};
