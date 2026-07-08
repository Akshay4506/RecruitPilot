const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

try {
  const allFiles = walk('features/candidate-dashboard').concat(walk('components')).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
  let allImports = [];
  allFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const match = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
    if (match) {
      match[1].split(',').forEach(i => allImports.push(i.trim()));
    }
  });

  const lucide = require('lucide-react');
  const uniqueImports = [...new Set(allImports)];
  uniqueImports.forEach(name => {
    if (name && name !== 'LucideIcon' && !lucide[name]) {
      console.log(name + ' is undefined in lucide-react!');
    }
  });
  
  // also check @/components imports
  let localImports = [];
  allFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const match = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]@\/components['"]/);
    if (match) {
      match[1].split(',').forEach(i => localImports.push(i.trim()));
    }
  });
  
  const componentsIndex = fs.readFileSync('components/index.ts', 'utf8');
  [...new Set(localImports)].forEach(name => {
    if (name && !componentsIndex.includes(` ${name} `) && !componentsIndex.includes(`{ ${name} }`) && !componentsIndex.includes(`{${name}}`) && !componentsIndex.includes(`${name},`)) {
      console.log(name + ' might be undefined in @/components!');
    }
  });

  console.log("Check complete.");
} catch (e) {
  console.error(e);
}
