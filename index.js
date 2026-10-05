#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

program
  .name("npminfo")
  .description(
    "CLI tool for looking up npm package info and searching the registry",
  )
  .usage("[command] [options]")
  .version("1.0.0", "--ver", "output the version program")
  .helpOption("--help", "display help for command");

const API_URL = "https://registry.npmjs.org";
const API_URL_MONTHLY = "https://api.npmjs.org/downloads/point/last-month";
const API_URL_WEEKLY = "https://api.npmjs.org/downloads/point/last-week";

function row(label, value) {
  console.log(`${label.padEnd(18)} ${value ?? "—"}`);
}

async function getDownloadsData(packageName) {
  const [weekDownloads, monthDownloads] = await Promise.all([
    fetch(`${API_URL_WEEKLY}/${packageName}`),
    fetch(`${API_URL_MONTHLY}/${packageName}`),
  ]);

  const weekData = await weekDownloads.json();
  const monthData = await monthDownloads.json();

  row("Weekly downloads", weekData.downloads);
  row("Monthly downloads", monthData.downloads);
}

async function getPackageData(packageName) {
  try {
    const response = await fetch(`${API_URL}/${packageName}`);
    if (!response.ok) {
      console.log(`Search failed (${response.status})`);
      process.exit(1);
    }
    const data = await response.json();

    row("Name", data.name);
    row("Description", data.description);
    row("Version", data["dist-tags"].latest);
    row("Author", data.author?.name);
    row("License", data.license);
    await getDownloadsData(packageName);
    row("Homepage", data.homepage);
    row("Bugs", data.bugs?.url);
    row("Keywords", data.keywords?.join(", "));
  } catch (error) {
    console.error(error);
  }
}

program
  .command("data <package>")
  .usage("<package>")
  .description("Data of package")
  .action((packageName) => {
    getPackageData(packageName);
  });

async function searchPackages(packageName, size) {
  try {
    const response = await fetch(
      `${API_URL}/-/v1/search?text=${packageName}&size=${size}`,
    );
    if (!response.ok) {
      console.log(`Search failed (${response.status})`);
      process.exit(1);
    }
    const data = await response.json();

    if (data.objects.length === 0) {
      console.log(`No packages found for ${packageName}`);
      process.exit(1);
    }

    data.objects.forEach((item) => {
      row("Name", item.package.name);
      row("Description", item.package.description);
      row("Version", item.package.version);
      row("Author", item.package.publisher?.username);
      row("License", item.package.license);
      row("Weekly downloads", item.downloads.weekly);
      row("Monthly downloads", item.downloads.monthly);
      row("Homepage", item.package.links?.homepage);
      row("Bugs", item.package.links?.bugs);
      console.log("");
    });
  } catch (error) {
    console.error(error);
  }
}

program
  .command("search <package> <size>")
  .usage("<package> <size>")
  .description("Search of package")
  .action((packageName, size) => {
    searchPackages(packageName, size);
  });

program.parse();
