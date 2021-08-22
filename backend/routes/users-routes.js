const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);
router.use(checkAuth);
router.post('/addUserDetails', usersController.addUserDetails);
router.get('/getUserDetails/:detailsType/:childId', usersController.getUserDetails);
router.get('/suggestions', usersController.getSuggestions);
router.get('/kids', usersController.getUserKids);
router.get('/requests', usersController.getApprovals);
router.get('/requestsFemale', usersController.getApprovalsFemale);
// router.post('/requestsUsers', usersController.getApprovalsList);
router.get('/showDetails/:id', usersController.getShowDetails);
router.post('/approveUser/:id', usersController.approveUser);

module.exports = router;
