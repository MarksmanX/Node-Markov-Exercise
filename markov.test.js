const {MarkovMachine} = require('./markov.js');

describe('Markov Machine', () => {
    let mm;

    beforeEach(() => {
        mm = new MarkovMachine("the cat in the hat");
    });

    test('makeChains generates the correct chains', () => {
        const chains = mm.chains;
        const expectedChains = {
            "the": ["cat", "hat"],
            "cat": ["in"],
            "in": ["the"],
            "hat": [null]
        };
        expect(chains).toEqual(expectedChains);
    })

    test("makeText generates text of approximately the specified length", () => {
        const generatedText = mm.makeText(5);
        const wordCount = generatedText.split(" ").length;
        expect(wordCount).toBeLessThanOrEqual(5);
      });
})