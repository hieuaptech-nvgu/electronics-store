const UserService = require("./user.service");

class UserController{
    async createUser(req, res, next){
        try{
            const user = await UserService.createUser(req.body);
            res
              .status(201)
              .json({ message: "Created user successful", data: user });
        }catch(error){
            next(error);
        }
    }

    async updateUser(req, res, next){
        try{
          const id = req.user.id;
          const user = await UserService.updateUser(id, req.body);
          res.status(200).json({message: "User updated successful", data: user})
        }catch(error){
            next(error);
        }
    }

    async getMyProfile(req, res, next){
        try{
            const id = req.user.id;
            const user = await UserService.getMyProfile(id);
            res.status(200).json({message: "get profile successful", data: user});
        }catch(error){
            next(error);
        }
    }
    async activateUser(req, res, next){
        try{
            const id = req.user.id;
            const user = await UserService.activateUser(id);
            res.status(200).json({message: "User unlocked successfully", data: user})
        }catch(error){
            next(error);
        }
    }

    async deactivateUser(req, res, next){
        try{
            const id = req.user.id;
            const user = await UserService.deactivateUser(id);
            res.status(200).json({message: "User locked successfully", data: user})
        }catch(error){
            next(error);
        }
    }

    async deleteUser(req, res, next){
        try{
            const id = req.params.id;
            const user = await UserService.deleteUser(id);
            res.status(200).json({message: "User deleted successfully", data: user})
        }catch(error){
            next(error);
        }
    }
}

module.exports = new UserController();