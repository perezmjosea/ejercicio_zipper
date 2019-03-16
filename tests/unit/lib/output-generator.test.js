const sinon = require("sinon");
const outputgenerator = require("../../../lib/output-generator");

describe("Testing for generateOutputStream()", () => {
  let context;
  let outputStream;

  beforeEach(() => {
    context = sinon.createSandbox();
    outputStream = outputgenerator.generateOutputStream("files");
  });

  afterEach(() => {
    context.restore();
  });

  test("Check if generateOutputStream is a function", () => {
    expect(typeof generateOutputStream === "function");
  });

  test("Check if generateOutputStream is an object", () => {
    expect(typeof outputStream === "object");
  });
});

describe("Testing for setListeners()", () => {
  let context;
  let outputStream;
  let setListenerFn;

  beforeEach(() => {
    context = sinon.createSandbox();
    outputStream = outputgenerator.generateOutputStream("files");
    setListenerFn = outputgenerator.setListeners(outputStream, "20");
  });

  afterEach(() => {
    context.restore();
  });

  test("Check if setListeners is a function", () => {
    expect(typeof outputgenerator.setListeners === "function");
  });

  test("Check if setListeners has a path", () => {
    expect(setListenerFn).toHaveProperty("path");
  });
});
