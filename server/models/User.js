const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, unique: true, lowercase: true, required: true},
    password:{ type: String, unique: true},
}, {timestamps: true});

userSchema.pre('save', async function(next){
    //this.password = await bcrypt.hash(this.password, 10);
    try{
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err);
    }
});

userSchema.methods.comparePassword = function(candidate){
    return bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model(`User`, userSchema, 'users');