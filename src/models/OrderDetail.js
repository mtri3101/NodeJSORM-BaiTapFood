const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "OrderDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      oderId: {
        type: DataTypes.INTEGER,
        field: "order_id",
      },
      foodId: {
        type: DataTypes.INTEGER,
        field: "food_id",
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      discount: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "order_details",
      timestamps: false,
    }
  );
};
