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
const resumeURL =
  "https://raw.githubusercontent.com/ncharanaraj/ncharanaraj/main/RESUME.md";
const readmeURL =
  "https://raw.githubusercontent.com/ncharanaraj/ncharanaraj/main/README.md";

async function fetchMarkdownContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch content. Status code: ${response.status}`
      );
    }
    const text = await response.text();
    return text;
  } catch (error) {
    throw new Error(`Error fetching content: ${error.message}`);
  }
}

async function displayMarkdown(url) {
  try {
    const markdownContent = await fetchMarkdownContent(url);
    const formattedText = cliMd(markdownContent);
    console.log(formattedText);
  } catch (error) {
    console.error(error.message);
  }
}

if (resume) {
  displayMarkdown(resumeURL);
} else {
  displayMarkdown(readmeURL);
}
