/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov.js'); // Assuming MarkovMachine is defined in MarkovMachine.js

async function generateTextFromFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    const mm = new MarkovMachine(data);
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error reading file ${filename}: ${err.message}`);
    process.exit(1);
  }
}

async function generateTextFromURL(url) {
  try {
    const response = await axios.get(url);
    const mm = new MarkovMachine(response.data);
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error fetching URL ${url}: ${err.message}`);
    process.exit(1);
  }
}

function main() {
  const [sourceType, path] = process.argv.slice(2);

  if (!sourceType || !path) {
    console.error("Usage: node makeText.js <file|url> <path>");
    process.exit(1);
  }

  if (sourceType === "file") {
    generateTextFromFile(path);
  } else if (sourceType === "url") {
    generateTextFromURL(path);
  } else {
    console.error("Invalid source type. Please use 'file' or 'url'.");
    process.exit(1);
  }
}

main();

