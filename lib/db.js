// Used to store the MongoDB URI for the user and discussion databases
module.exports = { 
  userMongoURI: `mongodb://localhost/${process.env.USER_DATABASE_NAME}`,
  discussionMongoURI: `mongodb://localhost/${process.env.DISCUSSION_DATABASE_NAME}`,
};