const mongoose = require('mongoose');

const {Schema} = mongoose;

const orderSchema = new Schema({
//   _id: {type: Schema.Types.ObjectId},
  orderedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  orderedItems: [String],
  totalPrice: {type: Number, default: 0.0},

});


module.exports=mongoose.model('Order', orderSchema);


