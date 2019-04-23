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
        res.status(201).json({
            message: "User created successful",
            token: token
        });
    } catch (err) {
        return res
            .status(500)
            .send("There was a problem registering the user.");
    }
}
async function login(req, res) {
    try {
        // let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        // console.log(hashedPassword);
        let user = await User.findOne({
            email: req.body.email,
            // password: hashedPassword,
            deleted_at: null
        });
        console.log(user);
        const compare = await bcrypt.compare(req.body.password, user.password);
        console.log(compare);
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
        return res.status(200).json({ auth: true, token: token });
    } catch (err) {
        return res.status(500).send("There was a problem logging in the user.");
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
            .json({ message: "Password changed successfully", token: token });
    } catch (err) {
        return res
            .status(500)
            .send("There was a problem in changing the password");
    }
}

module.exports = {
    createUser,
    login,
    changePassword
};
