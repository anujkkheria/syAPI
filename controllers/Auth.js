const user = require('../Schema/UserSchema')
const jwt = require('jsonwebtoken')
exports.Signup = async (req, res, next) => {
  try {
    const newUser = await user.create(req.body)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN,
    })
    console.log({ ...req.body })
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    })
  } catch (err) {
    console.log(err, req.body)
    res.sendStatus(500)
  }
}
exports.Login = async (req, res, next) => {
  const { email, password } = req.body
  if (email && password) {
    const User = await user.findOne({ email }).select('+password')
    if (User) {
      const authenticated = await User.comparePass(password, User.password)
      authenticated ? res.sendStatus(200) : res.sendStatus(401)
    } else {
      res.sendStatus(400)
    }
  }
}
