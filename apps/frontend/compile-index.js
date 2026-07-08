const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, 'components/index.ts'), 'utf8');
const result = ts.transpileModule(code, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
});

fs.writeFileSync(path.join(__dirname, 'check5.js'), result.outputText);
