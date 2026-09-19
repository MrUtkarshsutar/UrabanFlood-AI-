# Safe Routing Engine - UrbanFlood AI

The routing module computes safe, flood-resilient transit paths across the urban road network.

## Subdirectories
- `safe-route/`: Pathfinding algorithms (Dijkstra, A*) modified with flood hazard penalty cost functions:
  $$\text{Cost}(e) = \text{Length}(e) \times \left(1 + \alpha \cdot \text{RiskLevel}(e)\right) + \beta \cdot \text{InundationDepth}(e)$$
- `graph/`: Graph representations of the road network generated from OpenStreetMap data via OSMnx or NetworkX.
