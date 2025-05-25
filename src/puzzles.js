// src/puzzles.js

// Manual list of daily 5×5 puzzles. Add new entries keyed by date (YYYY-MM-DD).
const puzzles = {
  "2025-05-26": {
    size: 5,
    grid: [
      ["", "C", "A", "N", ""],
      ["C", "O", "M", "I", "C"],
      ["L", "A", "U", "G", "H"],
      ["A", "T", "S", "E", "A"],
      ["Y", "I", "E", "L", "D"]
    ],
    clues: {
      across: {
        1: "Tin holder, or slang for toilet",
        2: "Funny drawing or story",
        3: "To express amusement audibly",
        4: "Out on the ocean",
        5: "To give in or surrender"
      },
      down: {
        1: "Raccoon relative native to Central America",
        2: "Entertain or tickle someone's funny bone",
        3: "Common British male name",
        4: "Pottery material",
        5: "West African country"
      }
    },
    positions: {
      across: {
        1: { row: 0, col: 1, answer: "CAN" },
        2: { row: 1, col: 0, answer: "COMIC" },
        3: { row: 2, col: 0, answer: "LAUGH" },
        4: { row: 3, col: 0, answer: "ATSEA" },
        5: { row: 4, col: 0, answer: "YIELD" }
      },
      down: {
        1: { row: 0, col: 1, answer: "COATI" },
        2: { row: 0, col: 2, answer: "AMUSE" },
        3: { row: 0, col: 3, answer: "NIGEL" },
        4: { row: 1, col: 0, answer: "CLAY" },
        5: { row: 1, col: 4, answer: "CHAD" }
      }
    }
  },
  "2025-05-27": {
    size: 5,
    grid: [
      ["", "M", "A", "R", "S"],
      ["P", "I", "L", "O", "T"],
      ["O", "M", "E", "G", "A"],
      ["M", "I", "X", "E", "R"],
      ["S", "C", "A", "R", ""]
    ],
    clues: {
      across: {
        1: "Red planet",
        2: "Airplane operator",
        3: "Last Greek letter",
        4: "Kitchen appliance for mixing",
        5: "A scratch or mark from a wound"
      },
      down: {
        1: "To imitate closely",
        2: "Amazon voice assistant",
        3: "Radio confirmation word",
        4: "Heavenly body",
        5: "Cheerleaders’ props"
      }
    },
    positions: {
      across: {
        1: { row: 0, col: 1, answer: "MARS" },
        2: { row: 1, col: 0, answer: "PILOT" },
        3: { row: 2, col: 0, answer: "OMEGA" },
        4: { row: 3, col: 0, answer: "MIXER" },
        5: { row: 4, col: 0, answer: "SCAR" }
      },
      down: {
        1: { row: 0, col: 1, answer: "MIMIC" },
        2: { row: 0, col: 2, answer: "ALEXA" },
        3: { row: 0, col: 3, answer: "ROGER" },
        4: { row: 0, col: 4, answer: "STAR" },
        5: { row: 1, col: 0, answer: "POMS" }
      }
    }
  },
  "2025-05-28": {
    size: 5,
    grid: [
      ["", "S", "U", "S", ""],
      ["R", "A", "N", "C", "H"],
      ["E", "M", "B", "E", "R"],
      ["M", "O", "O", "N", "S"],
      ["", "A", "X", "E", ""]
    ],
    clues: {
      across: {
        1: "Shorthand for suspicious",
        2: "Large farm property",
        3: "Glowing coal or fire remnant",
        4: "Celestial objects orbiting planets",
        5: "Tool with a blade for chopping"
      },
      down: {
        1: "South Pacific island nation",
        2: "Open a box",
        3: "Movie sequence",
        4: "Sleep stage (abbr.)",
        5: "Abbrev. for hours"
      }
    },
    positions: {
      across: {
        1: { row: 0, col: 1, answer: "SUS" },
        2: { row: 1, col: 0, answer: "RANCH" },
        3: { row: 2, col: 0, answer: "EMBER" },
        4: { row: 3, col: 0, answer: "MOONS" },
        5: { row: 4, col: 1, answer: "AXE" }
      },
      down: {
        1: { row: 0, col: 1, answer: "SAMOA" },
        2: { row: 0, col: 2, answer: "UNBOX" },
        3: { row: 0, col: 3, answer: "SCENE" },
        4: { row: 1, col: 0, answer: "REM" },
        5: { row: 1, col: 4, answer: "HRS" }
      }
    }
  },
  default: {
    size: 3,
    grid: [
      ["C","A","T"],
      ["A","R","E"],
      ["T","E","N"]
    ],
    clues: {
      across: {
        1: "A common pet",
        2: "To be",
        3: "After nine"
      },
      down: {
        1: "Feline again",
        2: "Expression form",
        3: "Number word"
      }
    },
    positions: {
      across: {
        1: { row: 0, col: 0, answer: "CAT" },
        2: { row: 1, col: 0, answer: "ARE" },
        3: { row: 2, col: 0, answer: "TEN" }
      },
      down: {
        1: { row: 0, col: 0, answer: "CAT" },
        2: { row: 0, col: 1, answer: "ARE" },
        3: { row: 0, col: 2, answer: "TEN" }
      }
    }
  }
};

export default puzzles;
