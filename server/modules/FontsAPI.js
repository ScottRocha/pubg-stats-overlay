/* eslint-disable no-process-env */

const weft = require("weft");
weft.apiKey(process.env.GOOGLE_FONTS_API_KEY);


class FontsAPI {

  static getFonts(search) {

    return new Promise((resolve) => {

      weft.search(search, {
        "family": true,
        "sortBy": weft.sortBy.ALPHA,
      }).then((results) => {

        return resolve(results);

      }).catch(() => {

        return resolve([]);

      });

    });

  }

  static getOptions(font) {

    return new Promise((resolve) => {

      weft.view(font).then((result) => {

        return resolve(result);

      }).catch(() => {

        return resolve();

      });

    });

  }

}

module.exports = FontsAPI;
