const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      name : user.name,
      email : user.email, 
      lastName : user.lastName,
      location : user.location,
      token,
    }})
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Pastikan email and password diisi')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Email belum terdaftar')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Password tidak valid')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      name : user.name,
      email : user.email, 
      lastName : user.lastName,
      location : user.location,
      token
   }})}


const updatedUser = async (req, res) =>{
  const {name,email , lastName , location} = req.body

  // console.log(req.body)
  const user = await User.findOne({_id : req.user.userId})
  // console.log(user)
  if (!name || !email || !lastName || !location){
    throw new BadRequestError("Pastikan semua sudah di isi")
  }

  user.name = name
  user.email =email
  user.location =location
  user.lastName = lastName

  await user.save()
  const token = user.createJWT()

  res.status(StatusCodes.OK).json({
    user: {
      name : user.name,
      email : user.email, 
      lastName : user.lastName,
      location : user.location,
      token
   }})


}

module.exports = {
  register,
  login,
  updatedUser
}
