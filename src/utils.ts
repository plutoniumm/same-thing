import { execSync } from "child_process";
import { join, resolve } from "path";
import fs from "fs";

// Stupid stuff
const clog = (color: number, message: string): void => console.log(`\x1b[${color}m${message}\x1b[0m`);
export const c = {
  alert: (msg: string): void => clog(31, msg),
  warn: (msg: string): void => clog(33, msg),
  success: (msg: string): void => clog(32, msg),
  info: (msg: string): void => clog(34, msg),
  log: (msg: string): void => clog(37, msg)
}


// READING OPERATIONS
export const dir = (path: string): string[] => fs.readdirSync(path, "utf-8");
export const read = (path: string): string => fs.readFileSync(path, "utf-8");
export const exists = (path: string): boolean => fs.existsSync(path);
// check if binary exists with `which <binary>`
export const hasBin = (binary: string): boolean => {
  let ret = false;
  try {
    if (execSync(`which ${binary}`))
      ret = true;
  } catch (error) {
    ret = false;
  }

  return ret;
};

// WRITING OPERATIONS
export const write = (path: string, data: string): void => {
  data = typeof data === "string" ? data : JSON.stringify(data);
  fs.writeFileSync(path, data, "utf-8");
};
export const ensureExists = (path: string): void => {
  if (!exists(path)) {
    ensureExists(resolve(path, ".."));
    fs.mkdirSync(path);
  }
};


// PROJECT OPERATIONS
// copy dir from template to project
export const copyDir = (templateDir: string, projectDir: string): void => {
  const files = dir(templateDir);
  files.forEach(file => {
    const src = join(templateDir, file);
    const dest = join(projectDir, file);
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      ensureExists(dest);
      copyDir(src, dest);
    } else {
      const data = read(src);
      write(dest, data);
    }
  });
};