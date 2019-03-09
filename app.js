const fs = require("fs");
const prompting = require("./lib/prompting");
const archiveGenerator = require("./lib/archive-generator");
const outputGenerator = require("./lib/output-generator");

async function askForFilename(questions) {
  // Una vez recibo respuestas comienzo el proceso de compresión
  const respuestas = await prompting.ask(questions);
  // Creo un stream donde se gaurdarán los datos, con el nombre recibido
  let output = outputGenerator.generateOutputStream(respuestas.fileName);
  // Creeo un objeto generador de compresión
  let archive = archiveGenerator.generateArchive("zip", 9, output);
  //

  // Por cada archivo seleccionado, lo añado comprimido con un nombre
  archive = archiveGenerator.addFiles(
    archive,
    respuestas.selectedFiles,
    "./files/"
  );

  output = outputGenerator.setListeners(output, archive.pointer());

  // Ejecuto el proceso
  archiveGenerator.finish(archive);
}

async function start(questions, callback) {
  const introQuestion = await prompting.ask(questions);

  if (!introQuestion.isConfirmed) {
    console.log("Veo que no quieres comprimir. Otra vez será ;)");
    return;
  }

  callback();
}

module.exports = {
  start,
  askForFilename
};
