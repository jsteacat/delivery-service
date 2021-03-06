const userService = require('./user.service');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const decoratedUser = (user) => {
  const { _id, email, name, contactPhone } = user;
  return { id: _id, name, email, contactPhone };
};

const getProfile = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      status: 'ok',
      data: req.user
    })
  } else {
    return res.status(401).json({
      status: 'error',
      error: 'Unauthorized'
    })
  }
};

const register = async (req, res) => {
  const { email, password, name, contactPhone } = req.body;

  // Check empty fields
  if (!email || !password || !name ) {
    return res.status(422).json({
        status: 'error',
        error: 'Required fields must be filled'
    })
  }

  try {
    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      // User exists
      res.status(409).json({
        status: 'error',
        error: 'Email already in use'
      })
    } else {
      const newUserData = { email, name, contactPhone };
      // Hash password and save new user
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          newUserData.passwordHash = hash;
          const user = await userService.createUser(newUserData);
          res.status(201).json({
            status: 'ok',
            data: decoratedUser(user)
          });
        });
      });
    }
  } catch(error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

const login = async (req, res) => {
  try {
    passport.authenticate('local', (error, user, data) => {
      if (error) {
        return res.status(404).json({
          status: 'error',
          error
        })
      }

      if (user) {
        req.login(user, () => {
          return res.status(200).json({
            status: 'ok',
            data: decoratedUser(user)
          });
        })
      } else {
        return res.status(401).json({
          status: 'error',
          error: data
        })
      }
    })(req, res)
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

module.exports = {
  getProfile,
  register,
  login
};