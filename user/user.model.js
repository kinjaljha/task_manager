const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    email: {
        type: String,
        // trim: true,
        // lowercase: true,
        unique: true,
        required: true
        // validate: [validateEmail, "Please fill a valid email address"],
        // match: [
        //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        //     "Please fill a valid email address"
        // ]
    },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
});
UserSchema.index({ user_id: 1 });

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email);
// };

module.exports = mongoose.model("User", UserSchema);
