class DiscussionRepository {
    constructor(discussionModel) {
        this.discussionModel = discussionModel;
    }

    createDiscussion(uuid, text, image, hash_tags, created_on, views, likes, comments) {
        return this.discussionModel.create({
            uuid, text, image, hash_tags, created_on, views, likes, comments
        });
    }

    updateDiscussion(uuid, text, image, hash_tags, views, likes, comments) {
        return this.discussionModel.findOneAndUpdate({ uuid }, {
            $set: { text, image, hash_tags, views, likes, comments }
        }, { new: true });
    }

    deleteDiscussionById(uuid) {
        return this.discussionModel.findOneAndDelete({ uuid });
    }

    async getAllDiscussionByTags(tags) {
        await this.discussionModel.updateMany({ "hash_tags": { "$in": [tags] } }, { $inc: { views: 1 } });
        return this.discussionModel.find({ "hash_tags": { "$in": [tags] } });
    }

    async getAllDiscussionByText(text) {
        function escapeRegex(string) {
            return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        await this.discussionModel.updateMany({ "text": new RegExp(escapeRegex(text), 'i') }, { $inc: { views: 1 } });
        return this.discussionModel.find({ "text": new RegExp(escapeRegex(text), 'i') });
    }


}

module.exports = {
    DiscussionRepository,
};