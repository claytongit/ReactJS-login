const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({ email })

        if(!user){
            user = await User.create(req.body);   

            
            user.password = undefined;

            
            const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400, });

            return res.send({ user, token });
            
        }else {
            return res.status(400).send({ error: 'User exists' });
        }   
        
    },
    async show(req, res){
        const user = await User.find();

        return res.json(user);
    }
};