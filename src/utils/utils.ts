/*
TODO:
1. organize/break into files
2. SEO
*/

import { TEXT } from './wilhelm';

enum Coin {
  Tails = 0,
  Heads = 1,
}

export enum Line {
  BrokenPlus = Coin.Tails + Coin.Tails + Coin.Tails, // 0
  Straight = Coin.Heads + Coin.Tails + Coin.Tails, // 1
  Broken = Coin.Heads + Coin.Heads + Coin.Tails, // 2
  StraightPlus = Coin.Heads + Coin.Heads + Coin.Heads, // 3
}

interface Trigrams {
  [key: string]: string;
}

// TODO: convert to enum.
const Trigrams: Trigrams = {
  // '222': 'Ch\'ien',
  [`${Line.Straight}${Line.Straight}${Line.Straight}`]: "Ch'ien",
  // '211': 'Chen',
  [`${Line.Straight}${Line.Broken}${Line.Broken}`]: 'Chen',
  // '121': 'K\'an',
  [`${Line.Broken}${Line.Straight}${Line.Broken}`]: "K'an",
  // '112': 'Ken',
  [`${Line.Broken}${Line.Broken}${Line.Straight}`]: 'Ken',
  // '111': 'K\'un',
  [`${Line.Broken}${Line.Broken}${Line.Broken}`]: "K'un",
  // '122': 'Sun',
  [`${Line.Broken}${Line.Straight}${Line.Straight}`]: 'Sun',
  // '212': 'Li',
  [`${Line.Straight}${Line.Broken}${Line.Straight}`]: 'Li',
  // '221': 'Tui',
  [`${Line.Straight}${Line.Straight}${Line.Broken}`]: 'Tui',
};

interface ReverseTrigrams {
  [key: string]: [Line, Line, Line];
}

const ReverseTrigrams: ReverseTrigrams = {
  "Ch'ien": [Line.Straight, Line.Straight, Line.Straight],
  Chen: [Line.Straight, Line.Broken, Line.Broken],
  "K'an": [Line.Broken, Line.Straight, Line.Broken],
  Ken: [Line.Broken, Line.Broken, Line.Straight],
  "K'un": [Line.Broken, Line.Broken, Line.Broken],
  Sun: [Line.Broken, Line.Straight, Line.Straight],
  Li: [Line.Straight, Line.Broken, Line.Straight],
  Tui: [Line.Straight, Line.Straight, Line.Broken],
};

interface TrigramLookupOrder {
  [Key: string]: number;
}

interface ReverseTrigramLookupOrder {
  [Key: number]: string;
}
const TRIGRAM_LOOKUP_ORDER: TrigramLookupOrder = {
  "Ch'ien": 0,
  Chen: 1,
  "K'an": 2,
  Ken: 3,
  "K'un": 4,
  Sun: 5,
  Li: 6,
  Tui: 7,
};

const REVERSE_TRIGRAM_LOOKUP_ORDER: ReverseTrigramLookupOrder = {
  0: "Ch'ien",
  1: 'Chen',
  2: "K'an",
  3: 'Ken',
  4: "K'un",
  5: 'Sun',
  6: 'Li',
  7: 'Tui',
};

const HEXAGRAM_LOOKUP_TABLE = [
  [1, 34, 5, 26, 11, 9, 14, 43],
  [25, 51, 3, 27, 24, 42, 21, 17],
  [6, 40, 29, 4, 7, 59, 64, 47],
  [33, 62, 39, 52, 15, 53, 56, 31],
  [12, 16, 8, 23, 2, 20, 35, 45],
  [44, 32, 48, 18, 46, 57, 50, 28],
  [13, 55, 63, 22, 36, 37, 30, 49],
  [10, 54, 60, 41, 19, 61, 38, 58],
];

interface HexagramNames {
  [key: number]: string;
}
// TODO: correct names
const HEXAGRAM_NAMES: HexagramNames = {
  1: 'The Creative',
  2: 'The Receptive',
  3: 'Difficulty at the Beginning',
  4: 'Youthful Folly',
  5: 'Waiting (Nourishment)',
  6: 'Conflict',
  7: 'The Army',
  8: 'Holding Together [Union]',
  9: 'The Taming Power of the Small',
  10: 'Treading [Conduct]',
  11: 'Peace',
  12: 'Standstill [Stagnation]',
  13: 'Fellowship',
  14: 'Possession in Great Measure',
  15: 'Modesty',
  16: 'Enthusiasm',
  17: 'Following',
  18: 'Work on What Has Been Spoiled',
  19: 'Approach',
  20: 'Contemplation (View)',
  21: 'Biting Through',
  22: 'Grace',
  23: 'Splitting Apart',
  24: 'Return (The Turning Point)',
  25: 'Innocence (The Unexpected)',
  26: 'The Taming Power of the Great',
  27: 'The Corners of the Mouth',
  28: 'Preponderance of the Great',
  29: 'The Abysmal (Water)',
  30: 'The Clinging, Fire',
  31: 'Influence (Wooing)',
  32: 'Duration',
  33: 'Retreat',
  34: 'The Power of the Great',
  35: 'Progress',
  36: 'Darkening of the Light',
  37: 'The Family [The Clan]',
  38: 'Opposition',
  39: 'Obstruction',
  40: 'Deliverance',
  41: 'Decrease',
  42: 'Increase',
  43: 'Break-through (Resoluteness)',
  44: 'Coming to Meet',
  45: 'Gathering Together [Massing]',
  46: 'Pushing Upward',
  47: 'Oppression (Exhaustion)',
  48: 'The Well',
  49: 'Revolution (Molting)',
  50: 'The Cauldron',
  51: 'The Arousing (Shock, Thunder)',
  52: 'Keeping Still, Mountain',
  53: 'Development (Gradual Progress)',
  54: 'The Marrying Maiden',
  55: 'Abundance [Fullness]',
  56: 'The Wanderer',
  57: 'The Gentle (The Penetrating, Wind)',
  58: 'The Joyous, Lake',
  59: 'Dispersion [Dissolution]',
  60: 'Limitation',
  61: 'Inner Truth',
  62: 'Preponderance of the Small',
  63: 'After Completion',
  64: 'Before Completion',
};

export class Trigram {
  lines: [Line, Line, Line];
  key: string;
  trigramName: string;
  trigramLookup: number;
  changing: boolean;
  changingLines: number[];

  constructor(lines?: [Line, Line, Line]) {
    this.lines = lines || [this.getLine(), this.getLine(), this.getLine()];
    this.key = this.getKey(this.lines);
    this.trigramName = Trigrams[this.key];
    this.trigramLookup = TRIGRAM_LOOKUP_ORDER[this.trigramName];
    this.changing = this.lines.some(
      (line: Line) => line === Line.BrokenPlus || line === Line.StraightPlus
    );
    this.changingLines = this.lines.reduce<number[]>(
      (acc: number[], el: Line, i: number) => {
        if (el == Line.BrokenPlus || el === Line.StraightPlus) {
          acc.push(i);
        }
        return acc;
      },
      [] as number[]
    );
  }

  coinToss = (): Coin => Math.round(Math.random()) as Coin;

  getLine = (): Line =>
    (this.coinToss() + this.coinToss() + this.coinToss()) as Line;

  normalizeLine(line: Line): Line {
    switch (line) {
      case Line.BrokenPlus:
        return Line.Broken;
      case Line.StraightPlus:
        return Line.Straight;
      default:
        return line;
    }
  }

  changeLine(line: Line): Line {
    switch (line) {
      case Line.BrokenPlus:
        return Line.Straight;
      case Line.StraightPlus:
        return Line.Broken;
      default:
        return line;
    }
  }

  forceChanging(line: Line): Line {
    switch (line) {
      case Line.Broken:
        return Line.BrokenPlus;
      case Line.Straight:
        return Line.StraightPlus;
      default:
        return line;
    }
  }

  forceChangingLines(
    changeFirst?: boolean,
    changeSecond?: boolean,
    changeThird?: boolean
  ): [Line, Line, Line] {
    return [
      changeFirst ? this.forceChanging(this.lines[0]) : this.lines[0],
      changeSecond ? this.forceChanging(this.lines[1]) : this.lines[1],
      changeThird ? this.forceChanging(this.lines[2]) : this.lines[2],
    ];
  }

  changeLines(): [Line, Line, Line] {
    return this.lines.map((line: Line) => this.changeLine(line)) as [
      Line,
      Line,
      Line,
    ];
  }

  normalizeLines(): [Line, Line, Line] {
    return this.lines.map((line: Line) => this.normalizeLine(line)) as [
      Line,
      Line,
      Line,
    ];
  }

  getKey(lines: Line[]) {
    const normalizedLines = lines.map((line: Line) => this.normalizeLine(line));
    const key =
      '' + normalizedLines[0] + normalizedLines[1] + normalizedLines[2];
    return key;
  }
}

export class Hexagram {
  lowerTrigram: Trigram;
  upperTrigram: Trigram;
  hexagramNumber: number;
  hexagramName: string;
  isChanging: boolean;
  isChanged: boolean;
  text: string;
  changingLines: number[];
  changingLinesText: string[];

  constructor({
    lowerTrigram,
    upperTrigram,
    isChanged = false,
    forceHexagramNumber,
    forceChangingLines,
  }: {
    lowerTrigram?: Trigram;
    upperTrigram?: Trigram;
    isChanged?: boolean;
    forceHexagramNumber?: number | null;
    forceChangingLines?: number[] | null;
  } = {}) {
    if (
      forceHexagramNumber &&
      forceHexagramNumber > 1 &&
      forceHexagramNumber <= 64
    ) {
      this.hexagramNumber = forceHexagramNumber;

      this.hexagramName = HEXAGRAM_NAMES[this.hexagramNumber];
      this.text = TEXT[this.hexagramNumber].text;
      this.isChanged = false;

      const cleanedForceChangingLines = forceChangingLines?.filter(
        l => l > 0 && l <= 6
      );

      if (cleanedForceChangingLines?.length) {
        this.isChanging = true;
        this.changingLines = cleanedForceChangingLines;

        this.changingLinesText = [
          ...this.changingLines.map(
            displayNum => TEXT[this.hexagramNumber].lines[displayNum - 1]
          ),
        ];
      } else {
        this.changingLines = [];
        this.changingLinesText = [];
        this.isChanging = false;
      }

      for (let i = 0; i < HEXAGRAM_LOOKUP_TABLE.length; i++) {
        for (let j = 0; j < HEXAGRAM_LOOKUP_TABLE[i].length; j++) {
          if (HEXAGRAM_LOOKUP_TABLE[i][j] === forceHexagramNumber) {
            this.lowerTrigram = new Trigram(
              new Trigram(
                ReverseTrigrams[REVERSE_TRIGRAM_LOOKUP_ORDER[i]]
              ).forceChangingLines(
                this.changingLines.includes(1),
                this.changingLines.includes(2),
                this.changingLines.includes(3)
              )
            );
            this.upperTrigram = new Trigram(
              new Trigram(
                ReverseTrigrams[REVERSE_TRIGRAM_LOOKUP_ORDER[j]]
              ).forceChangingLines(
                this.changingLines.includes(4),
                this.changingLines.includes(5),
                this.changingLines.includes(6)
              )
            );
          }
        }
      }
      return;
    }

    this.lowerTrigram = lowerTrigram || new Trigram();
    this.upperTrigram = upperTrigram || new Trigram();
    this.hexagramNumber =
      HEXAGRAM_LOOKUP_TABLE[this.lowerTrigram.trigramLookup][
        this.upperTrigram.trigramLookup
      ];

    this.hexagramName = HEXAGRAM_NAMES[this.hexagramNumber];
    this.text = TEXT[this.hexagramNumber].text;

    this.isChanging = this.lowerTrigram.changing || this.upperTrigram.changing;
    this.isChanged = isChanged;
    this.changingLines = [
      ...this.lowerTrigram.changingLines.map(i => i + 1),
      ...this.upperTrigram.changingLines.map(i => i + 4),
    ];
    this.changingLinesText = [
      ...this.changingLines.map(
        displayNum => TEXT[this.hexagramNumber].lines[displayNum - 1]
      ),
    ];
  }

  private getLinesAscending(): Line[] {
    return [...this.lowerTrigram.lines, ...this.upperTrigram.lines];
  }

  getLinesDescending(): Line[] {
    return this.getLinesAscending().reverse();
  }

  getChangingHex(): Hexagram | null {
    if (!this.isChanging) {
      return null;
    }

    const newLower = new Trigram(this.lowerTrigram.changeLines());
    const newUpper = new Trigram(this.upperTrigram.changeLines());

    return new Hexagram({
      lowerTrigram: newLower,
      upperTrigram: newUpper,
      isChanged: true,
    });
  }
}
