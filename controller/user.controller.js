/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserService } = require('../services/user.services');
const { UserRepository } = require('../repository/user.repository');

const UserModel = require('../models/user.models');

const userRepository = new UserRepository(UserModel);

const userService = new UserService(userRepository);

exports.createUser = async (req, res, next) => {
  try {
    const response = await userService.createUser(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: 'Data Added Successfully', token: response.token });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const response = await userService.updateUser(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const response = await userService.deleteUserById(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const response = await userService.getAllUsers(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.getUserByName = async (req, res, next) => {
  try {
    const response = await userService.getUserByName(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const response = await userService.getUserById(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).end();
      return;
    }
    const getUserResponse = await userService.getUserByEmail(email);
    if (!getUserResponse) {
      res.status(400).json({ status: 'failed', msg: 'Invalid Email Or Password' });
      return;
    }
    const { password: hashedPassword } = getUserResponse;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      res.status(400).json({ status: 'failed', msg: 'Invalid Email Or Password' });
      return;
    }
    const token = jwt.sign({
      email: getUserResponse.email
    },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error('POST auth/signin, Something Went Wrong: ', err);
    res.status(400).send({ status: 'failed', error: true, message: err.message });
  }
}