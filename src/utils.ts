import { execSync } from "child_process";

export function isWin () {
  return process.platform === 'win32'
};
export function isGit (file_list) {
  return file_list.includes(".git");
}

export const checkBin = (binary: string): boolean => {
  let ret = false;
  try {
    if (execSync(`which ${binary}`))
      ret = true;
  } catch (error) {
    ret = false;
  }

  return ret;
};