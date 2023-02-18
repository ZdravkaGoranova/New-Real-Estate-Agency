const mongoose = require('mongoose');


const userShema = new mongoose.Schema({
    email: {
        type: String,
        // minLength: 10,
        match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Invalid URL'],
        required: [true, 'Email is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        // minLength: 5,
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        // minLength: 40,
    },
    myAds: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
    }],
});

//userShema.virtual('confirmPassword').set;

const User = mongoose.model('User', userShema);

module.exports = User;



  // }, {
    //     virtuals: {
    //         confirmPassword: {
    //             set(value) {
    //                 if (this.password !== value) {
    //                     throw new mongoose.Error('Password missmatch!');
    //                 }
    //             }
    //         }
    //     }

//});

//userShema.virtual('confirmPassword').set;