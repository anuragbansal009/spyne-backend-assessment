# Spyne Backend Assessment

Created using microservices architecture, this project is a simple backend platform where users can create posts and comment on them. The project is divided into two services: User Service and Discussion Service.

# User Service
This service is responsible for managing users. It provides the following functionalities:
- Create User
- Update User
- Delete user
- Show list of users
- Search user based on name

# Discussion Service
This service is responsible for managing discussions. It provides the following functionalities:
- Create Discussion
- Update Discussion
- Delete Discussion
- Get list of discussion based on tags
- Get list of discussions based on certain text, which is available in Text field

# Technology Stack
The following technologies are used in this project:
- Node.js
- Express.js
- MongoDB

# How to run the project
- Clone the project
- Run `npm install` to install the dependencies
- Run `npm start-user` to start the user microservice
- Run `npm start-discussion` to start the discussion microservice

User Service will run on port 8080 and Discussion Service will run on port 8082

# Required Functionalities
The other required functions are:
1. User can login/signup -> Done in User service (Create User API / Signin API)
2. User can search of another users -> Done in User service (Searching using name)
3. User can follow another users -> Done in User service (Update User API)
4. User can post (only text or Image + Text) -> Done in Discussion service (Create Discussion API)
5. Other users can comment or like on the post -> Done in Discussion service (Update Discussion API)
6. Users can like a comment or reply on the comment -> Done in Discussion service (Update Discussion API)
7. Uses can delete or modify post after posting -> Done in Discussion service (Update Discussion API / Delete Discussion API)
8. Users delete or modify comments -> Done in Discussion service (Update Discussion API / Delete Discussion API)
9. Users can see view count of a post -> Done in Discussion service (Get Discussion API)
10. Users can search for any posts using the hashtags -> Done in Discussion service (Get Discussion API)

# Postman Collection
https://www.postman.com/anuragbansal/workspace/anurag-public-ws/collection/25658175-619d7a38-1b9a-43d5-b4f7-2e24645caff8?action=share&creator=25658175

# Low level design
The low level design of the project is as follows:
- User Service
  - Create User
    - Request: POST /user
    - Response: User
  - Update User
    - Request: PUT /user/:id
    - Response: User
  - Delete User
    - Request: DELETE /user/:id
    - Response: User
  - Show list of users
    - Request: GET /user
    - Response: List of Users
  - Search user based on name
    - Request: GET /user?name=sample
    - Response: List of Users
- Discussion Service
  - Create Discussion
    - Request: POST /discussion
    - Response: Discussion
  - Update Discussion
    - Request: PUT /discussion/:id
    - Response: Discussion
  - Delete Discussion
    - Request: DELETE /discussion/:id
    - Response: Discussion
  - Get list of discussion based on tags
    - Request: GET /discussion?tags=sample
    - Response: List of Discussions
  - Get list of discussions based on certain text, which is available in Text field
    - Request: GET /discussion?text=sample
    - Response: List of Discussions

# High level design
The high level design of the project is as follows:
- User Service
  - Create User
    - Create a new user in the database
  - Update User
    - Update the user in the database
  - Delete User
    - Delete the user from the database
  - Show list of users
    - Get the list of users from the database
  - Search user based on name
    - Get the list of users from the database based on the name
- Discussion Service
  - Create Discussion
    - Create a new discussion in the database
  - Update Discussion
    - Update the discussion in the database
  - Delete Discussion
    - Delete the discussion from the database
  - Get list of discussion based on tags
    - Get the list of discussions from the database based on the tags
  - Get list of discussions based on certain text, which is available in Text field
    - Get the list of discussions from the database based on the text

# Database Schema
The database schema of the project is as follows:
- User
  - uuid: String
  - name: String
  - mobileno: Number
  - email: String
  - followed: Array of String
  - password: String
- Discussion
  - uuid: String
  - text: String
  - image: String
  - hash_tags: Array of String
  - created_on: Date
  - views: Number
  - likes: Number
  - comments: Array of Comment
- Comment
  - comment_id: String
  - user_id: String
  - comment: String
  - created_on: Date
  - likes: Number
  - replies: Array of Reply
- Reply
  - reply_id: String
  - user_id: String
  - reply: String
  - created_on: Date
  - likes: Number