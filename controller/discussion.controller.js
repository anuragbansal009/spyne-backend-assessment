/* eslint-disable consistent-return */
const { DiscussionService } = require('../services/discussion.services');
const { DiscussionRepository } = require('../repository/discussion.repository');

const DiscussionModel = require('../models/discussion.models');

const discussionRepository = new DiscussionRepository(DiscussionModel);

const discussionService = new DiscussionService(discussionRepository);

exports.createDiscussion = async (req, res, next) => {
  try {
    const response = await discussionService.createDiscussion(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.updateDiscussion = async (req, res, next) => {
  try {
    const response = await discussionService.updateDiscussion(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.deleteDiscussionById = async (req, res, next) => {
  try {
    const response = await discussionService.deleteDiscussionById(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};

exports.getAllDiscussionByTags = async (req, res, next) => {
  try {
    const response = await discussionService.getAllDiscussionByTags(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.getAllDiscussionByText = async (req, res, next) => {
  try {
    const response = await discussionService.getAllDiscussionByText(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};
