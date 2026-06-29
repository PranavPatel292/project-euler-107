import { Edge } from "../core/types";
import { readFileSync } from "fs";

/**
 * Validates that the network has at least 2 nodes.
 * @param nodeCount - Number of nodes in the network
 * @throws Error if fewer than 2 nodes
 */
function validateNetworkSize(nodeCount: number): void {
  if (nodeCount < 2) {
    throw new Error(`Network must have at least 2 nodes, got ${nodeCount}`);
  }
}

/**
 * Validates that a row has the expected number of columns.
 * @param values - The split row values
 * @param rowIndex - The row index for error reporting
 * @param expected - Expected number of columns
 * @throws Error if column count doesn't match
 */
function validateRowLength(
  values: string[],
  rowIndex: number,
  expected: number,
): void {
  if (values.length !== expected) {
    throw new Error(
      `Row ${rowIndex} has ${values.length} columns, expected ${expected}`,
    );
  }
}

/**
 * Validates and parses a single cell value from the matrix.
 * Must be either "-" (no connection) or a positive integer.
 * @param value - The raw cell value
 * @param row - Row index for error reporting
 * @param col - Column index for error reporting
 * @returns The parsed weight, or null if no connection
 * @throws Error if value is not "-" or a positive integer
 */
function validateAndParseCell(
  value: string,
  row: number,
  col: number,
): number | null {
  const trimmed = value.trim();

  if (trimmed === "-") return null;

  if (!/^\d+$/.test(trimmed)) {
    throw new Error(
      `Invalid value "${trimmed}" at row ${row}, column ${col}. Expected "-" or a positive integer`,
    );
  }

  const weight = parseInt(trimmed, 10);

  if (weight <= 0) {
    throw new Error(
      `Invalid weight ${weight} at row ${row}, column ${col}. Expected a positive integer`,
    );
  }

  return weight;
}

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
 * @throws Error if the file format is invalid
 */
export function parseNetworkFile(filePath: string): {
  edges: Edge[];
  nodeCount: number;
} {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.trim().split("\n");
  const nodeCount = lines.length;

  validateNetworkSize(nodeCount);

  const edges: Edge[] = [];

  for (let i = 0; i < nodeCount; i++) {
    const values = lines[i].split(",");

    validateRowLength(values, i, nodeCount);

    for (let j = i + 1; j < nodeCount; j++) {
      const weight = validateAndParseCell(values[j], i, j);

      if (weight !== null) {
        edges.push({ from: i, to: j, weight });
      }
    }
  }

  return { edges, nodeCount };
}
