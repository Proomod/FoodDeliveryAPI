const mongoose=require('mongoose');
const {calculateDistance}=require('../services/distanceCalculator');
const Schema=mongoose.Schema;


const pointSchema=new Schema({
  type: {type: String,
    enum: ['point'],
    required: true},
  lat: {type: Number, required: true},
  longitude: {type: Number, required: true}, // lat and longitude
});

const foodSchema=new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
});

const reviewSchema=new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true, default: Date.now()},
  rating: {type: Number, required: true, min: 1, max: 10},
  comments: {type: String, required: true},
});


const resturantSchema=new Schema({
  name: String,
  address: String,
  coordinates: {type: pointSchema,
    required: true},
  photographs: [String],
  availableFood: [{type: foodSchema, required: true}],
  reviews: [{type: reviewSchema, required: true, maxLength: 100}],
},
);

resturantSchema.statics.calcDistance=function(lat, longitude) {
  matchedDocs=[];
  return new Promise((resolve, reject) => {
    this.find({
      'coordinates.lat': {$gt: lat-1, $lt: lat+1},
      'coordinates.longitude': {$gt: longitude-1, $lt: longitude+1},

    }, 'name location availableFood coordinates',
    (error, docs)=>{
      // opetation on each doc of docs
      matchedDocs=docs.filter((doc)=>{
        return calculateDistance(lat, longitude, doc.coordinates.lat,
          doc.coordinates.longitude,
        )<150;
      });
      if (error) return reject(error);
      resolve(matchedDocs);
    });
  });
};


module.exports=mongoose.model('resturant', resturantSchema);
