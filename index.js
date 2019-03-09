const app = require("./app");

const preguntaInicial = [
  {
    message: "¿Quieres comprimir archivos?",
    type: "confirm",
    name: "isConfirmed",
    default: true
  }
];

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

app.start(preguntaInicial, () => app.askForFilename(preguntas));
