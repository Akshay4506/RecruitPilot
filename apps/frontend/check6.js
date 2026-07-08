const comps = require('./check5.js');
Object.keys(comps).forEach(key => {
  if (comps[key] === undefined) {
    console.log("UNDEFINED EXPORT AT RUNTIME:", key);
  }
});
console.log("Checked all exports at runtime!");
