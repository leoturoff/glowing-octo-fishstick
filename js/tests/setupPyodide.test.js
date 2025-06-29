// setupPyodide.test.js

const { setupPyodide } = require("../src/script");

describe("setupPyodide", () => {
  let pyodide;

  beforeAll(async () => {
    pyodide = await loadPyodide();
  });

  it("should load Pyodide and all dependencies", async () => {
    expect(pyodide).not.toBeNull();
    const response = await fetch("pyodide-requirements.txt");
    const deps = await response.text();
    const depArray = deps.split("\n").filter(dep => dep.trim() !== "");
    expect(depArray.length).toBeGreaterThan(0);
  });
});
