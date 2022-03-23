require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URL,
  secret: process.env.SECRET,
  port: process.env.HTTP_PORT || 3000
}