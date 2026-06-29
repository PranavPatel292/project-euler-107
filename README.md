# Project Euler 107 - Minimal Network

## The Problem

Given a weighted undirected network (graph), we need to find a solution that connects all the vertices (nodes) of the graph but with the minimum total weight, removing redundant edges in the process.

The input file consists of 40 vertices in a matrix form, and we need to find the maximum saving by eliminating the redundant (cyclic) edges while making sure the graph stays connected.

You can find the original problem description [here](https://projecteuler.net/problem=107).

## My Approach

The initial solution I thought I would use was simple BFS or DFS, as it would traverse all the edges and nodes to find the minimum and then use that to construct the solution.

However, some Google search and AI help later, I found that it could be simplified by an algorithm called `Kruskal`'s algorithm. This is basically a `Minimum Spanning Tree (MST)` problem. Kruskal's algorithm does the following in plain language:

1. Sort all edges by weight, smallest first
2. Go through them one by one
3. For each edge, if connecting it doesn't create a cycle, keep it
4. If it would create a cycle, skip it
5. Stop when all nodes are connected

This is exactly what we need. We start with the minimum weight edge and select it. If it doesn't form a cycle we keep it, otherwise we ignore it. We keep doing this for all edges.

### Simple Example

Add Photo here later.

## How Union-Find Works

Kruskal's algorithm needs a way to check if adding an edge would create a cycle. The `Union-Find` solves this by tracking which nodes are already connected. It is simpler than the DFS cycle check logic.

For example:

```
// We start with each node as its own leader:
leader = { A: A, B: B, C: C }

// Now when we visit the edge B-C -> Find B's leader, Find C's leader, different - Make C's leader point to B.
leader = { A: A, B: B, C: B }

// Now for the A-C, we do the same -> Find A's leader (A), Find C's leader (B), different - Make A's leader point to B.
leader = { A: B, B: B, C: B }

// Now for the A-B, we do the same -> Find A's leader (B), Find B's leader (B), same - skip, would create a cycle.
```

## AI Model Used

I used `Claude Opus 4.6` on `medium` thinking settings. I didn't think the problem required anything complicated enough to justify Opus 4.8 Max - this would save tokens as well. Haiku would also work for this, since once you understand the problem and know you need Kruskal's algorithm, the implementation is straightforward to direct.

I choose Claude because I am using it daily (almost) for the coding and I feel like it is better than other vendor's models.

## Why The Solution Is Correct

Kruskal's algorithm is a greedy algorithm. At each step it picks the lowest weight edge that doesn't create a cycle. This greedy approach is mathematically proven to produce the Minimum Spanning Tree (MST).

It works because:

- By always picking the smallest available edge, we guarantee no cheaper alternative exists for connecting those two groups
- By skipping edges that would create a cycle, we ensure the result is a tree (connected, no loops)

## Result

```
Nodes: 40
Original network weight: 261832
MST weight: 2153
Maximum saving: 259679
```

### Verification

The solution was also verified against [HackerRank's Project Euler #107](https://www.hackerrank.com/contests/projecteuler/challenges/euler107/problem).

All test cases passed.

Please attach photo.

## Project Structure

The whole concept of the solution was to maintain clean architecture principles with unit testing.

### Infrastructure Layer (`src/infra/`)

The first step is to parse the input file, which is in `.txt` format (downloaded from the Project Euler). The `infra` folder handles this because file reading is an external system concern. I thought, we could someday replace the `.txt` input with a PDF, an API call, or any other source. In that case, we'd only need to change or add files here; no domain logic would be touched.

This is also where validation lives. The parser could validate network size, row length, and cell values at the boundary, so we can be sure that the core layer will always receive clean, well-typed data.

### Core Layer (`src/core/`)

The core contains the pure business logic with zero external dependencies:

- **`types.ts`** - Defines the `Edge` and `MSTResult` types that flow through the system
- **`unionFind.ts`** - Union-Find data structure that tracks which nodes are connected. Three methods: `find` (which group is this node in), `union` (merge two groups), `connected` (are these two nodes already in the same group)
- **`kruskal.ts`** - Implements Kruskal's algorithm: sorts edges by weight, iterates through them, uses Union-Find to keep edges that don't create cycles, and returns the MST result with the saving

### Dependencies Point Inward

Core never imports from infra. Infra imports types from core. Main imports from both. - The main idea behind clean architecture.

## How To Run

```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Run the solution
yarn start
```

## Future Improvement

- Add structured logging for tracing edge selection decisions during the algorithm.
