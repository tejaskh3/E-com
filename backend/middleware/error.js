const ErrorHandeler = require('../utils/errorHandeler');

const errorMiddleware = (err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal Server Error";

//MongoDV erorr providing wrong id to find product etc(Cast error)

if(err.name =="CastError"){
  const message = `Resource not found. Invalid: ${err.path}`
  err = new ErrorHandeler(message, 400)
}
  res.status(err.statusCode).json({
    success:false,
    message:err.message,

  })
}

module.exports = errorMiddleware
