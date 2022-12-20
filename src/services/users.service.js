const { AppError } = require("../helpers/error");
const { User, Restaurant } = require("../models");

const getUsers = async () => {
  //getList = findAll
  try {
    const users = await User.findAll({ include: "restaurants" });
    return users;
  } catch (error) {
    throw error;
  }
};

const getUsersByID = async (userId) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          association: "order",
          attributes: {
            exclude: ["id", "userId", "order_id"],
          },
          include: [
            {
              association: "orderDetail",
              attributes: {
                exclude: ["order_id"],
              },
              include: { association: "foodOrder" },
            },
          ],
        },
      ],
    });
    console.log(user.__proto__)
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new AppError(400, "Email is existed");
    }

    if (!data.password) {
      value = Math.random().toString(36).substring(2);
    }

    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError(400, "User not found");
    }

    await User.destroy({ where: { id: userId } });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, data) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError(400, "User not found");
    }
    const userUpdate = await User.update(data, { where: { id: userId } });
    return userUpdate;
  } catch (error) {
    throw error;
  }
};

const userOrder = async (data) => {
  try {
    const user = await User.findByPk(data["userId"]);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(data);
    await user.createOrder(data);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  getUsersByID,
  createUser,
  deleteUser,
  updateUser,
  userOrder,
};
