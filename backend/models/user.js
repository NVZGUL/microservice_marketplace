const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
    },
    google: {
        id: String,
        token: String
    }
});

userSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(9));
userSchema.methods.validPassword = (password) => bcrypt.compareSync(password, this.password);

const User = mongoose.model('User', userSchema);
module.exports = User;