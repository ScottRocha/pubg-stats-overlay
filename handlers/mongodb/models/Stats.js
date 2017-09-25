const mongoose = require("mongoose");

module.exports = (mongodb) => {

  const StatsSchema = new mongoose.Schema({
    "api_key": { "type": String, "required": true },
    "profile_name": { "type": String, "required": true },
    "stat_type": { "type": String, "required": true },
    "stat_with_name": { "type": Boolean, "required": true },
    "region": { "type": String, "required": true },
    "season": { "type": String, "required": true },
    "match": { "type": String, "required": true },
    "font_type": { "type": String, "required": true },
    "font_size": { "type": Number, "required": true },
    "animation_type": { "type": Number, "required": true },
    "created_at": { "type": Date, "required": true },
    "last_used_at": { "type": Date, "required": true },
  }, { "versionKey": false, "strict": true, "collection": "stats" });

  return mongodb.model("Stats", StatsSchema);

};
