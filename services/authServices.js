const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken.js');
const { SECRET } = require('../constans.js')

exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });//User.exists({email})

exports.register = async (name, username, password, repeatPassword) => {

    if (password !== repeatPassword) {
        throw new Error('Password missmatc!');
    }
    //TODO:Check user exists
    //const existingUser = await this.findByUsername(email);
    const existingUser = await User.findOne({
        $or: [
            { username },
            { name }
        ]
    });

    if (existingUser) {
        throw new Error('User  exists!');
    }

    if (username.length < 4) {
        throw new Error('username is too short!');
    }


    if (password.length < 4) {
        throw new Error('The password should be at least four characters long!');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username, password: hashPassword});

    return this.login(username, password);
};


exports.login = async (username, password) => {

     //Email/User exist
     const user = await this.findByUsername(username);
    // console.log(user)
     if (!user) {
         throw new Error('Invalid email or password!');
     }
 
     //Password is valid
     const isValid = await bcrypt.compare(password, user.password);
     if (!isValid) {
         throw new Error('Invalid email or password!');
     };
 
     //Generated token
     const payload = {
         _id: user._id,
         username: user.username,
         name: user.name
     };
 
     const token = await jwt.sing(payload, SECRET);
 
     return token;
}

