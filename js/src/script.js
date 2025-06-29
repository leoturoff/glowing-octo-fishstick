// script.js

let pyodide = null;

async function loadLocalFileToPyodide(localUrl, targetPathInFS) {
  try {
    const response = await fetch(localUrl);
    if (!response.ok) throw new Error(`Failed to fetch ${localUrl}`);
    const content = await response.text();

    // Create necessary directories in Pyodide FS
    const parts = targetPathInFS.split("/").filter(Boolean); // split & remove empty parts
    for (let i = 1; i < parts.length; i++) {
      const subDir = "/" + parts.slice(0, i).join("/");
      try {
        pyodide.FS.mkdir(subDir);
      } catch (e) {
        if (e.code !== "EEXIST") throw e;
      }
    }

    // Write file content into Pyodide FS
    pyodide.FS.writeFile("/" + parts.join("/"), content, { encoding: "utf8" });
    console.log(`✅ Loaded ${localUrl} into Pyodide FS as /${parts.join("/")}`);
  } catch (error) {
    console.error(`❌ Error loading ${localUrl} → ${targetPathInFS}:`, error);
  }
}

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

      const filePath = "python/src/get_quote.py";
      const fileContent = await (await fetch(filePath)).text();

      pyodide.FS.writeFile(`/` + filePath, fileContent, { encoding: "utf8" });

      // Let Python know where your package is
      await pyodide.runPython(`
        import sys
        sys.path.append("/python/src")
        # expose python functions here!
        from get_quote import get_quote
    `);

      console.log("✅ Python code loaded successfully");
    } catch (error) {
      console.error("❌ Error loading Python code:", error);
    }
}

async function runPythonWithInput(fnName, input) {
  try {
    const result = await pyodide.runPython(`${fnName}(${input})`);
    document.getElementById("output").textContent = `Result: ${result}`;
  } catch (error) {
    console.error("Error executing Python:", error);
  }
}

async function updateToastText() {
    // this is where the output is set!
    output_text = document.getElementById("output")
    result = await runPython('get_quote')

      output_text.classList.remove('visible');
      output_text.classList.add('hidden');

      setTimeout(() => {
        output_text.textContent = `${result}`;
        output_text.classList.remove('hidden');
        output_text.classList.add('visible');
      }, 500);
}

async function runPython(fnName) {
  try {
    return await pyodide.runPython(`${fnName}()`);
      } catch (error) {
    console.error("Error executing Python:", error);
  }
}

// Initialize Pyodide and load Python code
async function init() {
  try {
    await setupPyodide();   // Initialize Pyodide
    await loadPythonCode();  // Load the Python code
    await loadLocalFileToPyodide("python/data/toast_quotes.json", "/data/toast_quotes.json");
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

init(); // Start initialization
