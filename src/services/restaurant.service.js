const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const getRestaurants = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          association: "owner",
          attributes: {
            exclude: ["email", "password"],
          },
        },
        {
          association: "userLikes",
    
          attributes: {
            exclude: ["email", "password"],
          },
         
          through: {
            attributes: ["createdAt"],
          },
        },
        {
          association: "userRates",
          through: {
            attributes: ["amount"],
          },
        },
      ],
    });
    return restaurants;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const likeRestaurant = async (userId, restaurantId) => {
  try {
    //Tìm ra nhà hàng muốn like
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Restaurant not found");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    // console.log(restaurant.__proto__);

    const hasLiked = await restaurant.hasUserLike(user.id);
    if (hasLiked) {
      //Nếu đã like rồi thì remove => unlike
      await restaurant.removeUserLike(user.id);
    } else {
      //Chưa like thì thêm vào
      await restaurant.addUserLike(user.id);
    }

    return null;
  } catch (error) {
    throw error;
  }
};

const rateRestaurant = async (userId, restaurantId, amountRate) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Restaurant not found");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    // console.log(restaurant.__proto__);
    if (amountRate > 5 || amountRate < 1) {
      throw new AppError(400, "Please rate between 1 and 5");
    }
    await restaurant.addUserRate(user.id, { through: { amount: amountRate } });

    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRestaurants,
  likeRestaurant,
  rateRestaurant,
};
