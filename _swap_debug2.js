const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/Usuario UTP/Desktop/clases/Estadistica/simulador-empresarial/js';

function readTree(filename, varName) {
  const filePath = path.join(BASE, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  return new Function(content.replace(`window.${varName} =`, `return`))();
}

function checkMultiCorrect(tree, filename) {
  console.log(`\n=== ${filename} ===`);
  for (const [nodeId, node] of Object.entries(tree.nodes)) {
    if (!node.options) continue;
    const correctIdxs = [];
    for (let i = 0; i < node.options.length; i++) {
      if (node.options[i].feedback && node.options[i].feedback.startsWith('\u2705')) {
        correctIdxs.push(i);
      }
    }
    if (correctIdxs.length > 1) {
      console.log(`  ${nodeId}: MULTIPLE correct at positions ${correctIdxs.join(', ')} (${correctIdxs.map(i => ['A','B','C','D'][i]).join(', ')})`);
      for (const i of correctIdxs) {
        console.log(`    [${i}] ${node.options[i].feedback.substring(0, 60)}`);
      }
    } else if (correctIdxs.length === 1) {
      console.log(`  ${nodeId}: single correct at ${['A','B','C','D'][correctIdxs[0]]}`);
    }
  }
}

checkMultiCorrect(readTree('tree-operations.js', 'TREE_OPERATIONS'), 'tree-operations.js');
checkMultiCorrect(readTree('tree-hr.js', 'TREE_HR'), 'tree-hr.js');
checkMultiCorrect(readTree('tree-analyst.js', 'TREE_ANALYST'), 'tree-analyst.js');
