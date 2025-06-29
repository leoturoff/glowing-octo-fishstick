// runPython.test.js

const { runPython } = require("../src/script");


describe("runPython", () => {
  let pyodide;

  beforeAll(async () => {
    pyodide = await loadPyodide();
    await pyodide.loadPackage("micropip");
    const files = {
      "math_utils/functions.py": "def multiply(x, y): return x * y"
    };
    pyodide.FS.writeFile("/math_utils/functions.py", files["math_utils.functions.py"]);
    await pyodide.runPython("from math_utils.functions import *");
  });

  it("should execute Python functions correctly and return the correct result", async () => {
    const result = await pyodide.runPython("multiply(3, 4)");
    expect(result).toBe("12");
  });
});
