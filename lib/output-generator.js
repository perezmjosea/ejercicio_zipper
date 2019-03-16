const fs = require("fs");

function setListeners(outputStream) {
  outputStream.on("close", () => console.log(`Archivo comprimido :)`));

  return outputStream;
}

function generateOutputStream(filename) {
  return filename
    ? fs.createWriteStream(`${filename}.zip`)
    : fs.createWriteStream("files.zip");
}

module.exports = {
  generateOutputStream,
  setListeners
};
