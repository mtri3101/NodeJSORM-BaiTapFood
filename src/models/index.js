//setup Sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node26-food", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();

//Khởi tạo model
// const UserFn = require("./User") => trả về function
// const User = UserFn(sequelize)   => truyền vào tham số là sequelize
const User = require("./User")(sequelize);
const Restaurant = require("./Restaurant")(sequelize);
const RestaurantLikes = require("./RestaurantLikes")(sequelize);
const RateRes = require("./RateRes")(sequelize);
const Order = require("./Order")(sequelize);
const Food = require("./Food")(sequelize);
const OrderDetail = require("./OrderDetail")(sequelize);

//Định nghĩa relationship giữa các model
//User 1-n restaurant
Restaurant.belongsTo(User, { as: "owner", foreignKey: "userId" });
User.hasMany(Restaurant, { as: "restaurants", foreignKey: "userId" });

//User - Like - Restaurant
//User 1-n RestaurantLikes
//Restaurant 1-n RestaurantLikes
User.belongsToMany(Restaurant, {
  as: "restaurantLikes",
  through: RestaurantLikes,
  foreignKey: "userId",
});
Restaurant.belongsToMany(User, {
  as: "userLikes",
  through: RestaurantLikes,
  foreignKey: "restaurantId",
});

//User - Rate - Restaurant
//User 1-n RateRes
//RateRes 1-n Restaurant
User.belongsToMany(Restaurant, {
  as: "restaurantRates",
  through: RateRes,
  foreignKey: "userId",
});
Restaurant.belongsToMany(User, {
  as: "userRates",
  through: RateRes,
  foreignKey: "restaurantId",
});

//User 1-n Orders
Order.belongsTo(User, { as: "customer", foreignKey: "userId" });
User.hasMany(Order, { as: "order", foreignKey: "userId" });

//Restaurant 1-n Food
Food.belongsTo(Restaurant, { as: "food", foreignKey: "restaurantId" });
Restaurant.hasMany(Food, { as: "restaurant", foreignKey: "restaurantId" });

//Order 1-n OrderDetail
OrderDetail.belongsTo(Order, { as: "orderDetail", foreignKey: "order_id" });
Order.hasMany(OrderDetail, { as: "orderDetail", foreignKey: "order_id" });

//OrderDetail 1-1 Food
Food.hasOne(OrderDetail, { as: "foodOrder", foreignKey: "food_id" });
OrderDetail.belongsTo(Food, { as: "foodOrder", foreignKey: "food_id" });

module.exports = {
  sequelize,
  User,
  Restaurant,
};
