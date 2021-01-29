const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({

    username : {type: String, unique: true, required:true}, 
    articles:    {
        type: Schema.Types.ObjectId,
        ref: "Article"
      }

});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;