const fs = require('fs');

module.exports = {
  getFileContent: (path: string): string => {
    let data: string = '';
    try {
      data = fs.readFileSync(path,'utf8');
    } catch (err) {
      console.log(err);
    }
    return data;
  }
}