const { response } = require("../helpers/response");
const userService = require("../services/users.service");

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(response(users));
    } catch (error) {
      next(error);
    }
  };
};

const getUsersByID = () => {
  //inner func
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await userService.getUsersByID(id);
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const user = req.body;
      const createdUser = await userService.createUser(user);
      res.status(200).json(response(createdUser));
    } catch (error) {
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      await userService.deleteUser(id);
      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.body;
      await userService.updateUser(id, user);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
};

const userOrder = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const createdOrder = await userService.userOrder(data);
      res.status(200).json(response(createdOrder));

    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getUsers,
  getUsersByID,
  createUser,
  deleteUser,
  updateUser,
  userOrder,
};
