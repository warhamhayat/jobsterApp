const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url,console.log("database terhubung"))
}

module.exports = connectDB
