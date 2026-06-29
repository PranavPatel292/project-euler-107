/**
 * Represents a weighted edge between two nodes in the network.
 */
export interface Edge {
  /** Source node index */
  from: number;
  /** Destination node index */
  to: number;
  /** Weight (cost) of the connection */
  weight: number;
}

/**
 * Result of running Kruskal's MST algorithm.
 */
export interface MSTResult {
  /** Total weight of all edges in the original network */
  originalWeight: number;
  /** Total weight of the minimum spanning tree */
  mstWeight: number;
  /** The saving achieved: originalWeight - mstWeight */
  saving: number;
  /** Edges included in the MST */
  mstEdges: Edge[];
}
