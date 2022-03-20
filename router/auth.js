const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// REGISTER

router.post('/register', async(req, res)=>{
    try {
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        const user = await newUser.save();
        const {password, ...others} = user._doc;
        user?res.status(200).json(others):res.status(400).json('Wrong credentials');
    } catch (error) {
        console.log(error);
    }
    
})

// LOGIN

router.post('/login', async(req, res)=>{
    try {
        const isUser = await User.findOne({
            username: req.body.username,
            email: req.body.email
        });
        if(isUser){
            const check = await bcrypt.compare(req.body.password, isUser.password);
            !check&&res.status(400).json('Password is wrong!');
            const {password, ...others} = isUser._doc;
            res.status(200).json(others);
        } else {
            res.status(400).json('User not found!');
        }
    } catch (error) {
        res.status(400).json('Something went wrong !');
    }
    
    
})

module.exports = router;