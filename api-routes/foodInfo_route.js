const express = require('express');
const auth = require('../middlewares/auth');
const Resturant= require('../models/resturant');

// eslint-disable-next-line new-cap
const router = express.Router();
const dummyData = require('../example.json');

// !this is a middleware for this specific route
router.use(express.json());
router.use((req, res, next) => {
  console.log('hello this is america');
  next();
});

router
  .route('/')
  .get(auth, (req, res) => {
    res.json(dummyData);
  })
  .post((req, res) => {
    console.log(req.body);
    const newResturant = new Resturant(req.body);
    newResturant.save((err, newResturant) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(newResturant);
      }
    });
  });

router.get('/:id', (req, res) => {
  Resturant.calcDistance(40, 71).then((distance) => {
    res.json({
      ...distance,
    });
  });
  // Resturant.findById(req.params.id, (err, resturant) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.json(resturant);
  //   }
  // });
});

module.exports = router;
