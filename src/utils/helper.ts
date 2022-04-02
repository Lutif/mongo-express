import { defaultTTL } from "./constants";
export const genHexString = (len: number): string => {
  const hex = "0123456789ABCDEF";
  let output = "";
  for (let i = 0; i < len; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length));
  }
  return output;
};

export const ttlExpired = (lastUpdateAt: string) => {
  const ttl = process.env.TTL || defaultTTL;
  const now = new Date().getTime();
  const lastUpdated = new Date(lastUpdateAt).getTime();
  return now - lastUpdated > ttl;
};
