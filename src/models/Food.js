const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Food",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        field: "restaurant_id",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        field: "category_id",
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      price:{
        type: DataTypes.FLOAT
      },
    },
    {
      tableName: "food",
      timestamps: false,
    }
  );
};
