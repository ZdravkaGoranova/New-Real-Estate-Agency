const router = require('express').Router();

const Ad = require('../models/Ad.js');
const adServices = require('../services/bookServices.js');

const bookUtils = require('../utils/bookUtils.js');


router.get('/', (req, res) => {
    // console.log(req.user)
    res.render('home/index')
});


router.get('/catalog', async (req, res) => {//

    let jobs = await Ad.find().lean();
    // console.log(cryptos)
    // res.render('index', { cubes, search, difficultyFrom, diffficultyTo });
    res.render('book/catalog', { jobs });

});
router.get('/search', async (req, res) => {

    const { email } = req.query;
    const ad = await adServices.getSearch(email,req);
    console.log(email)
    console.log(ad )
    res.render('home/search', { ad });

});

module.exports = router;