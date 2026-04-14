/**
 * Second pass: fix distribution to be 3A, 3B, 3C, 3D per file.
 * Reads current state and applies targeted swaps.
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

function showDist(tree) {
  const dist = {A:0, B:0, C:0, D:0};
  for (const [nodeId, node] of Object.entries(tree.nodes)) {
    if (!node.options) continue;
    const idx = node.options.findIndex(o => o.feedback && o.feedback.startsWith('✅'));
    const letter = ['A','B','C','D'][idx] || '?';
    dist[letter]++;
    console.log(`  ${nodeId}: correct = ${letter}`);
  }
  console.log(`  Distribution: A=${dist.A}, B=${dist.B}, C=${dist.C}, D=${dist.D}`);
  return dist;
}

function applySwaps(tree, swapMap) {
  for (const [nodeId, targetPos] of Object.entries(swapMap)) {
    if (targetPos === null) continue;
    const node = tree.nodes[nodeId];
    if (!node || !node.options) continue;
    const correctIdx = node.options.findIndex(o => o.feedback && o.feedback.startsWith('✅'));
    if (correctIdx === -1 || correctIdx === targetPos) continue;
    const opts = node.options;
    const temp = opts[correctIdx];
    opts[correctIdx] = opts[targetPos];
    opts[targetPos] = temp;
    const letters = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < opts.length; i++) opts[i].id = letters[i];
  }
}

// === tree-operations.js ===
// Current: A,C,B,C,D,A,B,A,A,A,B,B => A=5,B=4,C=2,D=1
// Target:  A,C,B,C,D,B,D,C,A,B,A,C => A=3,B=3,C=4,D=2 -- not great
// Better:  A,C,B,D,D,B,C,D,A,C,B,A => A=3,B=3,C=3,D=3
console.log('\n=== tree-operations.js BEFORE ===');
let treeOps = readTree('tree-operations.js', 'TREE_OPERATIONS');
showDist(treeOps);

// Current: ops-01=A, ops-02=C, ops-03=B, ops-04=C, ops-05=D, ops-06=A, ops-07=B, ops-08=A, ops-09=A, ops-10=A, ops-11=B, ops-12=B
// Need to change: ops-04 C→D, ops-06 A→B (wait, already have 4B)
// Let me think: A=5(01,06,08,09,10), B=4(03,07,11,12), C=2(02,04), D=1(05)
// Need: A=3, B=3, C=3, D=3
// Move 2 A's away, move 1 B away, add 1 C, add 2 D
// ops-06: A→D, ops-08: A→C, ops-10: A→D  -- removes 3 A (left 2, need 3) -- too many
// ops-06: A→D, ops-08: A→C, ops-12: B→D  -- A=3, B=3, C=3, D=3
applySwaps(treeOps, {
  'ops-06': 3,  // A→D
  'ops-08': 2,  // A→C (was already swapped to D, but let me check)
  'ops-12': 3,  // B→D
});

// Recheck: let's recalculate
// ops-01=A, ops-02=C, ops-03=B, ops-04=C, ops-05=D, ops-06=D, ops-07=B, ops-08=C, ops-09=A, ops-10=A, ops-11=B, ops-12=D
// A=3(01,09,10), B=3(03,07,11), C=3(02,04,08), D=3(05,06,12) PERFECT!

console.log('\n=== tree-operations.js AFTER ===');
showDist(treeOps);

// === tree-hr.js ===
console.log('\n=== tree-hr.js BEFORE ===');
let treeHr = readTree('tree-hr.js', 'TREE_HR');
showDist(treeHr);

// Current: hr-01=A, hr-02=D, hr-03=B, hr-04=A, hr-05=C, hr-06=A, hr-07=B, hr-08=A, hr-09=A, hr-10=A, hr-11=A, hr-12=A
// Wait, that doesn't look right. hr-09 should have been swapped to D...
// Let me re-read and check.

// A=8(01,04,06,08,09,10,11,12), B=2(03,07), C=1(05), D=1(02)
// Need: A=3, B=3, C=3, D=3
// Keep: hr-01=A, hr-03=B, hr-05=C, hr-02=D (already good)
// Change: hr-04 A→C, hr-06 A→D, hr-07=B keep, hr-08=A keep, hr-09 A→D, hr-10 A→C, hr-11 A→B, hr-12 A→D
// Result: A=3(01,08,??), too many changes. Let me count:
// hr-01=A, hr-02=D, hr-03=B, hr-04=C, hr-05=C(already), hr-06=D, hr-07=B, hr-08=A, hr-09=D, hr-10=C, hr-11=B, hr-12=D
// A=2, B=3, C=3, D=4 -- not balanced

// Better:
// hr-01=A, hr-02=D, hr-03=B, hr-04=C, hr-05=C, hr-06=B, hr-07=D, hr-08=A, hr-09=D, hr-10=C, hr-11=B, hr-12=A
// A=3(01,08,12), B=3(03,06,11), C=3(04,05,10), D=3(02,07,09) PERFECT!

applySwaps(treeHr, {
  'hr-04': 2,  // A→C
  'hr-06': 1,  // A→B
  'hr-07': 3,  // B→D
  'hr-09': 3,  // A→D
  'hr-10': 2,  // A→C
  'hr-11': 1,  // A→B
});

console.log('\n=== tree-hr.js AFTER ===');
showDist(treeHr);

// === tree-analyst.js ===
console.log('\n=== tree-analyst.js BEFORE ===');
let treeAn = readTree('tree-analyst.js', 'TREE_ANALYST');
showDist(treeAn);

// Current: dat-01=C, dat-02=A, dat-03=B, dat-04=A, dat-05=D, dat-06=B, dat-07=A, dat-08=A, dat-09=B, dat-10=B, dat-11=A, dat-12=C
// Wait, let me recheck from script output:
// A=5(02,04,07,08,11), B=4(03,06,09,10), C=2(01,12), D=1(05)
// Need: A=3, B=3, C=3, D=3
// Remove 2 A's, remove 1 B, add 1 C, add 2 D
// dat-07 A→C, dat-08 A→D, dat-11 A→D -- removes 3 A (left 2) -- too many
// dat-07 A→D, dat-11 A→D, dat-10 B→C
// A=3(02,04,08), B=3(03,06,09), C=3(01,10,12), D=3(05,07,11) PERFECT!

applySwaps(treeAn, {
  'dat-07': 3,  // A→D (was C, now change to D)
  'dat-10': 2,  // B→C
  'dat-11': 3,  // A→D
});

console.log('\n=== tree-analyst.js AFTER ===');
showDist(treeAn);

// Now write all files
function buildOutput(varName, tree) {
  let out = `/* ============================================================\n`;
  if (varName === 'TREE_OPERATIONS') {
    out += `   TREE-OPERATIONS - Arbol de decisiones del COO (Dir. Operaciones)\n`;
  } else if (varName === 'TREE_HR') {
    out += `   TREE-HR - Arbol de decisiones del CHRO (Dir. Recursos Humanos)\n`;
  } else if (varName === 'TREE_ANALYST') {
    out += `   TREE-ANALYST - Arbol de decisiones del Chief Data Analyst\n`;
  }
  out += `   PlataniWars: Simulador Gerencial Estadistico\n`;
  out += `   ============================================================ */\n`;
  out += `window.${varName} = {\n`;
  out += `  name: ${JSON.stringify(tree.name)},\n`;
  out += `  icon: ${JSON.stringify(tree.icon)},\n`;
  out += `  startNode: ${JSON.stringify(tree.startNode)},\n`;
  out += `  nodes: {\n`;

  const nodeEntries = Object.entries(tree.nodes);
  for (let ni = 0; ni < nodeEntries.length; ni++) {
    const [nodeId, node] = nodeEntries[ni];
    out += `\n    /* --------------------------------------------------------\n`;
    out += `       ${nodeId.toUpperCase()} | Dia ${node.day} | ${node.title}\n`;
    out += `       -------------------------------------------------------- */\n`;
    out += `    ${JSON.stringify(nodeId)}: {\n`;
    out += `      id: ${JSON.stringify(node.id)},\n`;
    out += `      day: ${node.day},\n`;
    out += `      title: ${JSON.stringify(node.title)},\n`;
    out += `      context: ${JSON.stringify(node.context)},\n`;
    out += `      type: ${JSON.stringify(node.type)},\n`;

    if (node.options) {
      out += `      options: [\n`;
      for (let oi = 0; oi < node.options.length; oi++) {
        const opt = node.options[oi];
        out += `        {\n`;
        out += `          id: ${JSON.stringify(opt.id)},\n`;
        out += `          label: ${JSON.stringify(opt.label)},\n`;
        out += `          description: ${JSON.stringify(opt.description)},\n`;
        out += `          cost: ${opt.cost},\n`;
        out += `          revenue: ${opt.revenue},\n`;
        out += `          bsc: ${JSON.stringify(opt.bsc)},\n`;
        out += `          crossEffects: ${JSON.stringify(opt.crossEffects)},\n`;
        out += `          tags: ${JSON.stringify(opt.tags)},\n`;
        out += `          feedback: ${JSON.stringify(opt.feedback)},\n`;
        out += `          next: ${opt.next === null ? 'null' : JSON.stringify(opt.next)}\n`;
        out += `        }${oi < node.options.length - 1 ? ',' : ''}\n`;
      }
      out += `      ]\n`;
    }

    if (node.type === 'ending') {
      if (node.endType) out += `      endType: ${JSON.stringify(node.endType)},\n`;
      if (node.summary) out += `      summary: ${JSON.stringify(node.summary)},\n`;
      if (node.bsc) out += `      bsc: ${JSON.stringify(node.bsc)}\n`;
    }

    out += `    }${ni < nodeEntries.length - 1 ? ',' : ''}\n`;
  }

  out += `\n  }\n`;
  out += `};\n`;
  return out;
}

fs.writeFileSync(path.join(BASE, 'tree-operations.js'), buildOutput('TREE_OPERATIONS', treeOps), 'utf8');
fs.writeFileSync(path.join(BASE, 'tree-hr.js'), buildOutput('TREE_HR', treeHr), 'utf8');
fs.writeFileSync(path.join(BASE, 'tree-analyst.js'), buildOutput('TREE_ANALYST', treeAn), 'utf8');

console.log('\nAll files written!');
