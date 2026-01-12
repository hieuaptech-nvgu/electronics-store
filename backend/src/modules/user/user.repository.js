const User = require("./user.schema");

class UserRepository {
  async create(user) {
    return await User.create(user);
  }

  async findById(id) {
    return await User.findById(id).where({ isDeleted: false, isActive: true });
  }

  async findByEmail(email) {
    return await User.findOne({ email, isDeleted: false, isActive: true });
  }

  async findByPhone(phone) {
    return await User.findOne({ phone, isDeleted: false, isActive: true });
  }

  async findByIdIncludeDeleted(id) {
    return await User.findById(id);
  }

  async findByEmailIncludeDeleted(email) {
    return await User.findOne({ email });
  }

  async findByPhoneIncludeDeleted(phone) {
    return await User.findOne({ phone });
  }

  async findAllActive() {
    return await User.find({ isDeleted: false, isActive: true });
  }

  async findAllDisabled() {
    return await User.find({ isActive: false, isDeleted: false });
  }

  async findAllDeleted() {
    return await User.find({ isDeleted: true });
  }

  async deactivate(id) {
    return await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }

  async activate(id) {
    return await User.findOneAndUpdate(
      { _id: id, isDeleted: false }, //filter
      { isActive: true }, //update
      { new: true } //options
    );
  }

  async softDelete(id) {
    return await User.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false },
      { new: true }
    );
  }

  async existsByEmail(email) {
    return await User.exists({ email, isDeleted: false });
  }

  async existsByPhone(phone) {
    return await User.exists({ phone, isDeleted: false });
  }

  async update(id, data) {
    return await User.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      data,
      { new: true }
    );
  }
}

module.exports = new UserRepository();