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
          const id = req.params.id;
          const user = await UserService.updateUser(id, req.body);
          res.status(200).json({message: "User updated successful", data: user})
        }catch(error){
            next(error);
        }
    }
}

module.exports = new UserController();