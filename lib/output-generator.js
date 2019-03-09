const fs = require("fs");

function setListeners(outputStream, ref) {
  outputStream.on("close", () =>
    console.log(`Archivo comprimido con: ${ref} bytes
    Gracias por usar nuestra app :)`)
  );

  return outputStream;
}

function generateOutputStream(filename) {
  return fs.createWriteStream(`${filename}.zip`);
}

module.exports = {
  generateOutputStream,
  setListeners
};
