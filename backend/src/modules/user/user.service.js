const UserRepository = require("./user.repository");
const HashUtils = require("../../utils/hash");

class UserService {
  async createUser(data) {
    const { fullName, email, phone, password, address, roles } = data;
    const emailDuplicate = await UserRepository.findByEmailIncludeDeleted(
      email
    );
    if (emailDuplicate) {
      throw new Error("Email already exists");
    }

    if (phone) {
      const phoneDuplicate = await UserRepository.findByPhoneIncludeDeleted(
        phone
      );
      if (phoneDuplicate) {
        throw new Error("Phone already exists");
      }
    }

    const hashedPassword = await HashUtils.hashPassword(password);

    const newUser = await UserRepository.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      address,
      roles: roles || "user",
    });

    return newUser;
  }

  async updateUser(id, data) {
    const { fullName, email, phone, password, address, roles } = data;
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if(!user.isActive){
      throw new Error("The user has been locked");
    }

    if (phone && phone !== user.phone) {
      const phoneDuplicate = await UserRepository.findByPhoneIncludeDeleted(
        phone
      );
      if (phoneDuplicate) {
        throw new Error("Phone number already used by another account");
      }
    }

    if (email && email !== user.email) {
      const emailDuplicate = await UserRepository.findByEmailIncludeDeleted(
        email
      );
      if (emailDuplicate) {
        throw new Error("Email already used by another account");
      }
    }

    const updateData = {};

    if (fullName !== undefined) updateData.fullName = fullName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (roles !== undefined) updateData.roles = roles;
    
    if(password){
      updateData.password = await HashUtils.hashPassword(password)
    } 

    const updatedUser = await UserRepository.update(id, updateData);

    return updatedUser 
  }

  async getMyProfile(id){
    const user = await UserRepository.findById(id);
    if(!user){
      throw new Error("User not found");
    }
    return user
  }
}

module.exports = new UserService();
