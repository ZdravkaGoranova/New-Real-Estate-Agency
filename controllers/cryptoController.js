
const router = require('express').Router();

const Ad = require('../models/Ad.js');
const User = require('../models/User.js');
const bookServices = require('../services/bookServices.js');
const bookUtils = require('../utils/bookUtils.js');
const { getErrorMessage } = require('../utils/errorUtils.js')
const { isAuth, authentication } = require('../middlewares/authMddleware.js');



exports.getCreateCrypto = (req, res) => {//router.get('/'create',isAuth,(req, res))=>{
    // console.log(req.user);

    res.render('book/create');
};
exports.postCreateCrypto = async (req, res) => {
    // console.log(req.body);//Object на данните от url
    //console.log(req.user);

    try {
        const { headline, location, companyName, description, usersApplied } = req.body;

        let ad = new Ad({

            headline,
            location,
            companyName,
            description,
            usersApplied,
            author: req.user._id, // тук добавяте автора на рекламата
        });
        // console.log(ad);
        await ad.save();//запазва в db
        //или  await cryptoService.create(req.user._id, { name, image, price, description, paymentMethod })

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { myAds: ad._id } },
            { new: true }
        );
        // console.log(user);

    } catch (error) {
        console.log(error.message);
        //return res.render('auth/404');
        return res.status(400).render('book/create', { error: getErrorMessage(error) })
    }
    res.redirect('/catalog');
};

exports.getDetails = async (req, res) => {//router.get('/:cryptoId/details',(req,res)=>{)

    const ad = await bookServices.getDetailsPop(req.params.jobId);

    let user = await User.findOne({ _id: ad.author }).exec();
    const email = user ? user.email : '';
    //console.log(email)

    const isOwner = bookUtils.isOwner(req.user, ad);//const isOwner = crypto.owner==req.user._id;
    // console.log(isOwner)

    const isApply = ad.usersApplied?.some(id => id == req.user?._id);
    //console.log(isApply)

    //crypto.paymentMethod = paymentMethodsMap[crypto.paymentMethod]

    if (!ad) {
        return res.render('auth/404');
    }

    res.render('book/details', { ad, isOwner, email, isApply});
};

exports.getEditCrypto = async (req, res) => {

    const ad = await bookServices.getOne(req.params.jobId);
    //const paymentMethods = bookUtils.generatePaymentMethod(book.paymentMethod);

    if (!bookUtils.isOwner(req.user, ad)) {
        return res.render('auth/404')// throw new Error('You are not an owner!');
    }

    res.render('book/edit', { ad });
};

exports.postEditCrypto = async (req, res) => {

    const { headline, location, companyName, description } = req.body

    try {
        await bookServices.update(req.params.jobId, {
            headline,
            location,
            companyName,
            description
        })
    } catch (error) {
        // console.log(error.message);
        return res.status(400).render('book/edit', { error: getErrorMessage(error) })

    }
    res.redirect(`/jobAds/${req.params.jobId}/details`);
};

exports.getDeleteCrypto = async (req, res) => {
    const book = await bookServices.getOne(req.params.jobId);

    const isOwner = bookUtils.isOwner(req.user, book);
    console.log(isOwner)

    if (!isOwner) {
        return res.render('auth/404');
    }

    await bookServices.delete(req.params.jobId);//await cryptoService.delete(crypto);
    res.redirect('/catalog');
};

exports.getWish = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
    // const crypto = await cryptoService.getOne(req.params.cryptoId);
    // const isOwner = cryptoUtils.isOwner(req.user, crypto);
    try {
        await bookServices.wish(req.user._id, req.params.bookId, req, res);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }
    res.redirect(`/books/${req.params.bookId}/details`);
}


exports.getApplied = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
    // const crypto = await cryptoService.getOne(req.params.cryptoId);
    // const isOwner = cryptoUtils.isOwner(req.user, crypto);
    try {
        await bookServices.apply(req.user._id, req.params.jobId, req, res);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }
    res.redirect(`/jobAds/${req.params.jobId}/details`);
}



exports.getProfile = async (req, res) => {

    const userId = req.user._id;
    const user = req.user;
    let wished = await bookServices.getMyWishBook(userId);
    console.log(userId)
    console.log(wished)
    res.render('book/profile', { user, wished });

}








//     try {
//         const userI = req.user._id;
//         const user = req.user;
//         let books = await Book.find().lean();
//         // const wishArray  = books.wishingList?.filter(id => id == req.user?._id);

//        //const filteredArray = books.filter(book => book.wishingList.includes(new ObjectId('req.user._id')));
//        const filteredArray = books.filter(book => book.wishingList.includes('req.user._id'));

//         console.log(req.user._id)
//         console.log(filteredArray);

//         res.render('book/profile', { user, books });
//     } catch (error) {

//         return res.status(400).render('home/404', { error: getErrorMessage(error) })
//     }
// }