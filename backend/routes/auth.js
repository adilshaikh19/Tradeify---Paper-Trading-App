const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async(req, res) => {
    const {username, email, password} = req.body

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User Already Exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password:hashedPassword})
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(201).json({token, userId: user._id, username});
    }catch(error){
        res.status(500).json({message: "Server error"})
    }
}) 

router.post('/login' , async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message : "Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return res
          .status(200)
          .json({ token, userId: user._id, username: user.username });

    }catch(error){
        res.status(500).json({ message: "Server error" });
    }
})


module.exports = router;