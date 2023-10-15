#!/usr/bin/env node
import degit from "degit";
import { options, depCheck } from "./deps.js";
import type { TNames } from "./deps.js";
import { isWin, isGit, checkBin } from "./utils.js";
import { c, sh, dir } from "./node.js";
import { intro, outro, select } from '@clack/prompts';

if (isWin()) {
  c.alert("Niche OSes made for gaming may have issues with this tool.")
  process.exit(1);
};
intro("Welcome to htmx / skill-issue (same-thing)");

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
};

const pType = await select({
  message: 'Pick a project type.',
  options,
}) as TNames;
c.info(`Initialising ${pType} project...`);

const emitter = degit(`plutoniumm/htmx-templates/${pType}`, {
  force: true,
  cache: false,
  verbose: false,
});

emitter.on('info', i => c.info(i.message));
emitter.clone(process.cwd()).then(() => {
  const deps = depCheck[pType];
  for (const dep of deps) {
    const has = checkBin(dep);
    if (!has) {
      c.warn(`${dep} binary not found. It's recommended to install it`);
    };
  };

  if (!isGit(files)) {
    sh("git init -q");
    c.success(`Initialised git repo with ${pType}`);
  } else {
    c.success(`Initialised ${pType}`);
  };
  outro(`You're all set!`);
}).catch((err) => {
  c.alert(err);
  process.exit(1);
});