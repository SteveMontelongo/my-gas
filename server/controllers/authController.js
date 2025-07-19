const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRE = '1h';

exports.signup = async (req, res) => {
    const {name, email, password} = req.body;
    console.log(`name: ${name}  email: ${email}  password: ${password}`);
    try{
        if(await User.findOne({email})){
            return res.status(400).json({message: 'User already exists'});
        }

        const newUser = new User({name, email: email.toLowerCase(), password});
        await newUser.save();

        const token = jwt.sign({id: newUser._id}, JWT_SECRET, {expiresIn: TOKEN_EXPIRE});

        res.status(201).json({token, name: newUser.name});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Signup failed'});
    }
};

exports.signin = async (req, res) => {
    const{email, password} = req.body;
    console.log(`email ${email} password ${password}`);
    try{
        const user = await User.findOne({email: email.toLowerCase()});
        //console.log('User object:', user.constructor.name);
        //console.log('comparePassword function:', user.comparePassword);
        if(user == null){
            return res.status(401).json({message: 'Invalid Credentials'});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid Credentials'});
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: TOKEN_EXPIRE});
        res.json({token, name: user.name});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Login Failed'});
    }
}

exports.me = async (req, res) => {
    try{
        const user = await User.findById(req.userId).select('name email');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({name: user.name, email: user.email});
    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
};