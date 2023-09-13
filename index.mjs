#!/usr/bin/env node

import { program } from "commander";
import cliMd from "cli-markdown";

program
  .name("ncharan")
  .usage("[options]")
  .option("-r, --resume", "Prints my developer resume.")
  .description("A command-line tool for displaying my developer resume");

program.parse(process.argv);

const { resume } = program.opts();

if (resume) {
  fetch(
    "https://raw.githubusercontent.com/ncharanaraj/ncharanaraj/main/README.md"
  )
    .then((response) => response.text())
    .then((text) => console.log(cliMd(text)));
}
