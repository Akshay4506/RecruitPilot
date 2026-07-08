const fs = require('fs');

const code = fs.readFileSync('features/candidate-dashboard/candidate-dashboard.tsx', 'utf8');

const regex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g;

let match;
const imports = [];
while ((match = regex.exec(code)) !== null) {
  const vars = match[1].split(',').map(v => v.trim());
  const file = match[2];
  imports.push({ file, vars });
}

console.log(JSON.stringify(imports, null, 2));
