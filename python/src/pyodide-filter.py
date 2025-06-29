# pyodide-filter.py
import toml
import sys

# Replace with actual list of Pyodide-supported packages
SUPPORTED_PACKAGES = {
    "sympy", "pandas", "numpy", "matplotlib", "scipy",
    "micropip", "pyodide-http"
}

def extract_pyodide_deps(pyproject_path="pyproject.toml", output="pyodide-requirements.txt"):
    with open(pyproject_path, "r") as f:
        data = toml.load(f)

    deps = data.get("project", {}).get("dependencies", [])
    pyodide_deps = []

    for dep in deps:
        name = dep.split(" ")[0].split("==")[0].split(">=")[0]  # crude normalize
        if name in SUPPORTED_PACKAGES:
            pyodide_deps.append(dep)

    with open(output, "w") as out:
        out.write("\n".join(pyodide_deps))

    print(f"✅ Wrote {len(pyodide_deps)} Pyodide-compatible dependencies to {output}")

if __name__ == "__main__":
    extract_pyodide_deps(pyproject_path="../pyproject.toml",
                         output="../../js/pyodide-requirements.txt")
