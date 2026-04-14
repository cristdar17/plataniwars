/**
 * Final pass: force exact target distribution for each file.
 * Read current state, compute exactly what needs to move, apply.
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

function getCorrectPos(node) {
  if (!node.options) return -1;
  return node.options.findIndex(o => o.feedback && o.feedback.startsWith('\u2705'));
}

function swapToTarget(tree, targetMap) {
  const letters = ['A','B','C','D'];
  for (const [nodeId, targetPos] of Object.entries(targetMap)) {
    const node = tree.nodes[nodeId];
    if (!node || !node.options) continue;
    const currentPos = getCorrectPos(node);
    if (currentPos === targetPos) continue;
    // Swap
    const opts = node.options;
    const temp = opts[currentPos];
    opts[currentPos] = opts[targetPos];
    opts[targetPos] = temp;
    // Fix IDs
    for (let i = 0; i < opts.length; i++) opts[i].id = letters[i];
    console.log(`  ${nodeId}: ${letters[currentPos]} -> ${letters[targetPos]}`);
  }
}

function showDist(label, tree) {
  const dist = {A:0, B:0, C:0, D:0};
  const letters = ['A','B','C','D'];
  console.log(`\n${label}:`);
  for (const [nodeId, node] of Object.entries(tree.nodes)) {
    if (!node.options) continue;
    const idx = getCorrectPos(node);
    const l = letters[idx] || '?';
    dist[l]++;
    console.log(`  ${nodeId}: ${l}`);
  }
  console.log(`  => A=${dist.A}, B=${dist.B}, C=${dist.C}, D=${dist.D}`);
}

function buildOutput(varName, tree) {
  let out = `/* ============================================================\n`;
  if (varName === 'TREE_OPERATIONS') out += `   TREE-OPERATIONS - Arbol de decisiones del COO (Dir. Operaciones)\n`;
  else if (varName === 'TREE_HR') out += `   TREE-HR - Arbol de decisiones del CHRO (Dir. Recursos Humanos)\n`;
  else if (varName === 'TREE_ANALYST') out += `   TREE-ANALYST - Arbol de decisiones del Chief Data Analyst\n`;
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

// ====== EXACT TARGET DISTRIBUTIONS (3A, 3B, 3C, 3D each) ======

// tree-operations: target positions (0=A,1=B,2=C,3=D)
let treeOps = readTree('tree-operations.js', 'TREE_OPERATIONS');
showDist('tree-operations BEFORE', treeOps);
swapToTarget(treeOps, {
  'ops-01': 0, // A
  'ops-02': 2, // C
  'ops-03': 1, // B
  'ops-04': 3, // D (was C)
  'ops-05': 3, // D
  'ops-06': 2, // C
  'ops-07': 1, // B
  'ops-08': 0, // A (keep)
  'ops-09': 0, // A
  'ops-10': 2, // C
  'ops-11': 1, // B
  'ops-12': 3, // D
});
showDist('tree-operations AFTER', treeOps);
fs.writeFileSync(path.join(BASE, 'tree-operations.js'), buildOutput('TREE_OPERATIONS', treeOps), 'utf8');

// tree-hr: target positions
let treeHr = readTree('tree-hr.js', 'TREE_HR');
showDist('tree-hr BEFORE', treeHr);
swapToTarget(treeHr, {
  'hr-01': 0, // A
  'hr-02': 3, // D
  'hr-03': 1, // B
  'hr-04': 2, // C
  'hr-05': 2, // C
  'hr-06': 1, // B
  'hr-07': 3, // D
  'hr-08': 0, // A
  'hr-09': 3, // D
  'hr-10': 2, // C
  'hr-11': 1, // B
  'hr-12': 0, // A
});
showDist('tree-hr AFTER', treeHr);
fs.writeFileSync(path.join(BASE, 'tree-hr.js'), buildOutput('TREE_HR', treeHr), 'utf8');

// tree-analyst: target positions
let treeAn = readTree('tree-analyst.js', 'TREE_ANALYST');
showDist('tree-analyst BEFORE', treeAn);
swapToTarget(treeAn, {
  'dat-01': 2, // C
  'dat-02': 0, // A
  'dat-03': 1, // B
  'dat-04': 3, // D
  'dat-05': 3, // D
  'dat-06': 1, // B
  'dat-07': 2, // C
  'dat-08': 0, // A
  'dat-09': 0, // A
  'dat-10': 1, // B
  'dat-11': 3, // D
  'dat-12': 2, // C
});
showDist('tree-analyst AFTER', treeAn);
fs.writeFileSync(path.join(BASE, 'tree-analyst.js'), buildOutput('TREE_ANALYST', treeAn), 'utf8');

console.log('\nAll files written with exact 3-3-3-3 distribution!');
