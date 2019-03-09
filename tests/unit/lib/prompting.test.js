const sinon = require("sinon");
const inquirer = require("inquirer");
const prompting = require("../../../lib/prompting");

describe("Testing de 'ask'", () => {
  let context;
  let inquirerPromptStubbed;

  beforeEach(() => {
    // Contexto para stubs de Sinon
    context = sinon.createSandbox();
    // Pongo un controlador en el método para manipular en los tests
    inquirerPromptStubbed = context.stub(inquirer, "prompt");
  });

  afterEach(() => {
    // resetea todos los comportamientos del contexto
    context.restore();
  });

  it("debería tener una función para hacer preguntas", () => {
    expect(typeof prompting.ask === "function").toBe(true);
  });

  it("debería devolver un error si no le paso valores", () => {
    inquirerPromptStubbed.throws();

    expect(() => prompting.ask()).toThrow();
  });

  it("debería devolver una promesa cuando le paso valores", () => {
    inquirerPromptStubbed.resolves(true);

    expect(prompting.ask([])).resolves.toBe(true);
  });

  it("debería devolver un objeto correcto de respuesta", () => {
    const input = [
      {
        question: "¿Quieres comprimir archivos?",
        type: "confirm",
        variableName: "isConfirmed",
        defaultValue: true
      }
    ];
    const expectedOutput = {
      isConfirmed: true
    };

    inquirerPromptStubbed.resolves(expectedOutput);

    expect(prompting.ask(input)).resolves.toEqual(expectedOutput);
  });
});
