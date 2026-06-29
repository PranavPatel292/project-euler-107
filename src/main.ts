import { kruskal } from "./core/kruskal";
import { parseNetworkFile } from "./infra/parser";

/**
 * Composition root — wires infrastructure to core logic.
 * Reads the network file, runs Kruskal's algorithm,
 * and outputs the maximum saving.
 */
function main(): void {
  const { edges, nodeCount } = parseNetworkFile("./input/network.txt");
  const result = kruskal(edges, nodeCount);

  console.log(`Nodes: ${nodeCount}`);
  console.log(`Original network weight: ${result.originalWeight}`);
  console.log(`MST weight: ${result.mstWeight}`);
  console.log(`Maximum saving: ${result.saving}`);
}

main();
