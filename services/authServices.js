const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken.js');
const { SECRET } = require('../constans.js')

exports.findByUsername = (username) => User.findOne({ username });//User.exists({username})
exports.findByEmail = (email) => User.findOne({ email });//User.exists({email})

exports.register = async (email, password ,repeatPassword,description) => {

    if (password !== repeatPassword) {
        throw new Error('Password missmatc!');
    }
    //TODO:Check user exists
    const existingUser = await this.findByUsername(email);
    // const existingUser = await User.findOne({
    //     $or: [
    //         { email },
    //         { username }
    //     ]
    // });

    if (existingUser) {
        throw new Error('User  exists!');
    }

    if (description.length < 40) {
        throw new Error('Description is too short!');
    }


    // if (email.length < 10) {
    //     throw new Error('Username is too short!');
    // }


    if (password.length < 5) {
        throw new Error('The password should be at least four characters long!');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ email,description, password: hashPassword });

    return this.login(email, password);
};


exports.login = async ( email, password ) => {

    //Email/User exist
    const user = await this.findByEmail(email);
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
        email,
       // username: user.username,
    };

    const token = await jwt.sing(payload, SECRET);

    return token;
}

