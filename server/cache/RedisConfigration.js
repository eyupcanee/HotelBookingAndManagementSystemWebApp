import ioredis from "ioredis";
import dotenv from "dotenv";

dotenv.config({ path: "../.env.development.local" });

const redisClient = new ioredis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (error) => {
  console.error("Redis connection error! : ", error);
  redisClient.end();
});

export default redisClient;
