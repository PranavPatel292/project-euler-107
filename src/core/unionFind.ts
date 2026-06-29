/**
 * Union-Find (Disjoint Set) data structure.
 * Tracks which nodes are connected to determine
 * if adding an edge would create a cycle.
 *
 * Each node has a "leader" (parent). Nodes in the
 * same group share the same root leader.
 */
export class UnionFind {
  private leader: Record<number, number>;

  /**
   * Initialise Union-Find with n nodes.
   * Each node starts as its own leader.
   * @param size - Number of nodes in the network
   */
  constructor(size: number) {
    this.leader = {};
    for (let i = 0; i < size; i++) {
      this.leader[i] = i;
    }
  }

  /**
   * Find the root leader of a node by following
   * the leader chain until a node points to itself.
   * @param node - The node to find the root for
   * @returns The root leader of the node's group
   */
  find(node: number): number {
    let current = node;
    while (this.leader[current] !== current) {
      current = this.leader[current];
    }
    return current;
  }

  /**
   * Merge two groups together by making one root
   * point to the other.
   * @param nodeA - First node
   * @param nodeB - Second node
   */
  union(nodeA: number, nodeB: number): void {
    const rootA = this.find(nodeA);
    const rootB = this.find(nodeB);
    if (rootA !== rootB) {
      this.leader[rootA] = rootB;
    }
  }

  /**
   * Check if two nodes are already in the same group.
   * If they are, connecting them would create a cycle.
   * @param nodeA - First node
   * @param nodeB - Second node
   * @returns true if both nodes share the same root leader
   */
  connected(nodeA: number, nodeB: number): boolean {
    return this.find(nodeA) === this.find(nodeB);
  }
}
