const { getFileContent } = require('../utils/readFile');

function getPart1() {
  const data: string = getFileContent('./inputs/input3.txt');
  let value: number = 0;
  let partNumbers: number[] = [];
  const lines = data.split('\n');
  for(let i: number = 0; i < lines.length; i++) {
    let currentNumber: string|null = null;
    let currentNumberStartIndex: number = 0;
    lines[i].split('').forEach((char: string, j: number) => {
      const isNumber: boolean = char >= '0' && char <= '9';
      if (isNumber) {
        if (!!currentNumber) {
          currentNumber = currentNumber + char;
        } else {
          currentNumber = char;
          currentNumberStartIndex = j;
        }
      } 
      if (!isNumber || j === lines[i].length - 1) {
        if (!!currentNumber) {
          const adjChars: string[] = [];
          const leftIndex: number = currentNumberStartIndex !== 0 ? currentNumberStartIndex - 1 : 0;
          const rightIndex: number = j;
          const prevChar: string = lines[i][leftIndex];
          const nextChar: string = lines[i][rightIndex];
          let aboveChars: string = '';
          let belowChars: string = '';
          adjChars.push(prevChar);
          adjChars.push(nextChar);
          if (i > 0) {
            aboveChars= lines[i - 1].slice(leftIndex, rightIndex + 1);
            adjChars.push(...aboveChars.split(''));
          }
          if (i < lines.length - 1) {
            belowChars= lines[i + 1].slice(leftIndex, rightIndex + 1);
            adjChars.push(...belowChars.split(''));
          }
          const hasSymbol: boolean = adjChars.some((char: string) => !(char >= '0' && char <= '9') && char !== '.');
          if (hasSymbol) {
            partNumbers.push(parseInt(currentNumber));
          }
          currentNumber = null;
        }
      }
    })
  }
  console.log(partNumbers);
  value = partNumbers.reduce((acc: number, cur: number) => acc + cur, 0)
  console.log(value);
}

type foundNumber = {
  value: number, 
  line: number,
  start: number,
  end: number
};

function getPart2() {
  // const data: string = getFileContent('./inputs/input3.txt');
  const data: string = '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..';
  let value: number = 0;
  let numbers: foundNumber[] = [];
  let partsWithNothingAroundThem: number[] = [];
  const lines = data.split('\n');
  for(let i: number = 0; i < lines.length; i++) {
    let currentNumber: string|null = null;
    let currentNumberStartIndex: number = 0;
    lines[i].split('').forEach((char: string, j: number) => {
      const isNumber: boolean = char >= '0' && char <= '9';
      if (isNumber) {
        if (!!currentNumber) {
          currentNumber = currentNumber + char;
        } else {
          currentNumber = char;
          currentNumberStartIndex = j;
        }
      } 
      if (!isNumber || j === lines[i].length - 1) {
        if (!!currentNumber) {
          numbers.push({
            value: parseInt(currentNumber),
            line: i,
            start: currentNumberStartIndex,
            end: j
          });
          currentNumber = null;
        }
      }
    })

  }
  console.log(partNumbers);
  value = partNumbers.reduce((acc: number, cur: number) => acc + cur, 0)
  console.log(value);
}


getPart1();
getPart2();