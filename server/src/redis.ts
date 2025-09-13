import IORedis from "ioredis";

const redis = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

export async function getTotal(): Promise<number> {
  const v = await redis.get("global:petCount");
  return Number(v ?? 0);
}

export async function incTotal(by = 1): Promise<number> {
  return await redis.incrby("global:petCount", by);
}

export default redis;
