# System Architecture - UrbanFlood AI

## 1. High-Level Architectural Overview

UrbanFlood AI is an intelligent, geospatial nowcasting and decision-support platform designed to monitor, predict, and mitigate urban flood impacts in near-real-time. The architecture follows a decoupled, modular monorepo pattern separating:
1. **Frontend Presentation & Interaction (Vite / React / Leaflet)**
2. **Backend Services & API Gateway (FastAPI / Pydantic / SQLAlchemy / PostGIS)**
3. **AI/ML Inference Engine (XGBoost / Scikit-learn)**
4. **GIS & Geospatial Analysis Subsystem (GeoPandas / Shapely / Rasterio)**
5. **Data Pipeline & Ingestion Workers (Open-Meteo, Copernicus DEM, OSM)**
6. **Heuristic Routing & Alert Dispatch Engine (OSRM / Custom Graph Router)**

```mermaid
flowchart TD
    subgraph Data_Ingestion["Data Ingestion & Pipeline Layer"]
        A1[Open-Meteo Live API] --> DP[Data Ingestion Pipeline]
        A2[Copernicus 30m DEM] --> DP
        A3[OpenStreetMap Overpass] --> DP
        A4[Historical Flood Records] --> DP
        A5[Future IoT Sensor Nodes] -.-> DP
    end

    subgraph GIS_Engine["Geospatial & Feature Engineering Layer"]
        DP --> FE[Feature Preprocessor]
        FE --> DEM_Proc[Slope & Elevation Analysis]
        FE --> Hydro_Proc[Drainage Proximity & Land Cover]
        FE --> Rain_Proc[Antecedent Precipitation Index - API]
    end

    subgraph AI_Layer["AI / ML Inference Layer"]
        DEM_Proc --> ML[XGBoost Risk Classifier]
        Hydro_Proc --> ML
        Rain_Proc --> ML
        ML --> RiskEngine[Flood Risk Scoring Engine]
    end

    subgraph Service_Layer["Backend Service Layer (FastAPI)"]
        RiskEngine --> RiskAPI[Risk & Hazard Microservice]
        RiskEngine --> AlertAPI[Early Warning & Alert Service]
        RiskEngine --> RouteAPI[Safe Route Recommendation Engine]
        DB[(PostgreSQL + PostGIS)] <--> Service_Layer
    end

    subgraph Client_Layer["Frontend Presentation Layer (React + Leaflet)"]
        RiskAPI --> CitizenUI[Citizen Interactive Web App]
        AlertAPI --> CitizenUI
        RouteAPI --> CitizenUI
        RiskAPI --> AdminUI[Municipal Emergency Command Dashboard]
        AlertAPI --> AdminUI
    end
```

---

## 2. Core Architectural Components

### 2.1 Presentation Tier (Frontend)
- **Framework**: React.js with Vite for modern, fast single-page application (SPA) performance.
- **Styling**: Tailwind CSS with dark-mode aesthetic, high-contrast hazard indicators, and accessibility standards.
- **Mapping**: Leaflet and React-Leaflet with OpenStreetMap tiles, dynamic GeoJSON vector layers, and color-coded risk heatmaps.
- **Offline Resilience**: Progressive Web App (PWA) capabilities, caching static assets and last-known flood risk maps via Service Workers and IndexedDB.

### 2.2 Application & Business Tier (Backend)
- **Framework**: FastAPI (Python 3.10+) utilizing asynchronous I/O (`async`/`await`) for high concurrency and low latency.
- **Data Validation**: Pydantic schemas enforce strict typing across all input/output payloads.
- **Data Persistence**: SQLAlchemy async ORM with PostGIS geometry extensions for spatial querying. Fallback support for SQLite in zero-dependency local environments.
- **Authentication & Security**: JWT-based token authentication for municipal administrators and role-based access control (RBAC).

### 2.3 AI/ML Inference Pipeline
- **Core Model**: Gradient-boosted decision trees (XGBoost) trained on multi-variable environmental features (precipitation intensity, cumulative rainfall, elevation, slope, distance to storm drains, runoff coefficient).
- **Inference Lifecycle**: Model artifacts saved via Joblib are loaded at application startup into memory for sub-100ms prediction latency.
- **Explainability & Calibrated Outputs**: Risk probability scores mapped to four discrete levels: Low, Moderate, High, and Critical.

### 2.4 Geospatial Data Layer (GIS)
- **Raster Processing**: Digital Elevation Models (DEMs) are processed via Rasterio to derive slope, aspect, and topographic wetness indices (TWI).
- **Vector Processing**: GeoPandas and Shapely represent catchments, municipal ward boundaries, and road networks.
- **Spatial Indexing**: PostGIS R-Tree spatial indexing for bounding-box queries and point-in-polygon evaluations.

### 2.5 Safe Routing Engine
- **Graph Modeling**: Road networks extracted from OpenStreetMap are represented as weighted directional graphs.
- **Dynamic Cost Function**: Edge weights are dynamically penalized by flood probability and water accumulation depth, forcing Dijkstra/A* pathfinding algorithms to route pedestrian and vehicular traffic through higher-elevation, low-risk streets.
