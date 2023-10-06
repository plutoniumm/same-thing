#!/usr/bin/env node
import sys from "./sys";
import { c } from "./utils";

if (sys.isWin) {
  c.alert("Niche OSes made for gaming are not supported yet.")
  process.exit(1);
};

c.info("Welcome to destroy-react-app / htmx (same-thing)");
