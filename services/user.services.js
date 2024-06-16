const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const customResourceResponse = require('../utils/constants.utils');

// User Service
class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  // Create User / Sign Up
  async createUser(req) {
    const { name } = req.body;
    const { mobileno } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const followed = [];
    const uuidV4 = uuid.v4();
    const response = {};

    const hashedPassword = await bcrypt.hash(password, 8);

    if (!name || !mobileno || !email) {
      response.message = customResourceResponse.reqValidationError.message;
      response.statusCode = customResourceResponse.reqValidationError.statusCode;
      return response;
    }
    const user = await this.userRepo.createUser(uuidV4, name, mobileno, email, followed, hashedPassword);

    if (!user) {
      response.message = customResourceResponse.serverError.message;
      response.statusCode = customResourceResponse.serverError.statusCode;
      return response;
    }
    console.log(user);
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    response.message = customResourceResponse.reqCreated.message;
    response.statusCode = customResourceResponse.reqCreated.statusCode;
    response.data = user;
    response.token = token;
    return response;
  }

  // Update User / Follow Other Users
  async updateUser(req) {
    const { name } = req.body;
    const { mobileno } = req.body;
    const { email } = req.body;
    const { followed } = req.body;

    const response = {};
    const { uuid } = req.params;

    const updatedUser = await this.userRepo.updateUser(uuid, name, mobileno, email, followed);
    if (!updatedUser) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }

    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = updatedUser;
    return response;
  }

  // Delete User
  async deleteUserById(req) {
    const response = {};
    const { uuid } = req.params;

    const deletedUser = await this.userRepo.deleteUserById(uuid);
    if (!deletedUser) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }

    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    return response;
  }

  // Get All Users
  async getAllUsers(req) {
    const response = {};

    const users = await this.userRepo.getAllUsers();

    if (!users) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }
    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = users;
    return response;
  }

  // Get User By Name
  async getUserByName(req) {
    const response = {};
    const { name } = req.query;

    const user = await this.userRepo.getUserByName(name);
    if (!user) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }
    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = user;
    return response;
  }

  // Get User By Id
  async getUserById(req) {
    const response = {};
    const { uuid } = req.params;

    const user = await this.userRepo.getUserById(uuid);
    if (!user) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }
    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = user;
    return response;
  }

  // Get User By Email
  async getUserByEmail(email) {
    const response = {};

    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }
    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = user;
    return response;
  }
}

module.exports = {
  UserService,
};