# glowing-octo-fishstick
GitHub Actions practice repository. Implements a website which generates toast quotes.


## Developing

This repo uses python for backend functions and javascript for frontend functions. 
Cross-compilation is handled by pyodide.

Note that to generate dependencies from pyproject.toml, you should run 
[pyodide-filter.py](./python/src/pyodide_filter.py). It will generate [requirements.txt](js/pyodide-requirements.txt).

## Tests

### Python

To test python:

cd into the python directory and run `uv sync --all-extras`, then try out the code 
using `uv run <python script>`.

### JavaScript

To setup javascript tests (if using):

```bash
npm init -y  # Initialize a new Node.js project (if you haven't already)
npm install --save-dev jest  # Install Jest
```

To run tests (CURRENTLY FAILING):
```bash
npm test
```
