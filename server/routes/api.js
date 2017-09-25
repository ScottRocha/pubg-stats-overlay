/* eslint-disable camelcase, no-underscore-dangle */

const express = require("express");
const router = express.Router();

const { REGION, SEASON, MATCH } = require("pubg-api-redis/src/util/constants");
const { Types } = require("mongoose");

const StatsAPI = require("../modules/StatsAPI");

module.exports = (mongodb) => {

  router.get("/test", (req, res) => {

    const apiKey = req.query.apiKey || req.header("apiKey");

    try {

      const stats = new StatsAPI(apiKey);

      stats.getProfileByNickname("MiracleM4n").then((profile) => {

        if (profile.playerName === "MiracleM4n") {

          res.status(200).json({});

        } else {

          res.status(400).json({
            "message": "Issue looking up test profile using API key",
            "name": "PROFILE_LOOKUP",
          });

        }


      }).catch((error) => {

        res.status(400).json({
          "message": error.message,
          "name": error.name,
        });

      });

    } catch (error) {

      res.status(400).json({
        "message": error.message,
        "name": error.name,
      });

    }

  });

  router.get("/stat", (req, res) => {

    const StatsModel = mongodb.models.stats;

    const _id = req.query.id;

    const findStatById = () => {

      return new Promise((resolve, reject) => {

        StatsModel.findOne({ _id })
          .lean()
          .exec((err, stat) => {

            if (err) {

              // TODO error handling
              return reject(err);

            }

            return resolve(stat);

          });

      });

    };

    findStatById()
      .then((stat) => {

        res.send(stat);

      })
      .catch((error) => {

        // TODO error handling
        res.send({});

      });

  });

  router.post("/stat", (req, res) => {

    const StatsModel = mongodb.models.stats;

    // eslint-disable-next-line no-underscore-dangle
    const _id = req.body._id || req.body.id || Types.ObjectId();

    const api_key = req.header("apiKey");

    const profile_name = req.body.profile_name || "MiracleM4n";
    const stat_type = req.body.stat_type || "combat.kills";
    const stat_with_name = req.body.stat_with_name || true;
    const region = req.body.region || REGION.ALL;
    const season = req.body.season || SEASON[Object.keys(SEASON)[Object.keys(SEASON).length - 1]];
    const match = req.body.match || MATCH.DEFAULT;
    const font_type = req.body.font_type || "Roboto";
    const font_size = req.body.font_size || 60;
    const animation_type = req.body.animation_type || 0;
    const created_at = new Date();
    const last_used_at = new Date();

    const createOrUpdateExistingStatsById = () => {

      return new Promise((resolve, reject) => {

        StatsModel.findByIdAndUpdate(_id, { "$set": {
          _id, api_key, profile_name, stat_type, stat_with_name,
          region, season, match, font_type, font_size,
          animation_type, created_at, last_used_at,
        } }, { "new": true, "upsert": true }, (err, stat) => {

          if (err) {

            // TODO error handling
            return reject();

          }

          return resolve(stat);

        });

      });

    };

    createOrUpdateExistingStatsById()
      .then((stat) => {

        res.send(stat);

      })
      .catch((error) => {

        // TODO error handling
        res.send({});

      });

  });

  router.delete("/stat", (req, res) => {

    const StatsModel = mongodb.models.stats;

    const id = req.body.id;

    const deleteExistingStatsById = () => {

      return new Promise((resolve, reject) => {

        StatsModel.remove({ "_id": id }, (err) => {

          if (err) {

            // TODO error handling
            return reject();

          }

          return resolve();

        });

      });

    };

    deleteExistingStatsById()
      .then(() => {

        res.send({});

      })
      .catch((error) => {

        // TODO error handling
        res.send({});

      });

  });


  router.get("/stats", (req, res) => {

    const StatsModel = mongodb.models.stats;

    const id = req.query.id;
    const api_key = req.header("apiKey");

    const query = {};

    if (id) {

      query._id = id;

    }

    if (api_key) {

      query.api_key = api_key;

    }

    const findAllStatsByApiKey = () => {

      return new Promise((resolve, reject) => {

        StatsModel.find(query)
          .lean()
          .exec((err, stats) => {

            if (err) {

              // TODO error handling
              return reject(err);

            }

            return resolve(stats);

          });

      });

    };

    findAllStatsByApiKey()
      .then((stats) => {

        res.send(stats);

      })
      .catch((error) => {

        // TODO error handling
        res.send({});

      });

  });

  router.get("/view", (req, res) => {

    const api_key = req.header("apiKey");

    const profile_name = req.query.profile_name || "MiracleM4n";
    const stat_type = req.query.stat_type || "combat.kills";
    const region = req.query.region || REGION.ALL;
    const season = req.query.season || SEASON[Object.keys(SEASON)[Object.keys(SEASON).length - 1]];
    const match = req.query.match || MATCH.DEFAULT;

    const getDescendantProp = (object, descendant) => {

      const array = descendant.split(".");

      while (array.length) {

        object = object[array.shift()];

      }

      return object;

    };

    try {

      const stats = new StatsAPI(api_key);

      stats.getProfileByNickname(profile_name).then((profile) => {

        const view = getDescendantProp(profile.getStats({ region, season, match }), stat_type);

        res.status(200).json({ view });

      }).catch((error) => {

        res.status(400).json({
          "message": error.message,
          "name": error.name,
        });

      });

    } catch (error) {

      res.status(400).json({
        "message": error.message,
        "name": error.name,
      });

    }

  });

  return router;

};
