const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    name: {
        type: String,
       
        required: true,

    },
    type: {
        type: String,
        required: true,
        enum:{values:['Apartment”-wallet','Villa', 'House'],
        message:'Invalid type',
        }

    },
    year: {
        type: Number,
    
        required: true,

    },
    city : {
        type: String,
    
        required: true,

    },
    image: {
        type: String,
       
        required: true,

    },

    description: {
        type: String,
        
        required: true,

    },
    pieces: {
        type: Number,

        required: true,

    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    rentedHome: [{
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


const Housing = mongoose.model('Housing', adSchema);

module.exports = Housing;