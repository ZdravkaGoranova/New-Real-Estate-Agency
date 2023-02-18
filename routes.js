const router = require('express').Router();

const homeController = require('./controllers/homeController.js');

const authController = require('./controllers/authController.js');

const cryptoController = require('./controllers/cryptoController.js');

const { isAuth } = require('./middlewares/authMddleware.js')
// const { handleRequest } = require('./utils/requestUtils.js')

const { getErrorMessage } = require('./utils/errorUtils.js')

router.use(homeController);
router.use(authController);//router.use('/auth',authController);

//router.use('/crypto',cryptoController);

//router.use(cryptoController); или router.use('/cryptos',cryptoController);
router.get('/create', isAuth, cryptoController.getCreateCrypto);//
router.post('/create', isAuth, cryptoController.postCreateCrypto);

router.get('/agencys/:jobId/details', cryptoController.getDetails);// router.get('/cubes/:cubeId/details', handleRequest(cubeControler.getDetails));//път към детайла

//router.get('/agencyss/:jobId/wish', isAuth, cryptoController.getWish);
router.get('/agencys/:jobId/apply', isAuth, cryptoController.getApplied);
router.get('/profile', isAuth, cryptoController.getProfile);

router.get('/agencys/:jobId/edit', isAuth, cryptoController.getEditCrypto);// router.get('/cubes/:cubeId/edit', isAuthenticated, handleRequest(cubeControler.getEditCube));
router.post('/agencys/:jobId/edit', isAuth, cryptoController.postEditCrypto);

router.get('/agencys/:jobId/delete', isAuth, cryptoController.getDeleteCrypto);

router.all('*', (req, res) => res.render('auth/404'));
//router.use('*', (req, res) => res.render('home/404'));

router.use(getErrorMessage);

module.exports = router;