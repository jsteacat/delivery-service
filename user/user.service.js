const User = require('./user.model');

const createUser = async (userData) => {
  return User.create(userData);
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({email}).exec();
  return user || null;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user || null;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail
};