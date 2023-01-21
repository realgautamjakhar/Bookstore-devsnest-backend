const { Sequelize } = require("sequelize");

const createDB = new Sequelize("database", "user", "pass", {
  dialect: "sqlite",
  host: "./config/bd.sqlite",
});
const connectDB = async () => {
  try {
    await createDB.sync();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connectDB, createDB };
