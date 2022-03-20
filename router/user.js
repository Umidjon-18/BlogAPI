const router = require('express').Router();
const User = require('../model/user');
const Post = require('../model/post');
const bcrypt = require('bcrypt');


// UPDATE

router.put('/:id', async(req, res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{new: true});
            res.status(201).json(updatedUser);
        } catch (error) {
            res.status(400).json('Something went wrong!')
        }
    } else {
        res.status(401).json('You can update only your account');
    }
    
    
})

// DELETE

router.delete('/:id', async(req, res)=>{
    if(req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id);
            if(user){
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json('User has been deleted!')
            } else {
                res.status(500).json('User not found!')
            }
        } catch (error) {
            res.status(400).json(error);
        }
        
    } else {
        res.status(401).json('You can delete only your account!');
    }  
})

// GET USER

router.get('/:id', async(req, res)=>{
        try {
            const user = await User.findById(req.params.id);
            const {password, ...others} = user._doc;
            res.status(201).json(others);
        } catch (error) {
            res.status(400).json(error);
        }
})



module.exports = router;