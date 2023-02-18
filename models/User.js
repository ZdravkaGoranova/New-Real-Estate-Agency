const mongoose = require('mongoose');


const userShema = new mongoose.Schema({

    name: {
        type: String,
        // minLength: 10,
      // match: [/^\w+\s\w+$/, 'Invalid URL'],
        required: [true, 'name is required!'],
    }, 
    username: {
        type: String,
        // minLength: 10,
        minLength: [5, 'username should be at least 5 characters!'],
      
        required: [true, 'username is required!'],
    },
    password: {
        type: String,
        minLength: [4, 'password should be at least 4 characters!'],
        required: [true, 'Password is required!'],
       
    },
    
    // myAds: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Ad',
    // }],
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