const { getFileContent } = require('../utils/readFile');

function getPart1() {
  const data: string = getFileContent('./inputs/input4.txt');
  // const data: string = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11';
  let value: number = 0;
  data.split('\n').forEach((card: string) => {
    if (!card) {
      return;
    }
    const c: string = card.split('  ').join(' ');
    const winningNumbers: number[] = c.split(': ')[1].split(' | ')[0].split(' ').map((x: string) => parseInt(x));
    const numbers: number[] = c.split(': ')[1].split(' | ')[1].split(' ').map((x: string) => parseInt(x));
    const foundNumbers: number[] = numbers.filter((x: number) => winningNumbers.includes(x));
    if (foundNumbers.length > 0) {
      value += 2 ** (foundNumbers.length - 1);
    }
  });
  console.log(value);
}

function getPart2() {
  const data: string = getFileContent('./inputs/input4.txt');
  // const data: string = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11';
  let value: number = 0;
  const extraCards: Map<number, number> = new Map();
  data.split('\n').forEach((card: string, index: number) => {
    if (!card) {
      return;
    }
    value += 1;
    const cardNumber: number = index + 1;
    const c: string = card.split('  ').join(' ');
    const winningNumbers: number[] = c.split(': ')[1].split(' | ')[0].split(' ').map((x: string) => parseInt(x));
    const numbers: number[] = c.split(': ')[1].split(' | ')[1].split(' ').map((x: string) => parseInt(x));
    const foundNumbers: number[] = numbers.filter((x: number) => winningNumbers.includes(x));
    const extraCardMultiplier = extraCards.has(cardNumber) ? (extraCards.get(cardNumber)! + 1) : 1;
    for(let i = 1; i <= foundNumbers.length; i++) {
      value += extraCardMultiplier;
      const cardToUpdate: number = cardNumber + i;
      if (extraCards.has(cardToUpdate)) {
        extraCards.set(cardToUpdate, extraCards.get(cardToUpdate)! + extraCardMultiplier);
      } else {
        extraCards.set(cardToUpdate, extraCardMultiplier);
      }
    }
  });
  console.log(value);
}

getPart1();
getPart2();