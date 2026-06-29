import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdirSync, rmSync, writeFileSync } from "fs";

import { parseNetworkFile } from "./parser";

describe("parseNetworkFile", () => {
  const testDir = "./test-input";
  const testFile = `${testDir}/test-network.txt`;

  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true });
  });

  it("parses a simple 3-node matrix", () => {
    /* Given */
    writeFileSync(testFile, "-,16,12\n16,-,8\n12,8,-");

    /* When */
    const { edges, nodeCount } = parseNetworkFile(testFile);

    /* Then */
    expect(nodeCount).toBe(3);
    expect(edges).toHaveLength(3);
    expect(edges).toContainEqual({ from: 0, to: 1, weight: 16 });
    expect(edges).toContainEqual({ from: 0, to: 2, weight: 12 });
    expect(edges).toContainEqual({ from: 1, to: 2, weight: 8 });
  });

  it("handles missing connections marked with dash", () => {
    /* Given */
    writeFileSync(testFile, "-,5,-\n5,-,10\n-,10,-");

    /* When */
    const { edges, nodeCount } = parseNetworkFile(testFile);

    /* Then */
    expect(nodeCount).toBe(3);
    expect(edges).toHaveLength(2);
    expect(edges).toContainEqual({ from: 0, to: 1, weight: 5 });
    expect(edges).toContainEqual({ from: 1, to: 2, weight: 10 });
  });

  it("only reads upper triangle to avoid duplicate edges", () => {
    /* Given */
    writeFileSync(testFile, "-,10\n10,-");

    /* When */
    const { edges } = parseNetworkFile(testFile);

    /* Then */
    expect(edges).toHaveLength(1);
    expect(edges[0]).toEqual({ from: 0, to: 1, weight: 10 });
  });
});
