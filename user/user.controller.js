const uuidv4 = require("uuid/v4");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const User = require("./user.model");

async function createUser(req, res) {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let user = await User.create({
            user_id: uuidv4(),
            email: req.body.email,
            password: hashedPassword
        });
        let token = jwt.sign(
            { id: user.user_id, email: user.email },
            config.secret,
            {
                expiresIn: 86400 // expires in 24 hours
            }
        );
        return res.status(201).json({
            message: "User created successful",
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "There was a problem registering the user.",
            error
        });
    }
}
async function login(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email,
            deleted_at: null
        });
        const compare = await bcrypt.compare(req.body.password, user.password);
        if (!compare)
            return res.status(400).json({
                message: "Invalid email or password",
                details: req.body
            });

        let token = jwt.sign(
            { id: user.user_id, email: user.email },
            config.secret,
            {
                expiresIn: 86400 // expires in 24 hours
            }
        );
        return res
            .status(200)
            .json({ message: "User logged in successfully", token });
    } catch (error) {
        return res.status(500).json({
            message: "There was a problem logging in the user.",
            error
        });
    }
}
async function changePassword(req, res) {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let query = { email: req.user.email, deleted_at: null };
        let user = await User.updateOne(query, {
            $set: { password: hashedPassword }
        });
        return res
            .status(201)
            .json({ message: "Password changed successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "There was a problem in changing the password",
            error
        });
    }
}

module.exports = {
    createUser,
    login,
    changePassword
};
