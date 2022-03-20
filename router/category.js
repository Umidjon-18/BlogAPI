const router = require('express').Router();
const Category = require('../model/category');

// CREATE CATEGORY

router.post('/', async(req, res)=>{
        try {
            const newCat = new Category(req.body);
            const cat = await newCat.save();
            res.status(200).json(cat);
        } catch (error) {
            res.status(400).json(error)
        }    
});

// GET ALL CATEGORIES

router.get('/', async(req, res)=>{
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (error) {
        res.status(400).json(error)
    }    
});





module.exports = router;