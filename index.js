// loading env variables
const dotenv = require('dotenv');
dotenv.config();

const app = require("./app");
const connectDB = require("./utils/db");

async function init() {
  
  // mongo connect
  await connectDB();

  // port to listen on 
  app.listen(process.env.PORT);
}

init();
