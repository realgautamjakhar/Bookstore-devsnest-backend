const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Book = createDB.define("book", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
  },
  dateOfRelease: {
    type: DataTypes.STRING,
  },
  bookImage: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Book;
