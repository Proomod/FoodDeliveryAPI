const express=require('express');
const auth =require('../middlewares/auth');
const Order=require('../models/order');

// eslint-disable-next-line new-cap
const router=express.Router();
router.use(express.json());


router.route('/')
  .get(
    auth, (req, res, next)=>{

    },
  )
  .post(auth, async (req, res, next)=>{
    ({orderedItems, totalPrice}=req.body);
    if (!(orderedItems && totalPrice)) {
      return res.json({message: 'Please input all the details'});
    }
    // eslint-disable-next-line new-cap
    const order=Order({
      orderedItems,
      totalPrice,
      orderedBy: req.user.id,
    });
    try {
      await order.save();
      res.send({message: 'order placed successfully '});
    } catch (error) {
      console.log(error);
    }
  });


router.get('/myorder', auth, async (req, res, next)=>{
  // eslint-disable-next-line max-len
  const orders=await Order.find({orderedBy: req.user.id}, '-_id' ).populate('orderedBy', '-_id').exec();
  res.json(orders);
});


module.exports=router;
