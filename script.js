let pyodide = null;

async function loadPyodideAndPythonCode() {
  pyodide = await loadPyodide();
  await pyodide.loadPackage("micropip");

  const pythonCode = `
def square(x):
    return x * x

def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
`;
  pyodide.runPython(pythonCode);
}

loadPyodideAndPythonCode();

async function runPython(fnName) {
  const input = parseInt(document.getElementById("inputNum").value);
  const result = pyodide.runPython(`${fnName}(${input})`);
  document.getElementById("output").textContent = `Result: ${result}`;
}
