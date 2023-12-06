const { getFileContent } = require('../utils/readFile');

function getPart1() {
  const data: string = getFileContent('./inputs/input1.txt');
  const value: number = data.split('\n').reduce((currentValue: number, line: string): number => {
    let firstNumber: number = 0;
    let lastNumber: number = 0;
    line.split('').forEach((char: string) => {
      const maybeNumber: number = parseInt(char);
      if (!maybeNumber) {
        return;
      }
      if (!firstNumber) {
        firstNumber = maybeNumber;
      }
      lastNumber = maybeNumber;
    });
    return currentValue + ((firstNumber * 10) + lastNumber);
  }, 0);
  console.log(value);
}

type MaybeNumberString = {index: number, currentValue: string};

function getPart2() {
  const numberMap: Map<string, number> = new Map<string, number>();
  const numberStrings : string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  numberStrings.forEach((numberString: string, i: number) => {
    numberMap.set(numberString, i + 1);
  })
  const data: string = getFileContent('./inputs/input1.txt');
  const value: number = data.split('\n').reduce((currentValue: number, line: string): number => {
    let firstNumber: number = 0;
    let lastNumber: number = 0;
    let maybeStrings: MaybeNumberString[] = [];
    line.split('').forEach((char: string, i: number) => {
      const maybeNumber: number = parseInt(char);
      if (maybeNumber) {
        if (!firstNumber) {
          firstNumber = maybeNumber;
        }
        maybeStrings = [];
        lastNumber = maybeNumber;
        return;
      }
      maybeStrings = maybeStrings.filter((maybeNumberString: MaybeNumberString): boolean => {
        let shouldKeep: boolean = false;
        maybeNumberString.currentValue += char;
        numberStrings.forEach((numberString: string) => {
          if (numberString.slice(0, maybeNumberString.currentValue.length) === maybeNumberString.currentValue) {
            if (numberString.length === maybeNumberString.currentValue.length) {
              if (!firstNumber) {
                firstNumber = numberMap.get(numberString) || 0;
              }
              lastNumber = numberMap.get(numberString) || 0;
              return;
            }
            shouldKeep = true;
          }
        })
        return shouldKeep;
      });
      maybeStrings.push({index: i, currentValue: char});

    });
    return currentValue + ((firstNumber * 10) + lastNumber);
  }, 0);
  console.log(value);
}

getPart1();
getPart2();