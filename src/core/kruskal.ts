import { Edge, MSTResult } from "./types";

import { UnionFind } from "./unionFind";

/**
 * Kruskal's Algorithm for finding the Minimum Spanning Tree.
 *
 * 1. Sort all edges by weight (smallest first)
 * 2. Iterate through edges — keep if it connects two
 *    different groups, skip if it would create a cycle
 * 3. Stop when all nodes are connected
 *
 * @param edges - All edges in the network
 * @param nodeCount - Total number of nodes
 * @returns MSTResult with original weight, MST weight, and savings
 */
export function kruskal(edges: Edge[], nodeCount: number): MSTResult {
  const originalWeight = edges.reduce((sum, edge) => sum + edge.weight, 0);

  const sorted = [...edges].sort((a, b) => a.weight - b.weight);

  const uf = new UnionFind(nodeCount);
  const mstEdges: Edge[] = [];
  let mstWeight = 0;

  for (const edge of sorted) {
    if (!uf.connected(edge.from, edge.to)) {
      uf.union(edge.from, edge.to);
      mstEdges.push(edge);
      mstWeight += edge.weight;
    }
    // Skip — same group, would create a cycle
  }

  return {
    originalWeight,
    mstWeight,
    saving: originalWeight - mstWeight,
    mstEdges,
  };
}
