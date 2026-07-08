const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'features/candidate-dashboard/candidate-dashboard.tsx'), 'utf8');
console.log(fileContent.match(/import \{([^}]+)\}/g));
