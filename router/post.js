const router = require('express').Router();
const User = require('../model/user');
const Post = require('../model/post');
const fs = require('fs');
const uploader = require('../utils/fileUploader');




// CREATE POST 

router.post('/', uploader.single('photo'), async(req, res)=>{
        try {
            const newPost = new Post({...req.body, photo: req.file.filename});
            const user = await User.findOne({username: req.body.username});
            !user&&res.status(500).json('User not found!');
            const post = await newPost.save();
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json('Something went wrong!')
        }    
})

// UPDATE

router.put('/:id', uploader.single('photo'), async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {...req.body, photo: req.file.filename}, {new: true});
            fs.unlink('./images/' + post.photo, (err) => {
                if (err) throw err;
              });
            res.status(201).json(updatedPost);
        } else {
            res.status(400).json('You can update only your posts');
        }
    } catch (error) {
            res.status(400).json(error);
    }
})

// DELETE

router.delete('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            post.delete();
            fs.unlink('./images/' + post.photo, (err) => {
                if (err) throw err;
              });
            res.status(201).json('Post has been deleted!');
        } else {
            res.status(400).json('You can delete only your posts!');
        }
    } catch (error) {
            res.status(400).json(error);
    }
})

// GET POST

router.get('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(201).json(post);
    } catch (error) {
            res.status(400).json(error);
    }
})

// GET ALL POSTS

router.get('/', async(req, res)=>{
    const username = req.query.username;
    const categoryName = req.query.catName;
    try {
        if(username){
            const posts = await Post.find({username});
            res.status(200).json(posts);
        } else if(categoryName){
            const posts = await Post.find({
                categories: { $in:[categoryName] }
            });
            res.status(200).json(posts);
        }
    } catch (error) {
        
    }
})


module.exports = router;