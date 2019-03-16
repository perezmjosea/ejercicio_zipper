const sinon = require("sinon");
const fs = require("fs");
const path = require("path");
const outputgenerator = require("../../../lib/output-generator");

afterAll(() => {
  fs.readdirSync(path.join(__dirname, "..", "..", ".."))
    .filter(item => item.includes(".zip"))
    .forEach(item => fs.unlinkSync(item));
});

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

  test("Check if outputStream is an object", () => {
    expect(typeof outputStream === "object");
  });

  it("should call a stream generator with the right name", () => {
    const spy = context.spy(fs, "createWriteStream");
    const fileName = "mio";
    const expectedName = fileName + ".zip";

    outputgenerator.generateOutputStream(fileName);

    expect(spy.calledWithExactly(expectedName)).toBe(true);
  });

  it("should call a stream generator with a default name when the param is not given", () => {
    const spy = context.spy(fs, "createWriteStream");
    const fileName = "mio";
    const expectedName = fileName + ".zip";

    outputgenerator.generateOutputStream();

    expect(spy.calledWithExactly(expectedName)).toBe(false);
  });

  it("should return a Stream", () => {
    expect(outputStream).toHaveProperty("path");
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

  it("should call 'on' method on given stream as a dependency", () => {
    const spy = sinon.spy(outputStream, "on");
    const expectedParam = "close";

    outputgenerator.setListeners(outputStream);

    expect.assertions(2);
    expect(spy.called).toBe(true);
    expect(spy.calledWith(expectedParam)).toBe(true);
  });

  it("should throw an exception when the dependency is not given", () => {
    expect(() => outputgenerator.setListeners()).toThrow();
  });
});
