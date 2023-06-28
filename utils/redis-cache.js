const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  host: process.env.REDISHOST,
  password: process.env.REDISPASSWORD,
  port: process.env.REDISPORT,
  username: process.env.REDISUSER,
});

redisClient
  .connect()
  .then(async () => {
    // console.log(await redisClient.get("one"));
    // console.log(await redisClient.exists("two"));
  })
  .catch((err) => {
    console.log(err);
  });

async function RedisClientConnection() {
  await redisClient.on("connect", () => {
    console.log("Redis client connected.");
  });

  await redisClient.on("error", (err) => {
    console.log("Redis client error:", err);
  });

  await redisClient.on("end", () => {
    console.log("Redis client connection closed.");
  });
}

async function getOrSetCache(key, callback) {
  return new Promise(async (resolve, reject) => {
    await redisClient.get(key).then(async (data) => {
      if (data != null) {
        console.log("cache hit");
        resolve(JSON.parse(data));
      }

      try {
        const newdata = await callback();
        await redisClient.setEx(key, 3600, JSON.stringify(newdata));
        console.log("cache set");
        resolve(newdata);
      } catch (err) {
        console.log("callback error:", err);
        reject(err);
      }
    });
  });
}

module.exports = { getOrSetCache, RedisClientConnection };
