const express = require('express');

const router = express.Router();
const discussionController = require('../controller/discussion.controller');

router.post('/discussion', discussionController.createDiscussion);
router.put('/discussion/:uuid', discussionController.updateDiscussion);
router.delete('/discussion/:uuid', discussionController.deleteDiscussionById);
router.get('/discussion/tags', discussionController.getAllDiscussionByTags);
router.get('/discussion/text', discussionController.getAllDiscussionByText);

module.exports = router;