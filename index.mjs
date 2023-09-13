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
    "https://raw.githubusercontent.com/ncharanaraj/npm-resume/main/RESUME.md",
    {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }
  )
    .then((response) => response.text())
    .then((text) => console.log(cliMd(text)))
    .catch((e) => console.log("Error fetching resume", e));
} else {
  fetch(
    "https://raw.githubusercontent.com/ncharanaraj/ncharanaraj/main/README.md",
    {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }
  )
    .then((response) => response.text())
    .then((text) => console.log(cliMd(text)))
    .catch((e) => console.log("Error fetching about", e));
}
