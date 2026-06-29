import { describe, expect, it } from "vitest";

import { Edge } from "./types";
import { kruskal } from "./kruskal";

describe("kruskal", () => {
  it("finds MST for a simple 3-node network", () => {
    // Triangle: A-B=16, B-C=8, A-C=12
    const edges: Edge[] = [
      { from: 0, to: 1, weight: 16 },
      { from: 1, to: 2, weight: 8 },
      { from: 0, to: 2, weight: 12 },
    ];

    const result = kruskal(edges, 3);

    expect(result.originalWeight).toBe(36);
    expect(result.mstWeight).toBe(20); // 8 + 12
    expect(result.saving).toBe(16);
    expect(result.mstEdges).toHaveLength(2);
  });

  it("keeps the only edge when there is no alternative", () => {
    // Linear: A-B=5, B-C=10 (no A-C edge)
    const edges: Edge[] = [
      { from: 0, to: 1, weight: 5 },
      { from: 1, to: 2, weight: 10 },
    ];

    const result = kruskal(edges, 3);

    expect(result.saving).toBe(0); // No edges can be removed
    expect(result.mstEdges).toHaveLength(2);
  });

  it("handles a 4-node network correctly", () => {
    // Square with diagonals
    const edges: Edge[] = [
      { from: 0, to: 1, weight: 10 },
      { from: 0, to: 2, weight: 6 },
      { from: 0, to: 3, weight: 5 },
      { from: 1, to: 3, weight: 15 },
      { from: 2, to: 3, weight: 4 },
    ];

    const result = kruskal(edges, 4);

    // MST should pick: 2-3(4), 0-3(5), 0-1(10) = 19
    expect(result.mstWeight).toBe(19);
    expect(result.mstEdges).toHaveLength(3); // n-1 edges
  });

  it("solves the HackerRank sample correctly", () => {
    /* Given */
    const edges: Edge[] = [
      { from: 0, to: 1, weight: 16 },
      { from: 0, to: 2, weight: 12 },
      { from: 0, to: 3, weight: 21 },
      { from: 1, to: 3, weight: 17 },
      { from: 1, to: 4, weight: 20 },
      { from: 2, to: 3, weight: 28 },
      { from: 2, to: 5, weight: 31 },
      { from: 3, to: 4, weight: 18 },
      { from: 3, to: 5, weight: 19 },
      { from: 3, to: 6, weight: 23 },
      { from: 4, to: 6, weight: 11 },
      { from: 5, to: 6, weight: 27 },
    ];

    /* When */
    const result = kruskal(edges, 7);

    /* Then */
    expect(result.mstWeight).toBe(93);
  });
});
