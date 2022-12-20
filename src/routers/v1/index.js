//Routers v1
const express = require("express");
const userController = require("../../controllers/users.controller");
const restaurantController = require("../../controllers/restaurant.controller");

//path: /api/v1
const v1 = express.Router();

//Định nghĩa các routers cho table users
v1.get("/users", userController.getUsers());
v1.get("/users/:id", userController.getUsersByID());
v1.post("/users", userController.createUser());
v1.delete("/users/:id", userController.deleteUser());
v1.put("/users/:id", userController.updateUser());
v1.post("/users/order",userController.userOrder())

//Định nghĩa các routers cho table restaurants
v1.get("/restaurants", restaurantController.getRestaurants());
v1.post(
  "/restaurants/:restaurantId/like",
  restaurantController.likeRestaurant()
);
v1.post(
  "/restaurants/:restaurantId/rate/",
  restaurantController.rateRestaurant()
);

module.exports = v1;
