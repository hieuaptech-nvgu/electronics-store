const {createClient} = require("redis");
require("dotenv").config();

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD,
});


redisClient.on("connect", () => {
    console.log("Redis connecting...");
});

redisClient.on("ready", () => {
    console.log("Redis connected successfully");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
    if(!redisClient.isOpen){
        await redisClient.connect();
    }
})();


module.exports = redisClient;