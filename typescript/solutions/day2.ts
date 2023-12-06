const { getFileContent } = require('../utils/readFile');

function getPart1() {
  const data: string = getFileContent('./inputs/input2.txt');
  let value: number = 0;
  const colorScoreMap: Map<string, number> = new Map();
  colorScoreMap.set('red', 12);
  colorScoreMap.set('green', 13);
  colorScoreMap.set('blue', 14);
  data.split('\n').forEach((line: string) => {
    if (!line) {
      return;
    }
    const id = parseInt(line.split(': ')[0].split(' ').pop() || '');
    let gameImpossible = false;
    line.split(': ')[1].split('; ').forEach((game: string) => {
      if (gameImpossible) {
        return;
      }
      game.split(', ').forEach((cubeScore: string) => {
        if (gameImpossible) {
          return;
        }
        const score: number = parseInt(cubeScore.split(' ')[0]);
        const color: string = cubeScore.split(' ')[1];
        if (!colorScoreMap.has(color)) {
          gameImpossible = true;
          return;
        }
        if (colorScoreMap.get(color)! < score) {
          gameImpossible = true;
        }
      })
    })
    if (!gameImpossible) {
      value += id;
    }
  });
  console.log(value);
}

function getPart2() {
  const data: string = getFileContent('./inputs/input2.txt');
  let value: number = 0;
  data.split('\n').forEach((line: string) => {
    if (!line) {
      return;
    }
    let maxes: {[color: string]: number} = {
      'red': 1,
      'blue': 1,
      'green': 1
    };
    let gameImpossible = false;
    line.split(': ')[1].split('; ').forEach((game: string) => {
      if (gameImpossible) {
        return;
      }
      game.split(', ').forEach((cubeScore: string) => {
        if (gameImpossible) {
          return;
        }
        const score: number = parseInt(cubeScore.split(' ')[0]);
        const color: string = cubeScore.split(' ')[1];
        if (maxes[color] < score) {
          maxes[color] = score;
        }
      })
    })
    value += Object.values(maxes).reduce((acc: number, cur: number): number => acc * cur, 1)
  });
  console.log(value);
}

getPart1();
getPart2();