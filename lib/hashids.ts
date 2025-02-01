import Hashids from "hashids";

const hashids = new Hashids("hsSp028ama2poa", 6);
export const encodeId = (id: number): string => hashids.encode(id);
export const decodeId = (hash: string): number | null => {
  const decoded = hashids.decode(hash);
  return decoded.length > 0 ? Number(decoded[0]) : null;
};
