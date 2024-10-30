/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {}; // initialize chains as an empty object

    for (let i = 0; i < this.words.length; i++) {
        let word = this.words[i];
        let nextWord = this.words[i + 1] || null; // null for end of chain

        // If the word is not yet a key in chains, create it with an empty array
        if (!this.chains[word]) {
            this.chains[word] = [];
        }

        // Add the next word (or null if at the end) to the array for this word
        this.chains[word].push(nextWord);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const words = Object.keys(this.chains);
    let currentWord = words[Math.floor(Math.random() * words.length)]
    let output = [currentWord];

    while (output.length < numWords) {
      let nextWords = this.chains[currentWord] || null;

      if (nextWords.length === 0) break;

      currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      if (currentWord === null) break;

      output.push(currentWord);
    }
    return output.join(" ");
  }
}

module.exports = {MarkovMachine}