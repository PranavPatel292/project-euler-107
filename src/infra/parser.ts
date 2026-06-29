import { Edge } from "../core/types";
import { readFileSync } from "fs";

/**
 * Parse the Problem 107 network matrix from a text file.
 * The file contains a comma-separated adjacency matrix
 * where "-" means no direct connection.
 *
 * Only reads the upper triangle to avoid counting
 * each edge twice (matrix is symmetric).
 *
 * @param filePath - Path to the network text file
 * @returns Object containing the parsed edges and node count
 */
export function parseNetworkFile(filePath: string): {
  edges: Edge[];
  nodeCount: number;
} {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.trim().split("\n");
  const nodeCount = lines.length;
  const edges: Edge[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const values = lines[i].split(",");
    // Only read upper triangle (j > i) to avoid duplicates
    for (let j = i + 1; j < nodeCount; j++) {
      const value = values[j].trim();
      if (value !== "-") {
        edges.push({
          from: i,
          to: j,
          weight: parseInt(value, 10),
        });
      }
    }
  }

  return { edges, nodeCount };
}
