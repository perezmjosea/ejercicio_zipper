const utils = require("../../../lib/utils");

describe("Testing de traduceQuestions", () => {
  it("debería devolver un objeto de respuesta adecuado", () => {
    const input = [
      {
        question: "Pregunta",
        type: "un tipo",
        variableName: "miVariable",
        defaultValue: "por defecto"
      }
    ];
    const expectedOutput = [
      {
        message: "Pregunta",
        type: "un tipo",
        name: "miVariable",
        default: "por defecto"
      }
    ];
    const finalResp = utils.traduceQuestions(input);

    expect.assertions(3);
    expect(finalResp.length).toEqual(1);
    expect(finalResp[0].message).toEqual(input[0].question);
    expect(finalResp[0].name).toEqual(input[0].variableName);
  });

  it("debería devolver claves que no manipulo", () => {
    const input = [
      {
        question: "Pregunta",
        type: "un tipo",
        variableName: "miVariable",
        defaultValue: "por defecto",
        questions: "preguntassssss"
      }
    ];
    const expectedOutput = [
      {
        message: "Pregunta",
        type: "un tipo",
        name: "miVariable",
        default: "por defecto",
        questions: "preguntassssss"
      }
    ];
    const finalResp = utils.traduceQuestions(input);

    expect.assertions(2);
    expect(finalResp[0].questions).toBeTruthy();
    expect(finalResp[0].questions).toEqual(input[0].questions);
  });
});
