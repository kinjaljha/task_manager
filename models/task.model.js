const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    task_id: { type: String, required: true, unique: true },
    task_name: { type: String, required: true, max: 100 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
    assigned_member: { type: String, required: true },
    assignee: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }
});
TaskSchema.index({ task_id: 1 });

module.exports = mongoose.model("Task", TaskSchema);
