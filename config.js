require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URL || 'mongodb://localhost:27017/delivery-db?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  secret: process.env.SECRET || 'secret',
  port: process.env.HTTP_PORT || 3000
}