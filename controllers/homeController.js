const router = require('express').Router();

const  Housing = require('../models/Housing.js');
const adServices = require('../services/bookServices.js');

const bookUtils = require('../utils/bookUtils.js');


router.get('/', (req, res) => {
    // console.log(req.user)
    res.render('home/index')
});


router.get('/catalog', async (req, res) => {//

    let housings = await  Housing.find().lean();
     console.log(housings)
    // res.render('index', { cubes, search, difficultyFrom, diffficultyTo });
    res.render('book/catalog', { housings });

});
router.get('/search', async (req, res) => {

    const { email } = req.query;
    const ad = await adServices.getSearch(email,req);
    console.log(email)
    console.log(ad )
    res.render('home/search', { ad });

});

module.exports = router;