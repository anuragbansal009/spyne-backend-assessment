const uuid = require('uuid');
const customResourceResponse = require('../utils/constants.utils');

class DiscussionService {
  constructor(discussionRepo) {
    this.discussionRepo = discussionRepo;
  }

  // Create Discussion / User can post a discussion
  async createDiscussion(req) {
    const { text } = req.body;
    const { image } = req.body;
    const { hash_tags } = req.body;
    const created_on = new Date();
    const views = 0;
    const likes = 0;
    const comments = [];
    const uuidV4 = uuid.v4();
    const response = {};

    if (!text) {
      response.message = customResourceResponse.reqValidationError.message;
      response.statusCode = customResourceResponse.reqValidationError.statusCode;
      return response;
    }
    const discussion = await this.discussionRepo.createDiscussion(uuidV4, text, image, hash_tags, created_on, views, likes, comments);

    if (!discussion) {
      response.message = customResourceResponse.serverError.message;
      response.statusCode = customResourceResponse.serverError.statusCode;
      return response;
    }
    response.message = customResourceResponse.reqCreated.message;
    response.statusCode = customResourceResponse.reqCreated.statusCode;
    response.data = discussion;
    return response;
  }

  // Update Discussion / User can update a discussion / Comment / Like / Modify
  async updateDiscussion(req) {
    const { text } = req.body;
    const { image } = req.body;
    const { hash_tags } = req.body;
    const { views } = req.body;
    const { likes } = req.body;
    const { comments } = req.body;

    const response = {};
    const { uuid } = req.params;

    const updatedDiscussion = await this.discussionRepo.updateDiscussion(uuid, text, image, hash_tags, views, likes, comments);
    if (!updatedDiscussion) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }

    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = updatedDiscussion;
    return response;
  }

  // Delete Discussion / User can delete a discussion
  async deleteDiscussionById(req) {
    const response = {};
    const { uuid } = req.params;

    const deletedDiscussion = await this.discussionRepo.deleteDiscussionById(uuid);
    if (!deletedDiscussion) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }

    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    return response;
  }

  // Get Discussion by Tags / User can search discussion by tags
  async getAllDiscussionByTags(req) {
    const response = {};
    const { tags } = req.query;

    const discussion = await this.discussionRepo.getAllDiscussionByTags(tags);
    if (!discussion) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }
    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = discussion;
    return response;
  }

  // Get Discussion by Text / User can search discussion by text
  async getAllDiscussionByText(req) {
    const response = {};
    const { text } = req.query;

    const discussion = await this.discussionRepo.getAllDiscussionByText(text);
    if (!discussion) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }
    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = discussion;
    return response;
  }
}

module.exports = {
  DiscussionService,
};