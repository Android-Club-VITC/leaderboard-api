const mongoose = require("mongoose");

async function connectDb() {
  const uri = `mongodb+srv://team_ac:${process.env.MONGO_PWD}@cluster0.cmdu5.mongodb.net/leaderboard?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (mongoose.connection.readyState === 1) {
        console.log("Successfully connected to database");
    } else throw Error("Connection Failed");
  } catch (e) {
      console.log("Error connecting to database");
      console.error(e);
  }
}

module.exports = connectDb;