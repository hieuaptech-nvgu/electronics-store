const bcrypt = require("bcrypt");

class HashUtils{
    async hashPassword(password){
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password, hashedPassword){
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = new HashUtils();