let pyodide = null;

async function setupPyodide() {
  let pyodide = await loadPyodide();
  await pyodide.loadPackage("micropip");

  const response = await fetch("pyodide-requirements.txt");
  const deps = await response.text();
  for (const dep of deps.split("\n")) {
    if (dep.trim()) {
      await pyodide.runPythonAsync(`
        import micropip
        await micropip.install("${dep.trim()}")
      `);
    }
  }

  console.log("✅ All dependencies loaded into Pyodide");

}

async function runPython(fnName) {
  const input = parseInt(document.getElementById("inputNum").value);
  const result = pyodide.runPython(`${fnName}(${input})`);
  document.getElementById("output").textContent = `Result: ${result}`;
}

async function loadPythonCode() {
  // Load your full Python package
  const files = {
    "main.py": await (await fetch("main.py")).text(),
    "math_utils/__init__.py": "",
    "math_utils/calculus.py": await (await fetch("math_utils/calculus.py")).text(),
    "math_utils/algebra.py": await (await fetch("math_utils/algebra.py")).text(),
  };

  // Write them into Pyodide's virtual filesystem
  for (const [path, content] of Object.entries(files)) {
    pyodide.FS.writeFile(path, content, { encoding: "utf8" });
  }

  pyodide.runPython(`from math_utils.functions import *`);
}

setupPyodide();
loadPythonCode();
