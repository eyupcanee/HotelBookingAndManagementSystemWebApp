import ioredis from "ioredis";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const redisClient = new ioredis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (error) => {
  console.error("Redis connection error! : ", error);
  redisClient.end();
});

export const redisClear = () => {
  redisClient.flushall();
};

export default redisClient;
