/**
 * Script to swap options in tree files so the correct answer (✅)
 * is distributed across A, B, C, D instead of always being A.
 */
const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/Usuario UTP/Desktop/clases/Estadistica/simulador-empresarial/js';

/**
 * Parse a tree JS file, extract the object, apply swaps, rewrite.
 *
 * swapMap: { "node-id": targetPosition (0=A,1=B,2=C,3=D) or null to skip }
 * "null" means keep as-is.
 */
function processFile(filename, varName, swapMap) {
  const filePath = path.join(BASE, filename);
  const content = fs.readFileSync(filePath, 'utf8');

  // First, let's identify which option has ✅ for each node
  // We'll use eval-like approach: extract the object
  // Actually safer: use regex-based approach on the raw text

  // Strategy: find each node's options array, identify the ✅ position,
  // then swap entire option blocks.

  // Let's use a Function constructor to parse the JS
  const wrappedContent = content.replace(`window.${varName} =`, `return`);
  let tree;
  try {
    tree = new Function(wrappedContent)();
  } catch (e) {
    console.error(`Failed to parse ${filename}:`, e.message);
    return;
  }

  const nodes = tree.nodes;
  const nodeIds = Object.keys(nodes);

  console.log(`\n=== ${filename} ===`);
  console.log(`Nodes found: ${nodeIds.join(', ')}`);

  // Show current distribution
  for (const nodeId of nodeIds) {
    const node = nodes[nodeId];
    if (!node.options) continue;
    const correctIdx = node.options.findIndex(o => o.feedback && o.feedback.startsWith('✅'));
    const letter = ['A','B','C','D'][correctIdx] || '?';
    console.log(`  ${nodeId}: correct = ${letter} (position ${correctIdx})`);
  }

  // Apply swaps
  for (const [nodeId, targetPos] of Object.entries(swapMap)) {
    if (targetPos === null) continue;
    const node = nodes[nodeId];
    if (!node || !node.options) {
      console.log(`  WARNING: node ${nodeId} not found or has no options`);
      continue;
    }

    const correctIdx = node.options.findIndex(o => o.feedback && o.feedback.startsWith('✅'));
    if (correctIdx === -1) {
      console.log(`  WARNING: no ✅ found in ${nodeId}`);
      continue;
    }
    if (correctIdx === targetPos) {
      console.log(`  ${nodeId}: already at position ${targetPos}, skip`);
      continue;
    }

    // Swap the two option objects
    const opts = node.options;
    const temp = opts[correctIdx];
    opts[correctIdx] = opts[targetPos];
    opts[targetPos] = temp;

    // Fix id fields: position 0=A, 1=B, 2=C, 3=D
    const letters = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < opts.length; i++) {
      opts[i].id = letters[i];
    }

    console.log(`  ${nodeId}: swapped position ${correctIdx} ↔ ${targetPos}`);
  }

  // Show new distribution
  console.log(`\nNew distribution for ${filename}:`);
  const dist = {A:0, B:0, C:0, D:0};
  for (const nodeId of nodeIds) {
    const node = nodes[nodeId];
    if (!node.options) continue;
    const correctIdx = node.options.findIndex(o => o.feedback && o.feedback.startsWith('✅'));
    const letter = ['A','B','C','D'][correctIdx] || '?';
    dist[letter] = (dist[letter] || 0) + 1;
    console.log(`  ${nodeId}: correct = ${letter}`);
  }
  console.log(`  Distribution: A=${dist.A}, B=${dist.B}, C=${dist.C}, D=${dist.D}`);

  // Rebuild the file
  // We need to serialize back to JS. Let's do it carefully.
  const output = buildOutput(varName, tree);
  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`  File written: ${filePath}`);
}

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
    out += `       ${nodeId.toUpperCase().replace(/-/g, '-')} | Dia ${node.day} | ${node.title}\n`;
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

// ===== SWAP MAPS =====
// null = keep as-is, 0=A, 1=B, 2=C, 3=D = target position for ✅

// tree-operations: target A,C,B,C,D, then remaining nodes
// Current: ops-01=A, ops-02=A, ops-03=A, ops-04=C, ops-05=A, ...
// Need to check all 12 nodes first
processFile('tree-operations.js', 'TREE_OPERATIONS', {
  'ops-01': null,    // keep A
  'ops-02': 2,       // A→C
  'ops-03': 1,       // A→B
  'ops-04': null,    // keep C
  'ops-05': 3,       // A→D
  'ops-06': null,    // keep whatever
  'ops-07': 1,       // A→B (if A)
  'ops-08': 3,       // A→D (if A)
  'ops-09': null,    // keep A
  'ops-10': 2,       // A→C (if A)
  'ops-11': 1,       // A→B (if A)
  'ops-12': null,    // keep whatever
});

processFile('tree-hr.js', 'TREE_HR', {
  'hr-01': null,     // keep A
  'hr-02': 3,        // A→D
  'hr-03': 1,        // A→B
  'hr-04': null,     // keep C
  'hr-05': 2,        // A→C
  'hr-06': null,     // keep C
  'hr-07': 1,        // A→B (if A)
  'hr-08': null,     // keep A
  'hr-09': 3,        // A→D (if A)
  'hr-10': 2,        // A→C (if A)
  'hr-11': null,     // keep whatever
  'hr-12': 1,        // A→B (if A)
});

processFile('tree-analyst.js', 'TREE_ANALYST', {
  'dat-01': 2,       // A→C
  'dat-02': null,    // keep A
  'dat-03': 1,       // A→B
  'dat-04': null,    // keep A
  'dat-05': 3,       // A→D
  'dat-06': 1,       // A→B
  'dat-07': 2,       // A→C (if A)
  'dat-08': null,    // keep A
  'dat-09': 3,       // A→D (if A)
  'dat-10': 1,       // A→B (if A)
  'dat-11': null,    // keep whatever
  'dat-12': 2,       // A→C (if A)
});

console.log('\nDone!');
