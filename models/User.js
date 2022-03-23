const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contactPhone: String
});

userSchema.statics.createUser = async function (data) {
  const user = new this(data);
  await user.save();
  return user;
};

userSchema.statics.findUserByEmail = async function (email) {
  const user = await this.findOne({email: email}).exec();
  return user || null;
};

userSchema.statics.findUserById = async function (id) {
  const user = await this.findById(id);
  return user || null;
};

module.exports = model('UserModel', userSchema);