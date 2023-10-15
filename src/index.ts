#!/usr/bin/env node
import degit from "degit";
import { isWin } from "./utils.js";
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
}

const options = [
  { value: 'ts-bun', label: 'Typescript (Bun+Hono)' },
  { value: 'go-templ', label: 'Go (Templ)' },
];

const pType = await select({
  message: 'Pick a project type.',
  options,
});

c.info(`Initialising ${options.find(o => o.value === pType).label
  } project...`);

const emitter = degit('plutoniumm/htmx-templates/' + pType, {
  force: true,
});

emitter.on('info', i => c.info(i.message));
emitter.clone(process.cwd()).then(() => {
  c.info("Cloned!");
}).catch((err) => {
  c.alert(err);
  process.exit(1);
});