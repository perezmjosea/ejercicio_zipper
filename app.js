const fs = require("fs");
const archiver = require("archiver");
const inquirer = require("inquirer");

const preguntaInicial = [{
  message: "¿Quieres comprimir archivos?",
  type: "confirm",
  name: "isConfirmed",
  default: true
}];

// Creo array de preguntas
const preguntas = [
  {
    message: "¿Qué archivos quiere comprimir?",
    type: "checkbox",
    name: "selectedFiles",
    choices: [
      { name: "file1.txt", checked: true },
      { name: "file2.txt" },
      { name: "file3.txt" }
    ]
  },
  {
    message: "¿Cómo quieres que se llame el archivo comprimido?",
    name: "fileName",
    type: "input"
  }
];

inquirer.prompt(preguntaInicial).then(respuestas => {
  if (!respuestas.isConfirmed) {
    console.log("Veo que no quieres comprimir. Otra vez será ;)");
    return;
  }

  // Una vez recibo respuestas comienzo el proceso de compresión
  inquirer.prompt(preguntas).then(respuestas => {
  // Creo un stream donde se gaurdarán los datos, con el nombre recibido
  const output = fs.createWriteStream(`${respuestas.fileName}.zip`);
  // Creeo un objeto generador de compresión
  const archive = archiver("zip", { zlib: { level: 9 } });

  // Cuando mi proceso termina del todo, doy info del proceso
  output.on("close", () =>
    console.log(`Archivo comprimido con: ${archive.pointer()} bytes
    Gracias por usar nuestra app :)`)
  );

  // Si hay un error paro la ejecución
  archive.on("error", function(err) {
    throw err;
  });

  // Le paso al generador de compresión el stream para que opere sobre él
  archive.pipe(output);

  // Por cada archivo seleccionado, lo añado comprimido con un nombre
  respuestas.selectedFiles.forEach(item =>
    archive.append(fs.createReadStream(`./files/${item}`), { name: item })
  );

  // Ejecuto el proceso
  archive.finalize();
});

});
