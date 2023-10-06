#!/usr/bin/env node
import sys from "./sys.js";
import { c, sh, dir } from "./utils.js";
import { intro, outro, select } from '@clack/prompts';

if (sys.isWin) {
  c.alert("Niche OSes made for gaming may have issues with this tool.")
  //   process.exit(1);
};

intro("Welcome to htmx / destroy-react-app (same-thing)");

// check if directory is empty
const files = dir(process.cwd());
if (files.filter(f => !f.startsWith(".")).length > 0) {
  const confirm = await select({
    message: `\x1b[33m${"Directory is not empty. Still continue?"}\x1b[0m`,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  });

  if (confirm === "no") {
    c.log("Exiting...");
    process.exit(1);
  }
}

const projectType = await select({
  message: 'Pick a project type.',
  options: [
    { value: 'tsx', label: 'Typescript (Bun+Hono)' },
    { value: 'go', label: 'Go (Templ)' },
  ],
});
