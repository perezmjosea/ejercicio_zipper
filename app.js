const fs = require("fs");
const archiver = require("archiver");
const inquirer = require("inquirer");

const preguntas = [
  {
    message: "¿Quieres comprimir archivos?",
    type: "confirm",
    name: "isConfirmed",
    default: true
  },
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

inquirer.prompt(preguntas).then(respuestas => {
  const output = fs.createWriteStream(`${respuestas.fileName}.zip`);
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () =>
    console.log(`Archivo comprimido con: ${archive.pointer()} bytes
    Gracias por usar nuestra app :)`)
  );

  archive.on("error", function(err) {
    throw err;
  });

  archive.pipe(output);

  respuestas.selectedFiles.forEach(item =>
    archive.append(fs.createReadStream(`./files/${item}`), { name: item })
  );

  archive.finalize();
});
