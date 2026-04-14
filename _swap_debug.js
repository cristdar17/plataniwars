/**
 * Debug: read the HR file and check if swaps are actually saved correctly
 */
const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/Usuario UTP/Desktop/clases/Estadistica/simulador-empresarial/js';

function readTree(filename, varName) {
  const filePath = path.join(BASE, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  const wrappedContent = content.replace(`window.${varName} =`, `return`);
  return new Function(wrappedContent)();
}

// Read tree-hr fresh from disk
const tree = readTree('tree-hr.js', 'TREE_HR');
const letters = ['A','B','C','D'];

for (const [nodeId, node] of Object.entries(tree.nodes)) {
  if (!node.options) {
    console.log(`${nodeId}: ENDING (no options)`);
    continue;
  }
  const idx = node.options.findIndex(o => o.feedback && o.feedback.startsWith('\u2705'));
  console.log(`${nodeId}: correct at position ${idx} (${letters[idx]})`);
  // Show first 40 chars of each option's feedback
  for (let i = 0; i < node.options.length; i++) {
    const fb = node.options[i].feedback || '';
    console.log(`  [${i}] id=${node.options[i].id} feedback=${fb.substring(0, 30)}`);
  }
}
