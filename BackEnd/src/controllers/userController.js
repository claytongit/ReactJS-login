const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfg = require('../config/auth');

module.exports = {
    async store(req, res){
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if(!user){
            return res.status(400).send({ error: "User not found" });
        }

        if(!await bcryptjs.compare(password, user.password) ){
            return res.status(400).send({ error: "Invalid password" });
        }

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfg.secret, { expiresIn: 86400 });

        return res.send({ user, token });
    }
}