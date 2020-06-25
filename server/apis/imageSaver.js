var FileSaver = require('file-saver');

module.exports = (blob, id) => {
  console.log('came here!');
  console.log(blob);
  FileSaver.saveAs(blob, `/images/profileimg/${id}.png`);
  console.log('complete!');
};
