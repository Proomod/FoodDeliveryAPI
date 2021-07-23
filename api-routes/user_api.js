const express = require('express');
const auth = require('../middlewares/auth');
const {userValidationRules, validate} = require('../middlewares/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// eslint-disable-next-line new-cap
const router = express.Router();
router.use(express.json());

router
  .route('/')
  .get(auth, (req, res, next) => {
    res.json(req.user);
  })
  .post(userValidationRules(), validate, async (req, res, next) => {
    ({userName, email, password, phoneNo} = req.body);
    try {
      if (await User.findOne({email}).exec()) {
        return res.json({message: 'User already exists please sign in'});
      }
      // eslint-disable-next-line new-cap
      const user = User({
        userName,
        email: email.toLowerCase(),
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const token = jwt.sign({id: user._id, email}, process.env.JWT_SECRET_KEY);
      await user.save();
      res.json({userName, email, token});
    } catch (error) {
      // eslint-disable-next-line quotes
      res.status(501).send("can't connect to database");
    }
  });

router.get('/:id', (req, res) => {
  res.send(`this is supposed to get ${req.params.id}`);
});

module.exports = router;

// jwr auth codde must
