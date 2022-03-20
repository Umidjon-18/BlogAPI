const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoute = require('./router/auth');
const userRoute = require('./router/user');
const postRoute = require('./router/post');
const categoryRoute = require('./router/category');
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database connected...'))
.catch((err)=>console.log(err));


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/category', categoryRoute);


app.listen(4000, ()=>{
    console.log('Server is running...');
})