const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { secret } = require("../config");

const saltRounds = 10;
const { validationResult } = require("express-validator");

function generateAccessToken(id) {
  const payload = { id };
  return jwt.sign(payload, secret, {
    expiresIn: "24h",
  });
}

async function registration(req, res) {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res
        .json({ message: "password must be longer than 5" });
    }

    const { username, password } = req.body;

   
    const candidate = await User.findOne({ username });

    if (candidate)
      return res.json({ message: "User already exist" });

    const Hashpassword = bcrypt.hashSync(password, saltRounds);

    const user = new User({ username, password: Hashpassword });
    await user.save();
    const token = generateAccessToken(user._id);
   
    return await res.json({ user, token, message: "registration successful" });  
  } catch (e) {
    console.log(e);
    return res.json({message: `username can not be empty`});
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .json({ message: `User ${username} is no defined` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.json({ message: `password is invalid` }).status(400);
    }
    const token = generateAccessToken(user._id);
    return res.json({ token });
  } catch (e) {
    console.log(e);
    return res.json({ message: `Login error ${e}` });
  }
}

 const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.json({
        message: 'user is not defined',
      })
    }


    const token = generateAccessToken(user._id);
    return res.json({user, token });
  } catch (error) {
    res.json({ message: 'Нет доступа.' })
  }
}

module.exports = { registration, login,getMe };
