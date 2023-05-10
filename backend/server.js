const app = require('./app');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/connect');
// handeling uncaught exception
process.on("uncaughtException",(err)=>{
  console.log(`Erorr: ${err.message}`.bgRed);
  console.log(`Shutting down the server to due to Uncaught Execption`.bgRed);
  server.close(()=>{
    process.exit(1);
  })
})
//config dotenv
dotenv.config({path:'backend/config/.env'});
const port = process.env.PORT || 5000;
let server;
const start = async()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to database".bgBlue);
     server = app.listen(port,()=>{
      console.log(`Server is listening on  https://localhost:${port}...`.bgBlue);
    })
  } catch (error) {
    console.log(`${error}, this error is in connecting database`.bgRed);
  }
}

start();

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
  console.log(`Error: ${err.message}`.bgRed);
  console.log(`Shutting down the server due to Undhadled Promise Rejection`.bgRed);
  server.close(()=>{
    process.exit(1);
  })
})
