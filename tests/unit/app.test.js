const sinon = require("sinon");
const app = require("../../app");
const prompting = require("../../lib/prompting");

describe("Testing start()", () => {
  let context;
  let askStubbed;

  beforeEach(() => {
    context = sinon.createSandbox();
    askStubbed = context.stub(prompting, "ask");
  });

  afterEach(() => {
    context.restore();
  });

  it("debería generar error si no le paso preguntas", () => {
    askStubbed.rejects(new Error(""));

    expect(app.start()).rejects.toThrow();
  });

  it("no debería llamar callback si la respuesta no es positiva", () => {
    askStubbed.returns({
      isConfirmed: false
    });

    const spy = sinon.spy();

    app.start([], spy);

    expect(spy.called).toBe(false);
  });

  it("debería llamar callback si la respuesta es positiva", async () => {
    askStubbed.returns({
      isConfirmed: true
    });

    const spy = sinon.spy();

    await app.start([], spy);

    expect(spy.called).toBe(true);
  });
});
