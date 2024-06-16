class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  createUser(uuid, name, mobileno, email, followed, password) {
    return this.userModel.create({
      uuid,
      name,
      mobileno,
      email,
      followed,
      password
    });
  }

  updateUser(uuid, name, mobileno, email, followed) {
    return this.userModel.findOneAndUpdate({ uuid }, {
      $set: { name, mobileno, email, followed }
    }, { new: true }).select({ _id: 0, __v: 0, password: 0 });
  }

  deleteUserById(uuid) {
    return this.userModel.findOneAndDelete({ uuid });
  }

  getAllUsers() {
    return this.userModel.find().select({ _id: 0, __v: 0, password: 0 });
  }

  getUserByName(name) {
    function escapeRegex(string) {
      return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    return this.userModel.find({ "name": new RegExp(escapeRegex(name), 'i') }).select({ _id: 0, __v: 0, password: 0 });
  }

  getUserById(uuid) {
    return this.userModel.findOne({ uuid }).select({ _id: 0, __v: 0, password: 0 });
  }

  getUserByEmail(email) {
    return this.userModel.findOne({ email }).select({ _id: 0, __v: 0 });
  }
}

module.exports = {
  UserRepository,
};