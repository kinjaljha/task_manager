const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MemberSchema = new Schema({
    member_name: { type: String, required: true, max: 100 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    created_by: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model("Member", MemberSchema);
