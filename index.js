/* eslint-disable no-invalid-this */
const express = require('express');
const mongoose = require('mongoose');
const foodsApi = require('./api-routes/foodInfo_route');
const userApi = require('./api-routes/user_api');
const orderApi=require('./api-routes/order_api');
require('./subscribers/databaseListener');

const app = express();
require('dotenv').config({
  path: './config/.env',
});
// app.use(express.json);

async function connectDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5z2lq.mongodb.net/FoodDelivery?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        // eslint-disable-next-line comma-dangle
      }
    );
  } catch (error) {
    console.log(error);
  }
}
connectDatabase();

app.get('/', (req, res) => {
  res.send('Hello this is america and you are living here');
});
app.post('/', (req, res) => {
  res.send(req.body);
});
app.use('/food', foodsApi);
app.use('/register', userApi);
app.use('/order', orderApi);


// listen localhost in port 4200
app.listen(process.env.PORT || 4200, function() {
  console.log('Express server listening on port %d in %s mode',
    this.address().port, app.settings.env);
});


