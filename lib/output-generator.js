const fs = require("fs");

function setListeners(outputStream) {
  outputStream.on("close", () => console.log(`Archivo comprimido :)`));

  return outputStream;
}

function generateOutputStream(filename) {
  const fileName = filename ? `${filename}.zip` : "files.zip";
  
  return fs.createWriteStream(fileName);
}

module.exports = {
  generateOutputStream,
  setListeners
};
