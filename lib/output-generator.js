const fs = require("fs");

function setListeners(outputStream) {
  outputStream.on("close", () => console.log(`Archivo comprimido :)`));

  return outputStream;
}

function generateOutputStream(filename) {
  return fs.createWriteStream(`${filename}.zip`);
}

module.exports = {
  generateOutputStream,
  setListeners
};
