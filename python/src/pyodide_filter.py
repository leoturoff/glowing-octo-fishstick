# pyodide_filter.py
import toml
import typer
from pathlib import Path

app = typer.Typer()

# Replace with actual list of Pyodide-supported packages
SUPPORTED_PACKAGES = {
    "sympy", "pandas", "numpy", "matplotlib", "scipy",
    "micropip", "pyodide-http"
}

@app.command()
def extract(
    pyproject_path: Path = typer.Argument(..., help="Path to the pyproject.toml file"),
    output: Path = typer.Argument(..., help="Output file for Pyodide-compatible dependencies")
):
    """Extract Pyodide-supported dependencies from pyproject.toml."""
    data = toml.load(pyproject_path)

    deps = data.get("project", {}).get("dependencies", [])
    pyodide_deps = []

    for dep in deps:
        name = dep.split(" ")[0].split("==")[0].split(">=")[0]  # crude normalize
        if name in SUPPORTED_PACKAGES:
            pyodide_deps.append(dep)

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text("\n".join(pyodide_deps))

    typer.echo(f"✅ Wrote {len(pyodide_deps)} Pyodide-compatible dependencies to {output}")

if __name__ == "__main__":
    app()
