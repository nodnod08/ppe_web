const fs = require('fs');
const path = require('path');

const DEV_DIRECTORY = path.join(__dirname, '..', 'src', 'js');

let files = {};

const getAllfiles = () => {
  fs.readdirSync(DEV_DIRECTORY).forEach((file) => {
    if (fs.statSync(DEV_DIRECTORY + '/' + file).isFile()) {
      let name_no_ext = file.replace('.js', '');
      files[name_no_ext] = [`./src/js/${file}`];
    }
  });
  return files;
};

module.exports = {
  getAllfiles,
};
