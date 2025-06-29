// loadPythonCode.test.js

const { loadPythonCode } = require("../src/script");

describe("loadPythonCode", () => {
  let pyodide;

  beforeAll(async () => {
    pyodide = await loadPyodide();
    await pyodide.loadPackage("micropip");
  });

  it("should load Python code into Pyodide's virtual filesystem", async () => {
    const files = {
      "math_utils/functions.py": "def add(x, y): return x + y"
    };
    pyodide.FS.writeFile("/math_utils/functions.py", files["math_utils/functions.py"]);
    await pyodide.runPython("from math_utils.functions import *");

    const result = await pyodide.runPython("add(1, 2)");
    expect(result).toBe("3");
  });
});
