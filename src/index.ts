#!/usr/bin/env node
import degit from "degit";
import { options, depCheck } from "./deps.js";
import type { TNames } from "./deps.js";
import { isWin, isGit, checkBin } from "./utils.js";
import { c, sh, dir, write } from "./node.js";
import { intro, outro, select } from '@clack/prompts';

const args = process.argv.slice(2);
// TODO: new dir

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
const asseter = degit(`plutoniumm/htmx-templates/assets`, {
  force: true,
  cache: true,
  verbose: false,
});

declare global {
  var fetch: any;
}

emitter.on('info', i => c.info(i.message));
emitter.clone(process.cwd()).then(async () => {
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

    const index = await fetch("https://raw.githubusercontent.com/plutoniumm/htmx-templates/main/index.html")
      .then(r => r.text())
      .then((t) => {
        const [engine, runtime] = pType.split("-");
        t = t
          .replaceAll("&engine;", engine)
          .replaceAll("&runtime;", runtime);

        return t;
      })
    // write to index.html
    write("index.html", index);
  } else {
    c.success(`Initialised ${pType}`);
  };
  asseter.clone(process.cwd() + "/assets").then(async () => {
    c.success(`Initialised assets`);
    outro(`You're all set!`);

    process.exit(0);
  });
}).catch((err) => {
  c.alert(err);
  process.exit(1);
});