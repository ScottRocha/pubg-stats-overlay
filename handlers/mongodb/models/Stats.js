const mongoose = require("mongoose");

module.exports = (mongodb) => {

  const StatsSchema = new mongoose.Schema({
    "account_id": { "type": mongoose.Schema.Types.ObjectId, "required": true },
    "profile_name": { "type": String, "default": "MiracleM4n", "required": true },
    "stat_type": { "type": String, "default": "combat.kills", "required": true },
    "stat_with_name": { "type": Boolean, "default": true, "required": true },
    "region": { "type": String, "default": "agg", "required": true },
    "season": { "type": String, "default": "2017-pre4", "required": true },
    "match": { "type": String, "default": "solo", "required": true },
    "font_type": { "type": String, "default": "Roboto", "required": true },
    "font_size": { "type": Number, "default": "60", "required": true },
    "font_color": { "type": String, "default": "#000000", "required": true },
    "animation_type": { "type": Number, "default": 0, "required": true },
    "created_at": { "type": Date, "default": Date.now(), "required": true },
    "last_used_at": { "type": Date, "default": Date.now(), "required": true },
  }, { "versionKey": false, "strict": true, "collection": "stats" });

  return mongodb.model("stats", StatsSchema);

};
