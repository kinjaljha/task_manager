const Task = require("../models/task.model");
const uuidv1 = require("uuid/v1");

async function deleteTask(req, res) {
    try {
        let old = { task_id: req.params.id };
        date = Date.now();
        var newvalues = { $set: { deleted_at: date } };

        let task = await Task.findOne(old);
        if (task.deleted_at)
            return res.status(404).json({ message: "Task Not Found" });
        task = await Task.updateOne(old, newvalues);

        if (!task.ok)
            return res
                .status(500)
                .json({ message: "Database Error", error: task });

        return res.status(201).json({ message: "Task Deleted" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

async function updateTask(req, res) {
    try {
        let old = { task_id: req.params.id };
        var newvalues = { $set: req.body };

        let task = await Task.findOne(old);
        if (task.deleted_at)
            return res.status(404).json({ message: "Task Not Found" });

        task = await Task.updateOne(old, newvalues);
        if (!task.ok)
            return res
                .status(400)
                .json({ message: "Invalid Entries", details: req.body });

        return res.status(201).json({ message: "Task Updated" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

async function getTasks(req, res) {
    try {
        let query = { deleted_at: null };
        let projections = {
            task_id: 1,
            task_name: 1,
            assigned_member: 1,
            assignee: 1,
            status: 1,
            _id: 0
        };
        let task = await Task.find(query, projections);
        return res.status(200).json({ data: task });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

async function getTask(req, res) {
    try {
        let query = { task_id: req.params.id, deleted_at: null };
        let projections = {
            task_id: 1,
            task_name: 1,
            assigned_member: 1,
            assignee: 1,
            status: 1,
            _id: 0
        };
        let task = await Task.findOne(query, projections);
        if (!task) return res.status(404).json({ message: "Task Not Found" });

        return res.status(200).json({ data: task });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

async function createTask(req, res) {
    try {
        let task = new Task({
            task_id: uuidv1(),
            task_name: req.body.task_name,
            assigned_member: req.body.assigned_member,
            assignee: req.body.assignee,
            status: req.body.status
        });

        await task.save();
        return res.status(201).json({ message: "Task Created successfully" });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res
                .status(400)
                .json({ message: "Invalid Entries", details: req.body });
        }
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

module.exports = {
    getTasks,
    getTask,
    deleteTask,
    updateTask,
    createTask
};
