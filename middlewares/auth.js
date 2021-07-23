/* eslint-disable max-len */

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.authorization;

  // /write a script to verify our jwtToken which checks the token with stored data in our repository
  if (!token) {
    return res.status(403).send('You are not permitted to visit this route');
  }
  try {
    const decodedToken = jwt.verify(
      token.split(' ')[1],
      // eslint-disable-next-line comma-dangle
      process.env.JWT_SECRET_KEY
    );
    req.user = decodedToken;
  } catch (error) {
    return res.json({error: 'Invalid token'});
  }
  return next();
}

module.exports = auth;
