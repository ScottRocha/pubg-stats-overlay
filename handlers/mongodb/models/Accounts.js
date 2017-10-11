const mongoose = require("mongoose");

module.exports = (mongodb) => {

  const AccountsSchema = new mongoose.Schema({
    "email": { "type": String, "required": true },
    "password": { "type": String, "required": true },
    "first_name": { "type": String, "required": false },
    "last_name": { "type": String, "required": false },
  }, { "versionKey": false, "strict": true, "collection": "accounts" });

  return mongodb.model("accounts", AccountsSchema);

};
