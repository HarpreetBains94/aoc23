const { getFileContent } = require('../utils/readFile');

function generateMapperString(block: string): string {
  const lines: string[] = block.split('\n');
  let functionString: string = '';
  lines.shift();
  lines.forEach((line: string): void => {
    const values: number[] = line.split(' ').map((n: string) => parseInt(n));
    functionString += `if(x>=${values[1]}&&x<=${values[1]+values[2]}){return x - ${values[1]-values[0]}}`;
  })
  functionString += 'return x'
  return functionString;
}

function getPart1() {
  const data: string = getFileContent('./inputs/input5.txt');
  // const data: string = 'seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4';
  let value: number|null = null;
  const blocks: string[] = data.split('\n\n');
  const seeds: number[] = blocks[0].split(': ')[1].split(' ').map((seedString: string) => parseInt(seedString));
  const soilMapperFunction: Function = Function('x', generateMapperString(blocks[1]));
  const fertMapperFunction: Function = Function('x', generateMapperString(blocks[2]));
  const waterMapperFunction: Function = Function('x', generateMapperString(blocks[3]));
  const lightMapperFunction: Function = Function('x', generateMapperString(blocks[4]));
  const tempMapperFunction: Function = Function('x', generateMapperString(blocks[5]));
  const humMapperFunction: Function = Function('x', generateMapperString(blocks[6]));
  const locMapperFunction: Function = Function('x', generateMapperString(blocks[7]));
  seeds.forEach((seed: number): void => {
    const location: number = locMapperFunction(humMapperFunction(tempMapperFunction(lightMapperFunction(waterMapperFunction(fertMapperFunction(soilMapperFunction(seed)))))));
    if (value === null || value > location) {
      value = location;
    }
  })
  console.log(value);
}

function getPart2() {
  const data: string = getFileContent('./inputs/input5.txt');
  // const data: string = 'seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4';
  let value: number|null = null;
  const blocks: string[] = data.split('\n\n');
  const seeds: number[] = blocks[0].split(': ')[1].split(' ').map((seedString: string) => parseInt(seedString));
  const soilMapperFunction: Function = Function('x', generateMapperString(blocks[1]));
  const fertMapperFunction: Function = Function('x', generateMapperString(blocks[2]));
  const waterMapperFunction: Function = Function('x', generateMapperString(blocks[3]));
  const lightMapperFunction: Function = Function('x', generateMapperString(blocks[4]));
  const tempMapperFunction: Function = Function('x', generateMapperString(blocks[5]));
  const humMapperFunction: Function = Function('x', generateMapperString(blocks[6]));
  const locMapperFunction: Function = Function('x', generateMapperString(blocks[7]));
  while(seeds.length > 0) {
    const start: number = seeds.shift() || 0;
    const length: number = seeds.shift() || 0;
    for(let i = 0; i < length; i++) {
      const location: number = locMapperFunction(humMapperFunction(tempMapperFunction(lightMapperFunction(waterMapperFunction(fertMapperFunction(soilMapperFunction(start + i)))))));
      if (value === null || value > location) {
        value = location;
      }
    }
  }
  console.log(value);
}

getPart1();
getPart2();