const fs = require('fs');
const path = require('path');

const idx = fs.readFileSync('components/index.ts', 'utf8');
const lines = idx.split('\n');
lines.forEach(l => {
  const m = l.match(/export\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/);
  if(m) {
    const vars = m[1].split(',').map(v => v.trim()).filter(Boolean);
    const p = path.join('components', m[2] + (m[2].includes('toast') ? '.ts' : '.tsx'));
    if(!fs.existsSync(p)) {
      console.log('MISSING FILE:', p);
      return;
    }
    const c = fs.readFileSync(p, 'utf8');
    vars.forEach(v => {
      // Very naive check, but good enough for finding typos
      if(!c.includes(v)) console.log('MISSING EXPORT:', v, 'in', p);
    });
  }
});
console.log("Done checking exports.");
