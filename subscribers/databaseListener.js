const mongoose = require('mongoose');

mongoose.connection.on('error', (e) => {
  console.log(e);
});
