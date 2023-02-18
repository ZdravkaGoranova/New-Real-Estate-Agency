const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
         minLength: [4, 'Headline should be at least two characters!'],
        required: true,

    },
    location: {
        type: String,
        required: true,
         minLength: [8, 'Location should be at least two characters!'],

    },
    companyName: {
        type: String,
         minLength: [3, 'CompanyName should be at least two characters!'],
        required: true,

    },
    description: {
        type: String,
        minLength: [40, 'Description should be at least 40 characters!'],
        required: true,

    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersApplied: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    //или
    // buyers: {
    //     type: [mongoose.Types.ObjectId],
    //     default: [],
    //     ref: 'User'
    // },

});


const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;