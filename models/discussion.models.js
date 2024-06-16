const mongoose = require('mongoose');

const { Schema } = mongoose;

const DiscussionSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    hash_tags: {
        type: Array,
        required: false,
    },
    created_on: {
        type: Date,
        required: true,
    },
    views: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    comments: {
        comment_id: {
            type: String,
        },
        user_id: {
            type: String,
        },
        comment: {
            type: String,
        },
        created_on: {
            type: Date,
        },
        likes: {
            type: Number,
        },
        replies: {
            reply_id: {
                type: String,
            },
            user_id: {
                type: String,
            },
            reply: {
                type: String,
            },
            created_on: {
                type: Date,
            },
            likes: {
                type: Number,
            },
        },
    },
});

module.exports = mongoose.model('discussion', DiscussionSchema);