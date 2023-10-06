import { execSync } from "child_process";
import { } from "./node.js";

const checkBin = (binary: string): boolean => {
  let ret = false;
  try {
    if (execSync(`which ${binary}`))
      ret = true;
  } catch (error) {
    ret = false;
  }

  return ret;
};

type N<T> = T | T[];
export const hasBin = (binaries: N<string>): N<boolean> => {
  if (typeof binaries === "string") {
    return checkBin(binaries);
  };
  const ret = [];
  binaries.forEach(binary => {
    ret.push(checkBin(binary));
  });
  return ret;
};