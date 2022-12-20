const { response } = require("../helpers/response");
const restaurantService = require("../services/restaurant.service");

const getRestaurants = () => {
  return async (req, res, next) => {
    try {
      const restaurants = await restaurantService.getRestaurants();
      res.status(200).json(response(restaurants));
    } catch (error) {
      next(error);
    }
  };
};

//localhost:4000/restaurants/:restaurantId/like-body:{userId: 1}
const likeRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId } = req.body;
      await restaurantService.likeRestaurant(userId, restaurantId);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

const rateRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId, amount } = req.body;
      await restaurantService.rateRestaurant(userId, restaurantId, amount);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};


module.exports = {
  getRestaurants,
  likeRestaurant,
  rateRestaurant,
};
