/* eslint-disable camelcase, no-underscore-dangle, no-process-env */

const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt-nodejs");

const { REGION, SEASON, MATCH } = require("pubg-api-redis/src/util/constants");
const { Types } = require("mongoose");

const StatsAPI = require("../modules/StatsAPI");
const FontsAPI = require("../modules/FontsAPI");

const createHashedPassword = (password) => {

  return new Promise((resolve, reject) => {

    const generateSalt = () => {

      return new Promise((res, rej) => {

        bcrypt.genSalt(process.env.HASH_SALT_ROUNDS, (err, result) => {

          if (err) {

            return rej(err);

          }

          return res(result);

        });

      });

    };

    const hashPassword = (salt) => {

      return new Promise((res, rej) => {

        bcrypt.hash(password, salt, null, (err, result) => {

          if (err) {

            return rej(err);

          }

          return res(result);

        });

      });

    };

    generateSalt()
      .then(hashPassword)
      .then((hash) => {

        return resolve(hash);

      }).catch((err) => {

        return reject(err);

      });

  });

};

const compareHashedPassword = (password, hashedPassword) => {

  return new Promise((resolve, reject) => {

    bcrypt.compare(password, hashedPassword, (err, success) => {

      if (err) {

        return reject({
          "message": "Incorrect password used",
          "name": "INVALID_PASSWORD",
        });

      }

      return resolve(success);

    });

  });

};

module.exports = (mongodb) => {

  router.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email) {

      res.status(400).json({
        "message": "No email passed in post",
        "name": "NO_EMAIL",
      });

    } else if (!password) {

      res.status(400).json({
        "message": "No password passed in post",
        "name": "NO_PASSWORD",
      });

    } else {

      const AccountsModel = mongodb.models.accounts;

      const findAccountByEmail = () => {

        return new Promise((resolve, reject) => {

          AccountsModel.findOne({ email })
            .lean()
            .exec((err, account) => {

              if (err || !account) {

                return reject({
                  "message": "Account with that email doesn't exist",
                  "name": "NO_ACCOUNT",
                });

              }

              return resolve(account);

            });

        });

      };

      const verifyPassword = (account) => {

        return new Promise((resolve, reject) => {

          compareHashedPassword(password, account.password)
            .then(() => {

              return resolve(account);

            }).catch((error) => {

              return reject(error);

            });


        });

      };

      findAccountByEmail()
        .then(verifyPassword)
        .then((account) => {

          res.send(account);

        }).catch((error) => {

          res.status(400).json({
            "message": error.message,
            "name": error.name,
          });

        });

    }

  });

  router.post("/register", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (!email) {

      res.status(400).json({
        "message": "No email passed in post",
        "name": "NO_EMAIL",
      });

    } else if (!password) {

      res.status(400).json({
        "message": "No password passed in post",
        "name": "NO_PASSWORD",
      });

    } else {

      const AccountsModel = mongodb.models.accounts;

      const findAccountByEmail = () => {

        return new Promise((resolve, reject) => {

          AccountsModel.findOne({ email })
            .lean()
            .exec((err, account) => {

              if (err || !account) {

                return resolve();

              }

              return reject({
                "message": "Account already exists with that email",
                "name": "ACCOUNT_EXISTS",
              });

            });

        });

      };

      const createAccount = (hashedPassword) => {

        return new Promise((resolve, reject) => {

          AccountsModel.create({ email, "password": hashedPassword, "first_name": firstName, "last_name": lastName },
            (err, account) => {

              if (err) {

                // TODO error handling
                return reject(err);

              }

              return resolve(account);

            });

        });

      };

      findAccountByEmail()
        .then(() => createHashedPassword(password))
        .then(createAccount)
        .then((account) => {

          res.send(account);

        }).catch((error) => {

          res.status(400).json({
            "message": error.message,
            "name": error.name,
          });

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
    const account_id = req.header("userId");

    const profile_name = req.body.profile_name || "MiracleM4n";
    const stat_type = req.body.stat_type || "combat.kills";
    const stat_with_name = req.body.stat_with_name || true;
    const region = req.body.region || REGION.ALL;
    const season = req.body.season || SEASON[Object.keys(SEASON)[Object.keys(SEASON).length - 1]];
    const match = req.body.match || MATCH.DEFAULT;
    const font_type = req.body.font_type || "Roboto";
    const font_size = req.body.font_size || 60;
    const font_color = req.body.font_color || "#000000";
    const animation_type = req.body.animation_type || 0;
    const created_at = new Date();
    const last_used_at = new Date();

    const createOrUpdateExistingStatsById = () => {

      return new Promise((resolve, reject) => {

        StatsModel.findByIdAndUpdate(_id, { "$set": {
          _id, account_id, profile_name, stat_type, stat_with_name,
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
    const userId = req.header("userId");

    const deleteExistingStatsById = () => {

      return new Promise((resolve, reject) => {

        StatsModel.remove({ "_id": id, "account_id": userId }, (err) => {

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
    const userId = req.header("userId");

    const query = {};

    if (id) {

      query._id = id;

    }

    if (userId) {

      query.account_id = userId;

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

      StatsAPI.getProfileByNickname(profile_name).then((profile) => {

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

  router.get("/fonts", (req, res) => {

    FontsAPI.getFonts().then((results) => {

      res.status(200).json(results);

    });

  });

  router.get("/font/:font", (req, res) => {

    const font = req.params.font;

    FontsAPI.getOptions(font).then((result) => {

      res.status(200).json(result);

    });

  });

  return router;

};
