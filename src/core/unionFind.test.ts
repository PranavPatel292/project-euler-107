import { describe, expect, it } from "vitest";

import { UnionFind } from "./unionFind";

describe("UnionFind", () => {
  it("each node starts in its own group", () => {
    /* Given */
    const uf = new UnionFind(3);

    /* Then */
    expect(uf.connected(0, 1)).toBe(false);
    expect(uf.connected(1, 2)).toBe(false);
    expect(uf.connected(0, 2)).toBe(false);
  });

  it("union connects two nodes into the same group", () => {
    /* Given */
    const uf = new UnionFind(3);

    /* When */
    uf.union(0, 1);

    /* Then */
    expect(uf.connected(0, 1)).toBe(true);
    expect(uf.connected(0, 2)).toBe(false);
  });

  it("nodes are connected through a chain", () => {
    /* Given */
    const uf = new UnionFind(3);

    /* When */
    uf.union(0, 1);
    uf.union(1, 2);

    /* Then */
    expect(uf.connected(0, 2)).toBe(true);
  });

  it("separate groups remain disconnected until merged", () => {
    /* Given */
    const uf = new UnionFind(5);

    /* When */
    uf.union(0, 1);
    uf.union(2, 3);

    /* Then */
    expect(uf.connected(0, 3)).toBe(false);

    /* When */
    uf.union(1, 2);

    /* Then */
    expect(uf.connected(0, 3)).toBe(true);
    expect(uf.connected(0, 4)).toBe(false);
  });
});
