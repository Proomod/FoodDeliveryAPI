// calculatee distance from longitude and latitude
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(deg2rad(lat1)) *
Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}


// const DistanceCalculator = function(latitude, longitude) {
//   this.latitude = latitude;
//   this.longitude = longitude;
// };

// DistanceCalculator.prototype.calculate = function(latitude, longitude) {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(latitude - this.latitude); // deg2rad below
//   const dLon = deg2rad(longitude - this.longitude);
//   const a =Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// Math.cos(deg2rad(this.latitude)) * Math.cos(deg2rad(latitude)) *
// Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// };

// // convert decimal degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
// const distance=new DistanceCalculator(20.0, 10.0);
// console.log(distance.calculate(19.0, 10, 0));


module.exports ={calculateDistance}; ;


// a  mongoose query to get data from database
// in the docuement satisfies the output of a function
