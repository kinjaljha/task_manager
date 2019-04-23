const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
    },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
});
UserSchema.index({ user_id: 1 });

module.exports = mongoose.model("User", UserSchema);
