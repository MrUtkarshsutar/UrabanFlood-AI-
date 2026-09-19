# Data Flow Architecture - UrbanFlood AI

## 1. End-to-End Data Pipeline

The data flow in UrbanFlood AI operates in two synchronized cadences:
1. **Periodic Batch Ingestion & Aggregation** (15 to 30-minute intervals) for weather updates and watershed feature computation.
2. **On-Demand Real-Time Request-Response** for user geolocation queries, custom area risk evaluation, and dynamic safe route pathfinding.

```mermaid
sequenceDiagram
    autonumber
    participant Ext as External APIs (Open-Meteo / OSM)
    participant Pipe as Data Ingestion Pipeline
    participant DB as PostGIS / Cache
    participant AI as ML Inference Engine
    participant API as FastAPI Backend
    participant Client as React Dashboard / PWA

    %% Periodic Flow
    loop Every 15 Minutes
        Pipe->>Ext: Poll Hourly/Current Precipitation & Radar
        Ext-->>Pipe: Precipitation (mm/hr), Cloud Cover, Wind
        Pipe->>Pipe: Clean, Normalize & Impute Missing Readings
        Pipe->>DB: Upsert Weather Observations & Time-Series
    end

    %% User Request Flow
    Client->>API: GET /api/v1/flood-risk?lat=19.07&lng=72.87
    API->>DB: Fetch Latest Precipitation & Precomputed Terrain Attributes
    DB-->>API: Elevation, Slope, Distance to Drain, Current Rain
    API->>AI: Predict Risk(Features Vector)
    AI-->>API: Risk Score (0.78), Category: HIGH
    API-->>Client: JSON Response (Risk, Thresholds, Safety Advisories)

    %% Route Request Flow
    Client->>API: POST /api/v1/safe-route (Origin, Destination)
    API->>DB: Fetch Road Network Graph + Overlay Current Risk Polygons
    API->>API: Compute Dynamic Edge Weights (Length + Inundation Penalty)
    API->>API: Execute Safe Path Algorithm (A*)
    API-->>Client: GeoJSON Safe Route MultiLineString + Waypoints
```

---

## 2. Ingestion & Transformation Matrix

| Phase | Input Source | Primary Tools | Transformation | Output Destination |
| :--- | :--- | :--- | :--- | :--- |
| **Meteorological** | Open-Meteo API | `requests`, `pandas` | Aggregate 1-hr, 3-hr, 6-hr, 24-hr antecedent rainfall totals | In-memory cache & Timescale/PostgreSQL table |
| **Topographical** | Copernicus 30m DEM | `rasterio`, `numpy` | Calculate Slope (degrees), Aspect, Curvature, and Flow Direction | GeoTIFF raster & pre-gridded centroid features |
| **Infrastructural** | OpenStreetMap Overpass | `osmnx`, `shapely` | Extract storm water drains, river channels, and road networks | GeoJSON layers & NetworkX graph |
| **Feature Vector** | Joined attributes | `scikit-learn` | MinMax / StandardScaler normalization & categorical encoding | XGBoost DMatrix format for inference |
