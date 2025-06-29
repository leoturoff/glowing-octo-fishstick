// script.js

let pyodide = null;

async function setupPyodide() {
  try {
    pyodide = await loadPyodide();
    await pyodide.loadPackage("micropip");

    const response = await fetch("js/pyodide-requirements.txt");
    if (!response.ok) throw new Error("Failed to load requirements.txt");

    const deps = await response.text();
    const depArray = deps.split("\n").filter(dep => dep.trim() !== "");
    for (const dep of depArray) {
      await pyodide.runPythonAsync(`
        import micropip
        await micropip.install("${dep.trim()}")
      `);
    }
    console.log("✅ All dependencies loaded into Pyodide");
  } catch (error) {
    console.error("Error setting up Pyodide:", error);
  }
}

async function loadPythonCode() {
    try {
      pyodide.FS.mkdir("/python");
      pyodide.FS.mkdir("/python/src");
      pyodide.FS.mkdir("/python/src/math_utils");

      const filePath = "python/src/math_utils/functions.py";
      const fileContent = await (await fetch(filePath)).text();

      pyodide.FS.writeFile(`/` + filePath, fileContent, { encoding: "utf8" });

      // Let Python know where your package is
      await pyodide.runPython(`
        import sys
        sys.path.append("/python/src")
        from math_utils.functions import *
    `);

      console.log("✅ Python code loaded successfully");
    } catch (error) {
      console.error("❌ Error loading Python code:", error);
    }
}

async function runPython(fnName, input) {
  try {
    const result = await pyodide.runPython(`${fnName}(${input})`);
    document.getElementById("output").textContent = `Result: ${result}`;
  } catch (error) {
    console.error("Error executing Python:", error);
  }
}

// Initialize Pyodide and load Python code
async function init() {
  try {
    await setupPyodide();   // Initialize Pyodide
    await loadPythonCode();  // Load the Python code
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

init(); // Start initialization


//async function megaLoad() {
//      try {
//    pyodide = await loadPyodide();
//    await pyodide.loadPackage("micropip");
//
//    const response = await fetch("js/pyodide-requirements.txt");
//    if (!response.ok) throw new Error("Failed to load requirements.txt");
//
//    const deps = await response.text();
//    const depArray = deps.split("\n").filter(dep => dep.trim() !== "");
//    for (const dep of depArray) {
//      await pyodide.runPythonAsync(`
//        import micropip
//        await micropip.install("${dep.trim()}")
//      `);
//    }
//    console.log("✅ All dependencies loaded into Pyodide");
//  } catch (error) {
//    console.error("Error setting up Pyodide:", error);
//  }
//
//    try {
//      pyodide.FS.mkdir("/python");
//      pyodide.FS.mkdir("/python/src");
//      pyodide.FS.mkdir("/python/src/math_utils");
//
//      const filePath = "python/src/math_utils/functions.py";
//      const fileContent = await (await fetch(filePath)).text();
//
//      pyodide.FS.writeFile(`/` + filePath, fileContent, { encoding: "utf8" });
//
//      // Let Python know where your package is
//      await pyodide.runPython(`
//        import sys
//        sys.path.append("/python/src")
//        from math_utils.functions import *
//    `);
//
//      console.log("✅ Python code loaded successfully");
//    } catch (error) {
//      console.error("❌ Error loading Python code:", error);
//    }
//}
//
//megaLoad();
//
