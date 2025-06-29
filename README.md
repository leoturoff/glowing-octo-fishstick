# glowing-octo-fishstick

## Developing

This repo uses python for backend functions and javascript for frontend functions. 
Cross-compilation is handled by pyodide.

Note that to generate dependencies from pyproject.toml, you should run 
[pyodide-filter.py](./python/src/pyodide-filter.py). It will generate [requirements.txt](js/pyodide-requirements.txt).

## Tests

To setup javascript tests:

```bash
npm init -y  # Initialize a new Node.js project (if you haven't already)
npm install --save-dev jest  # Install Jest
```

To run tests (CURRENTLY FAILING):
```bash
npm test
```

