# UrbanFlood AI

An AI-powered urban flood nowcasting and early warning platform that combines weather, terrain, GIS, and machine learning data to identify flood-prone areas and help communities make safer decisions.

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Python](https://img.shields.io/badge/Language-Python%203.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![XGBoost](https://img.shields.io/badge/Machine%20Learning-XGBoost-EB6424)](https://xgboost.readthedocs.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20PostGIS-336791?logo=postgresql&logoColor=white)](https://postgis.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/Repository-GitHub-181717?logo=github&logoColor=white)](https://github.com/MrUtkarshsutar/UrabanFlood-AI-)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Problem Statement](#2-problem-statement)
3. [Proposed Solution](#3-proposed-solution)
4. [Key Features](#4-key-features)
5. [System Architecture](#5-system-architecture)
6. [Working Flow](#6-working-flow)
7. [AI/ML Approach](#7-aiml-approach)
8. [GIS & Mapping](#8-gis--mapping)
9. [Data Sources](#9-data-sources)
10. [Technology Stack](#10-technology-stack)
11. [Project Structure](#11-project-structure)
12. [Installation](#12-installation)
13. [Environment Variables](#13-environment-variables)
14. [Running the Project](#14-running-the-project)
15. [API Overview](#15-api-overview)
16. [Flood Risk Levels](#16-flood-risk-levels)
17. [Offline/Low-Connectivity Strategy](#17-offlinelow-connectivity-strategy)
18. [Security](#18-security)
19. [Testing](#19-testing)
20. [Future Scope](#20-future-scope)
21. [Team](#21-team)
22. [Contribution](#22-contribution)
23. [License](#23-license)
24. [References](#24-references)

---

## 1. Overview

**UrbanFlood AI** is a modular, open-source urban flood nowcasting, risk classification, early warning, and safe route recommendation system. Designed primarily for low-resource municipal deployments and citizen preparedness, UrbanFlood AI synthesizes meteorological forecasts with Digital Elevation Models (DEM), OpenStreetMap road graphs, and supervised machine learning to generate localized, dynamic flood susceptibility scores.

---

## 2. Problem Statement

Urban centers across the globe face an escalating frequency and severity of flash floods driven by:

* **Sudden Heavy Rainfall & Convective Storms**: Short-duration, extreme precipitation events deliver volumes that far exceed historical baseline measurements.
* **Rapid Urbanization & Soil Imperviousness**: Continuous conversion of permeable soil into concrete, paved asphalt, and dense structures eliminates natural groundwater infiltration, drastically increasing overland runoff coefficient.
* **Depression Sinks & Low-Lying Pockets**: Natural low-elevation depressions, sunken underpasses, and coastal floodplains quickly turn into hazardous inundation traps.
* **Inadequate or Obstructed Drainage**: Stormwater drainage systems engineered decades ago are chronically undersized, poorly mapped, or blocked by siltation and solid waste.
* **Lack of Localized Warnings**: Traditional weather forecasts operate at the scale of entire administrative districts, failing to pinpoint which specific street junctions or wards are experiencing life-threatening water logging.
* **Difficulty Identifying Safe Routes**: Conventional commercial navigation engines steer vehicles through the shortest or fastest congested roads, regularly guiding drivers directly into impassable flooded underpasses.
* **Limited Real-Time Decision Support**: Municipal emergency response teams and disaster management agencies lack unified spatial platforms that merge incoming weather telemetry with terrain physics for preemptive evacuation planning.

---

## 3. Proposed Solution

UrbanFlood AI addresses these challenges through an integrated data and prediction pipeline:

```
Weather Data (Open-Meteo)
         ↓
GIS & Terrain Data (Copernicus DEM + OpenStreetMap)
         ↓
Data Processing & Spatial Joining
         ↓
Hydrological Feature Engineering (Slope, Accumulation, API)
         ↓
AI/ML Susceptibility Prediction (XGBoost / Scikit-learn)
         ↓
Dynamic Flood Risk Map (Vector GeoJSON)
         ↓
Early Warning Alert Generation
         ↓
Safe Route Recommendation Engine
         ↓
Citizen & Municipal Admin Dashboards
```

---

## 4. Key Features

### 4.1 Citizen Dashboard
* **Current Flood Risk**: Instant localized hazard indicator based on user geolocation or address search.
* **Interactive Risk Map**: Smooth vector map depicting color-coded flood hazard zones and water logging hotspots.
* **Area Risk Level & Advisories**: Contextual safety guidelines based on calibrated severity (e.g. low-lying subway closures).
* **Precipitation Monitoring**: Live hourly rainfall totals alongside short-range (1 to 6 hour) convective forecasts.
* **Push & In-App Early Warnings**: Immediate notifications when local precipitation intensity crosses safety thresholds.
* **Safe Route Navigation**: Hazard-evading route recommendations avoiding flooded streets and low-elevation sumps.
* **Emergency Shelter Locator**: Identification of nearest active municipal relief shelters, medical centers, and emergency contacts.

### 4.2 Emergency / Admin Dashboard
* **Live Incident & Risk Heatmap**: Real-time municipal overview displaying predicted inundation zones by administrative ward.
* **High-Risk Hotspot Identification**: Instant tabular ranking of zones exhibiting critical risk probabilities.
* **Rainfall & Runoff Monitoring**: Synchronized telemetry tracking station-level and gridded meteorological inputs.
* **Emergency Alert Management**: Manual and automated broadcast interface for publishing targeted civil alerts.
* **Affected Asset Monitoring**: Geospatial overlay identifying critical infrastructure (hospitals, schools, substations) within risk polygons.
* **Route & Evacuation Oversight**: Monitoring recommended arterial corridors to ensure emergency vehicles bypass flooded arteries.
* **Historical Event Analytics**: Retrospective review of past rainfall events versus model predictions for audit and validation.

### 4.3 AI Prediction Engine
* **Precipitation Dynamics**: Evaluation of 1-hour intensity, 3-hour cumulative rainfall, and forecast precipitation.
* **Topographical Modeling**: Cell-level elevation, gradient slope (degrees), and depression depth calculation.
* **Drainage Proximity Analysis**: Distance to nearest mapped stormwater conduit or open canal.
* **Historical Pattern Matching**: Integration of chronic water logging spots recorded in past monsoon seasons.
* **Calibrated Output**: Discrete flood susceptibility probabilities paired with four standard risk tiers.

### 4.4 GIS & Mapping Subsystem
* **Vector & Raster Layers**: High-performance GeoJSON visualization layered over base OpenStreetMap tiles.
* **Elevation & Slope Overlays**: Visual representation of topographic features that induce pooling.
* **Drainage & Waterways**: Layer toggle for stormwater drains, natural streams, and culverts.
* **Urban Infrastructure Overlay**: Road hierarchies, footpaths, bridges, and municipal building footprints.

---

## 5. System Architecture

UrbanFlood AI decouples data ingestion, machine learning inference, backend business logic, and presentation:

```mermaid
flowchart TD
    A[Weather Data] --> B[Data Pipeline]
    C[GIS Data] --> B
    D[Historical Flood Data] --> B
    B --> E[Feature Engineering]
    E --> F[AI/ML Model]
    F --> G[Flood Risk Engine]
    G --> H[Risk Map]
    G --> I[Alert Engine]
    G --> J[Safe Route Engine]
    H --> K[React Dashboard]
    I --> K
    J --> K
```

---

## 6. Working Flow

1. **Scheduled Ingestion**: The data pipeline polls meteorological APIs (Open-Meteo) at configurable intervals (15–30 minutes).
2. **Feature Harmonization**: Incoming rainfall values are joined with static geospatial features (DEM elevation, slope, flow accumulation, distance to drains) per spatial cell.
3. **ML Inference**: The feature vector is passed to the trained XGBoost model to calculate a flood susceptibility probability $P(\text{Flood})$.
4. **Risk Classification**: The probability is mapped to one of four calibrated hazard tiers: Low, Moderate, High, or Critical.
5. **Geospatial Layer Generation**: Inundated zone polygons and road hazard states are updated and formatted into GeoJSON.
6. **Route Penalization**: Road network edge weights are dynamically scaled by flood probability, preventing navigation paths from routing through hazard zones.
7. **Client Delivery**: The React client consumes updated risk layers, renders maps via Leaflet, triggers alert banners, and caches emergency layers for offline resilience.

---

## 7. AI/ML Approach

### 7.1 Input Features
* **`rainfall_1h_mm`**: Observed rainfall during the past hour.
* **`rainfall_3h_mm`**: Short-term antecedent precipitation.
* **`forecast_rainfall_next_3h_mm`**: Forward-looking precipitation forecast.
* **`elevation_m`**: Height above sea level (Copernicus 30m DEM).
* **`slope_deg`**: Terrain gradient calculated via first-order spatial derivatives.
* **`distance_to_drain_m`**: Distance to nearest stormwater canal or conduit.
* **`impervious_surface_ratio`**: Urban land cover fraction (impermeable surface).
* **`historical_flood_count`**: Frequency of verified historical flooding events in the zone.

### 7.2 Processing Pipeline
$$\text{Data Cleaning} \longrightarrow \text{Spatial Imputation} \longrightarrow \text{Feature Engineering} \longrightarrow \text{Standardization} \longrightarrow \text{Model Evaluation} \longrightarrow \text{Probability Calibration}$$

### 7.3 Model Selection & Training
* **Algorithm**: Gradient Boosted Trees (XGBoost / LightGBM) and Scikit-learn Random Forest baseline.
* **Loss Function**: Binary Cross-Entropy with class-weight rebalancing for rare flood events.
* **Artifacts**: Serialized model estimators and feature scalers stored in `ai/models/saved/` via Joblib.

> [!NOTE]
> **Validation Notice**: ML models in this repository provide statistical susceptibility estimates based on available open datasets. Outputs must be empirically calibrated and validated against ground-truth municipal rain gauges and historical flood water-mark records before operational life-safety deployment.

---

## 8. GIS & Mapping

The spatial architecture leverages open standards and open data formats:
* **Digital Elevation Models (DEM)**: Copernicus GLO-30 raster tiles clipped and processed using `Rasterio` and `NumPy` to derive slope, flow accumulation, and topographic wetness index (TWI).
* **Road & Drainage Graph**: Extracted from OpenStreetMap (OSM) through Overpass API queries, represented as a topological graph for vehicle and pedestrian traversal.
* **Map Projection**: All geospatial vector geometries are standardized to EPSG:4326 (WGS84) for web delivery and projected to local UTM zones for metric distance calculations.
* **Cartographic Visualization**: Leaflet / React-Leaflet with custom vector tile styling, dynamic opacity controls, and responsive marker clustering.

---

## 9. Data Sources

| Data Category | Source Provider | Primary Purpose | Official Source Link |
| :--- | :--- | :--- | :--- |
| **Weather & Nowcasting** | Open-Meteo API | Real-time precipitation, humidity, short-term forecast | [open-meteo.com](https://open-meteo.com/) |
| **Terrain & Elevation** | Copernicus GLO-30 DEM | 30m Digital Elevation Model, slope, depression mapping | [spacedata.copernicus.eu](https://spacedata.copernicus.eu/) |
| **Roads & Transport Network** | OpenStreetMap (OSM) | Street network graph, routing edges, surface types | [openstreetmap.org](https://www.openstreetmap.org/) |
| **Buildings & Drainage** | OpenStreetMap (OSM) | Building footprints, canals, culverts, riverbanks | [overpass-turbo.eu](https://overpass-turbo.eu/) |
| **Historical Flood Data** | Public Municipal Records / Dartmouth Flood Obs. | Ground-truth historical water logging spots for ML training | [floodobservatory.colorado.edu](https://floodobservatory.colorado.edu/) |
| **IoT Telemetry (Future)** | City IoT Sensors / Community Gateways | Ultra-localized ultrasonic water level telemetry | *Planned Future Integration* |

---

## 10. Technology Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Leaflet, React-Leaflet, Lucide Icons, Axios
* **Backend API**: Python 3.11, FastAPI, Pydantic v2, SQLAlchemy 2.0 (Async), Uvicorn
* **AI / Machine Learning**: Scikit-learn, XGBoost, Pandas, NumPy, SciPy, Joblib
* **GIS & Geospatial**: GeoPandas, Shapely, Rasterio, NetworkX, OSMnx
* **Database & Persistence**: PostgreSQL with PostGIS extension (SQLite fallback for local prototyping)
* **DevOps & Infrastructure**: Docker, Docker Compose, GitHub Actions, Vercel (Frontend), Render / Railway (Backend)

---

## 11. Project Structure

```
UrbanFlood-AI/
├── README.md                           # Master Project Documentation
├── LICENSE                             # MIT Open-Source License
├── .gitignore                          # Git Exclusions (Python, Node, GIS, Models)
├── .env.example                        # Template Environment Configuration
├── docker-compose.yml                  # Production Container Orchestration
├── docker-compose.dev.yml              # Local Development with Live Reload
│
├── docs/                               # Comprehensive Technical Documentation
│   ├── architecture/
│   │   ├── system-architecture.md      # Detailed Subsystem Architecture
│   │   ├── data-flow.md                # Data Ingestion & Transformation Sequence
│   │   └── working-flow.md             # Operational Workflows & User Journeys
│   ├── api/
│   │   └── api-documentation.md        # Full REST API Specification
│   ├── research/
│   │   ├── problem-statement.md        # Hydrological & Urban Flooding Analysis
│   │   ├── datasets.md                 # Dataset Dictionary & Schema
│   │   └── references.md               # Academic & Industry Citations
│   └── diagrams/                       # High-Resolution Architectural Diagrams
│
├── frontend/                           # React + Vite Web Application
│   ├── public/                         # Static Assets & Icons
│   ├── src/
│   │   ├── assets/                     # Styles, SVG Icons, Graphics
│   │   ├── components/                 # UI Component Library (Navbar, Map, Cards)
│   │   ├── pages/                      # CitizenDashboard, AdminDashboard, AlertsPage
│   │   ├── layouts/                    # Main Shell & Header/Sidebar Layouts
│   │   ├── hooks/                      # Geolocation, Weather, and Risk Custom Hooks
│   │   ├── services/                   # Axios API Clients & Offline Storage Helpers
│   │   ├── context/                    # Global Auth, Alert, and Map Contexts
│   │   ├── utils/                      # Color Formatters, GeoJSON Parsers
│   │   ├── constants/                  # Risk Levels, Map Tile URLs, Fallback Lat/Lng
│   │   ├── types/                      # TypeScript / JSDoc Interfaces
│   │   ├── App.jsx                     # Application Root & Routing Setup
│   │   └── main.jsx                    # Vite React Mount Point
│   ├── package.json                    # Node Dependencies & Build Scripts
│   ├── vite.config.js                  # Vite Bundler Configuration
│   └── tailwind.config.js              # Tailwind CSS Design System Tokens
│
├── backend/                            # FastAPI Microservices Backend
│   ├── app/
│   │   ├── main.py                     # FastAPI Application Factory & Lifespan
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── weather.py          # Weather Ingestion & Forecast Endpoints
│   │   │   │   ├── flood.py            # Flood Map & Historical Inundation
│   │   │   │   ├── risk.py             # Point & Polygon Risk Evaluation
│   │   │   │   ├── routes.py           # Flood-Aware Safe Route Engine
│   │   │   │   └── alerts.py           # Emergency Notification Broadcasting
│   │   │   └── dependencies.py         # DB Sessions & Security Context
│   │   ├── core/
│   │   │   ├── config.py               # Pydantic Settings & Environment Parsing
│   │   │   └── security.py             # JWT Creation, Password Hashing, RBAC
│   │   ├── models/                     # SQLAlchemy Database Tables
│   │   ├── schemas/                    # Pydantic Request & Response Models
│   │   ├── services/                   # Business Logic & External API Clients
│   │   ├── database/                   # Database Engine & Migration Bindings
│   │   └── utils/                      # GeoJSON Serialization & Geometry Helpers
│   ├── tests/                          # Pytest Suite for API & Logic
│   ├── requirements.txt                # Python Backend Dependencies
│   └── Dockerfile                      # Container Build Definition
│
├── ai/                                 # AI/ML Modeling & Experiments
│   ├── data/
│   │   ├── raw/                        # Unprocessed Training Datasets
│   │   ├── processed/                  # Cleaned Feature Matrices
│   │   └── external/                   # External GIS Ground-Truth Records
│   ├── notebooks/                      # Exploratory Data Analysis & Prototyping
│   ├── preprocessing/
│   │   ├── rainfall.py                 # Precipitation Aggregation Scripts
│   │   ├── elevation.py                # DEM Slope & Inundation Feature Extractor
│   │   └── feature_engineering.py      # Feature Transformation Pipeline
│   ├── models/
│   │   ├── train.py                    # XGBoost Training & K-Fold Cross Validation
│   │   ├── predict.py                  # Real-Time Predictor Interface
│   │   ├── evaluate.py                 # ROC-AUC, Precision/Recall, Brier Score
│   │   └── saved/                      # Serialized Model Weights (.joblib)
│   ├── experiments/                    # Hyperparameter Search & Benchmarks
│   ├── requirements.txt                # ML Specific Dependencies
│   └── README.md                       # ML Modeling Documentation
│
├── gis/                                # Geospatial Assets & Preprocessing
│   ├── shapefiles/                     # Municipal Wards & Catchment Polygons
│   ├── raster/                         # Copernicus DEM 30m Geotiff Rasters
│   ├── geojson/                        # Pre-Rendered Vector Boundaries
│   ├── scripts/                        # Raster Clipping & Zonal Statistics
│   ├── qgis/                           # QGIS Projects & Layer Styling Rules
│   └── README.md                       # GIS Subsystem Documentation
│
├── data-pipeline/                      # Ingestion Workers & Schedulers
│   ├── collectors/
│   │   ├── open_meteo.py               # Weather Polling Client
│   │   ├── osm.py                      # OpenStreetMap Overpass Ingestion
│   │   └── dem.py                      # DEM Tile Retriever
│   ├── processors/                     # Data Cleaning & Spatial Merging
│   ├── validators/                     # Data Hygiene & Schema Verifiers
│   ├── schedulers/                     # Periodic Background Job Definitions
│   └── README.md                       # Ingestion Pipeline Documentation
│
├── simulation/                         # Flood & Rainfall Simulation
│   ├── rainfall/                       # Synthetic Storm Hyetographs
│   ├── flood-model/                    # Simplified Overland Flow Simulator
│   ├── scenarios/                      # Stress-Test Scenarios (Monsoon Peaks)
│   └── README.md                       # Simulation Module Overview
│
├── alerts/                             # Early Warning & Civil Notification
│   ├── notification-service/           # Webhook, Push, and Mock SMS Gateways
│   ├── templates/                      # Multi-Lingual Alert Formats
│   └── README.md                       # Notification System Documentation
│
├── routing/                            # Safe Navigation Engine
│   ├── safe-route/                     # Hazard-Weighted A* & Dijkstra Routing
│   ├── graph/                          # NetworkX & OSMnx Road Graphs
│   └── README.md                       # Safe Routing Technical Notes
│
├── scripts/                            # Operational & Seeding Scripts
│   ├── setup.sh                        # Rapid Development Setup Automation
│   ├── seed_database.py                # Initial Database Seeding
│   └── download_datasets.py            # Open Dataset Downloader
│
└── tests/                              # Monorepo Integration & E2E Tests
    ├── frontend/                       # Vitest / Component Tests
    ├── backend/                        # Pytest API Contract Tests
    ├── ai/                             # Model Regression & Drift Tests
    └── integration/                    # End-to-End Ingestion-to-Map Tests
```

---

## 12. Installation

### 12.1 Prerequisites
* **Git** installed
* **Node.js** (v18.x or higher) and **npm**
* **Python** (v3.10 or v3.11 recommended)
* **GDAL & GEOS** libraries (for geospatial Python packages like GeoPandas)
* *Optional*: Docker & Docker Compose for containerized execution

### 12.2 Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/MrUtkarshsutar/UrabanFlood-AI-.git
cd UrabanFlood-AI-

# 2. Configure Environment Variables
cp .env.example .env

# 3. Create and activate a Python Virtual Environment
python -m venv .venv

# On Linux/macOS:
source .venv/bin/activate

# On Windows (PowerShell):
.\.venv\Scripts\Activate.ps1

# 4. Install Backend Dependencies
pip install --upgrade pip
pip install -r backend/requirements.txt

# 5. Install AI / ML Dependencies
pip install -r ai/requirements.txt

# 6. Install Frontend Dependencies
cd frontend
npm install
cd ..
```

---

## 13. Environment Variables

UrbanFlood AI uses environment variables for clean configuration management across environments. A ready-to-use template is maintained in [`.env.example`](.env.example).

| Variable Name | Description | Default / Example |
| :--- | :--- | :--- |
| `ENVIRONMENT` | Application operational mode | `development` / `production` |
| `DATABASE_URL` | PostgreSQL/PostGIS connection string (or SQLite) | `postgresql+asyncpg://postgres:postgres@localhost:5432/urbanflood_db` |
| `POSTGIS_ENABLED` | Toggle PostGIS geospatial query engine | `true` |
| `OPEN_METEO_BASE_URL` | Base endpoint for weather nowcasting | `https://api.open-meteo.com/v1/forecast` |
| `OSM_OVERPASS_URL` | OpenStreetMap Overpass API gateway | `https://overpass-api.de/api/interpreter` |
| `MODEL_PATH` | Filepath to serialized XGBoost model artifact | `ai/models/saved/xgboost_flood_model_latest.joblib` |
| `SECRET_KEY` | Cryptographic secret for JWT authentication | `secure-random-32-char-string` |
| `VITE_API_BASE_URL` | Backend URL consumed by the React application | `http://localhost:8000/api/v1` |

> [!WARNING]
> Never commit active credentials, production database passwords, or JWT secrets to public repositories. Always maintain secrets securely in hosting environment managers (e.g., Vercel, Render, or Docker secrets).

---

## 14. Running the Project

### Option A: Local Development (Native)

1. **Start the FastAPI Backend Service**:
   ```bash
   # From repository root with virtual environment activated:
   uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   * The API and Swagger documentation will be accessible at: `http://localhost:8000/docs`

2. **Start the React Frontend Application**:
   ```bash
   # Open a new terminal window:
   cd frontend
   npm run dev
   ```
   * The frontend dashboard will launch at: `http://localhost:5173`

### Option B: Containerized Execution (Docker Compose)

```bash
# Launch entire stack (PostGIS, FastAPI, React) via Docker Compose:
docker-compose -f docker-compose.dev.yml up --build
```

---

## 15. API Overview

All routes are served under the versioned prefix `/api/v1`. Detailed schemas are available in [docs/api/api-documentation.md](docs/api/api-documentation.md).

### 1. System Health Check
* **Endpoint**: `GET /health`
* **Status**: **Implemented**
* **Purpose**: Verifies backend service status, database connectivity, and ML model availability.
* **Example Request**: `GET /api/v1/health`
* **Example Response**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-09-19T12:00:00Z",
    "version": "1.0.0",
    "services": {
      "database": "connected",
      "ml_inference": "loaded",
      "weather_pipeline": "active"
    }
  }
  ```

### 2. Meteorological Nowcasting
* **Endpoint**: `GET /weather`
* **Status**: **Implemented**
* **Purpose**: Fetches real-time precipitation, intensity, and next-6h forecast for a latitude/longitude pair.
* **Parameters**: `lat` (float, query), `lng` (float, query)
* **Example Request**: `GET /api/v1/weather?lat=19.0760&lng=72.8777`
* **Example Response**:
  ```json
  {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "current": {
      "precipitation_mm": 38.5,
      "precipitation_intensity_mm_per_hr": 24.2,
      "condition": "Heavy Rain"
    },
    "forecast_next_6h": [
      {"hour": 1, "predicted_rainfall_mm": 22.0},
      {"hour": 2, "predicted_rainfall_mm": 18.5}
    ]
  }
  ```

### 3. Localized Flood Risk Assessment
* **Endpoint**: `GET /flood-risk`
* **Status**: **Implemented**
* **Purpose**: Returns computed flood susceptibility score, risk level, and contributing factor weights.
* **Parameters**: `lat` (float, query), `lng` (float, query)
* **Example Request**: `GET /api/v1/flood-risk?lat=19.0760&lng=72.8777`
* **Example Response**:
  ```json
  {
    "coordinates": {"lat": 19.0760, "lng": 72.8777},
    "risk_score": 0.76,
    "risk_level": "HIGH",
    "advisory": "Hazardous road inundation likely. Low-lying movement discouraged."
  }
  ```

### 4. Dynamic Flood Risk Map
* **Endpoint**: `GET /flood-map`
* **Status**: **Implemented**
* **Purpose**: Streams active flood risk zones as a GeoJSON FeatureCollection.
* **Parameters**: `bbox` (string, optional: `min_lng,min_lat,max_lng,max_lat`), `min_risk` (string, optional)
* **Example Request**: `GET /api/v1/flood-map?min_risk=MODERATE`
* **Example Response**:
  ```json
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[72.85, 19.05], [72.86, 19.05], [72.86, 19.06], [72.85, 19.06], [72.85, 19.05]]]
        },
        "properties": {
          "zone_id": "ZN-401",
          "risk_level": "CRITICAL",
          "risk_score": 0.89,
          "water_depth_cm_est": 45.0
        }
      }
    ]
  }
  ```

### 5. Hazard-Evading Safe Route
* **Endpoint**: `POST /safe-route`
* **Status**: **Implemented**
* **Purpose**: Calculates shortest topological route penalized by predicted inundation zones.
* **Request Body**:
  ```json
  {
    "origin": {"lat": 19.0700, "lng": 72.8700},
    "destination": {"lat": 19.1100, "lng": 72.8900},
    "avoid_risk_levels": ["HIGH", "CRITICAL"]
  }
  ```
* **Example Response**:
  ```json
  {
    "status": "success",
    "route": {
      "distance_meters": 5840,
      "duration_seconds": 960,
      "max_encountered_risk": "MODERATE",
      "geometry": {
        "type": "LineString",
        "coordinates": [[72.8700, 19.0700], [72.8735, 19.0780], [72.8900, 19.1100]]
      }
    },
    "rerouted_due_to_hazard": true
  }
  ```

### 6. Early Warning Civil Alerts
* **Endpoint**: `GET /alerts`
* **Status**: **Implemented**
* **Purpose**: Retrieves active civil flood alerts within a region.
* **Parameters**: `lat` (float, optional), `lng` (float, optional), `status` (string, default: `active`)
* **Example Request**: `GET /api/v1/alerts?lat=19.0760&lng=72.8777`
* **Example Response**:
  ```json
  {
    "count": 1,
    "alerts": [
      {
        "id": "ALT-20260919-002",
        "severity": "CRITICAL",
        "headline": "Severe Inundation Alert: Hindmata Junction",
        "message": "Water accumulation exceeding 40cm. Subway closed. Avoid travel.",
        "issued_at": "2026-09-19T11:45:00Z"
      }
    ]
  }
  ```

### 7. Direct Machine Learning Inference
* **Endpoint**: `POST /prediction`
* **Status**: **Planned / In-Progress**
* **Purpose**: Direct evaluation of arbitrary feature vectors for batch scoring and pipeline auditing.
* **Request Body**:
  ```json
  {
    "rainfall_1h_mm": 42.0,
    "rainfall_3h_mm": 78.5,
    "elevation_m": 6.5,
    "slope_deg": 0.8,
    "distance_to_drain_m": 450.0,
    "impervious_surface_ratio": 0.88
  }
  ```
* **Example Response**:
  ```json
  {
    "flood_probability": 0.824,
    "risk_category": "HIGH",
    "model_version": "1.0.0"
  }
  ```

---

## 16. Flood Risk Levels

UrbanFlood AI categorizes predicted flood risk into four standardized hazard tiers:

| Tier | Category | Risk Score ($P$) | Impact & Physical Manifestation | Recommended Operational Action |
| :---: | :--- | :---: | :--- | :--- |
| 🟢 | **LOW** | $0.00 \le P < 0.30$ | Safe conditions; normal road transit; stormwater drains functioning below capacity. | Normal transit; monitor standard weather advisories. |
| 🟡 | **MODERATE** | $0.30 \le P < 0.60$ | Minor localized pooling in road gutters; slow traffic flow; pedestrian walkways wet. | Exercise caution in depressed underpasses; drive at reduced speeds. |
| 🟠 | **HIGH** | $0.60 \le P < 0.85$ | Substantial water logging (15–30 cm); low-clearance vehicles stalled; basements vulnerable. | Avoid non-essential vehicular movement; activate safe-route bypass. |
| 🔴 | **CRITICAL** | $0.85 \le P \le 1.00$ | Flash flooding (>30 cm); swift overland current; underpasses submerged; electrical hazard. | Immediate evacuation from low-lying areas; seek civic relief shelters. |

> [!IMPORTANT]
> The numerical probability cutoffs above are configurable within model settings and should be calibrated using historical empirical rainfall-inundation curves specific to each municipal watershed.

---

## 17. Offline/Low-Connectivity Strategy

During severe weather events, mobile cellular base stations and power infrastructure frequently suffer degradation. UrbanFlood AI implements a graceful degradation architecture:

```
Cloud / Server Cluster
         ↓ (When connectivity is active)
Periodic Background Data Synchronization
         ↓
Local Device Storage (Service Worker Cache & IndexedDB)
         ↓
Offline Progressive Web App (PWA) Execution
         ├── Cached Vector Risk Basemaps
         ├── Cached Emergency Phone Numbers & Civic Shelters
         └── Local Geolocation Hazard Lookups
```

### 17.1 Client-Side Offline Resilience
* **Service Worker Caching**: All frontend JavaScript, CSS, and base Leaflet map tiles for the selected city are cached locally.
* **IndexedDB Snapshotting**: The most recent valid `/flood-map` GeoJSON payload and active `/alerts` are preserved locally on the client device.
* **Device GPS Independence**: HTML5 Geolocation operates through satellite GNSS signals, enabling users to view their position relative to the cached flood polygon map even when 4G/5G internet is intermittent.

### 17.2 Future Integration Possibilities (Planned)
* **SMS & Cell Broadcast**: Integration with government emergency broadcasting for zero-data push delivery.
* **LoRaWAN Meshes**: Hyper-localized solar-powered community gateways relaying water-level telemetry to edge display boards.
* **Community Offline Kiosks**: Raspberry Pi-based local Wi-Fi captive portals installed at designated disaster relief shelters.

---

## 18. Security

UrbanFlood AI adheres to modern security and data protection standards:

* **Environment Variable Isolation**: Zero secrets, database passwords, or private tokens committed to version control; strict enforcement of `.gitignore` and `.env.example`.
* **Robust Input Validation**: Strict validation on all incoming query and body parameters via Pydantic schemas, mitigating injection vectors.
* **API Rate Limiting**: Middleware-level throttling to prevent Denial-of-Service (DoS) abuse on public weather and routing endpoints.
* **CORS Whitelisting**: Granular Cross-Origin Resource Sharing restricting production API access strictly to designated frontend domains.
* **Administrative Role-Based Access Control (RBAC)**: JSON Web Token (JWT) Bearer authentication safeguarding alert broadcasting, manual model triggers, and data ingestion endpoints.
* **Zero PII Storage**: Citizen location queries are processed in-memory for immediate routing/risk calculations and are not persisted to database logs.

---

## 19. Testing

The repository incorporates automated testing suites across each tier:

* **Frontend Unit & Component Testing**: Vitest and React Testing Library verifying UI state updates, map layer mounting, and offline fallback rendering.
  ```bash
  cd frontend && npm run test
  ```
* **Backend API Integration Testing**: Pytest testing REST endpoints, schema validation, and database queries.
  ```bash
  pytest backend/tests/
  ```
* **AI/ML Model Validation**: Regression tests verifying deterministic output ranges ($0.0 \le P \le 1.0$) and preventing feature drift.
  ```bash
  python ai/models/evaluate.py --data ai/data/processed/test_features.csv
  ```
* **GIS Layer Sanitization**: Automated validation confirming all published GeoJSON polygons adhere to valid WGS84 coordinates without topology self-intersections.

---

## 20. Future Scope

The UrbanFlood AI roadmap envisions several modular expansions:

* **IoT Water-Level Sensor Networks**: Real-time ultrasonic and pressure-transducer telemetry deployed in chronic stormwater drains to provide continuous ground-truth calibration.
* **Edge AI Deployments**: Lightweight ONNX runtime execution on Raspberry Pi edge nodes installed at critical city underpasses.
* **SMS & National Cell Broadcast Integration**: Direct gateway linkage with national disaster management authorities for localized alert broadcasting.
* **LoRaWAN Community Sensing**: Resilient, long-range, low-power telemetry transmission bypassing commercial cellular networks during disasters.
* **Satellite Synthetic Aperture Radar (SAR)**: Automated ingestion of Sentinel-1 radar imagery for post-storm flood inundation footprint verification.
* **Physics-Informed Neural Networks (PINNs)**: Combining Saint-Venant hydraulic shallow-water equations with deep learning for ultra-fast, hydrodynamically consistent inundation mapping.
* **Multi-City Federation**: Generalizing the spatial data ingestion pipeline to seamlessly ingest arbitrary municipal boundaries across global regions.

---

## 21. Team

| Team Member | Functional Domain & Role |
| :--- | :--- |
| **Member 1** | AI / Machine Learning Lead |
| **Member 2** | Backend Services & API Engineer |
| **Member 3** | Frontend Web & Mobile Lead |
| **Member 4** | GIS & Geospatial Analyst |
| **Member 5** | Data Pipeline & Ingestion Engineer |
| **Member 6** | DevOps & Cloud Infrastructure |
| **Member 7** | UI/UX & Accessible Design Specialist |
| **Member 8** | Hydrology & Urban Research Lead |
| **Member 9** | System Integration & QA Engineer |

---

## 22. Contribution

Contributions from the urban planning, open-source geospatial, and software engineering communities are warmly welcomed.

1. **Fork** the repository on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/dynamic-route-penalty
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat(routing): incorporate elevation slope penalty into A* cost"
   ```
4. **Push to Your Branch**:
   ```bash
   git push origin feature/dynamic-route-penalty
   ```
5. **Open a Pull Request** detailing your changes, context, and test verification results.

---

## 23. License

This project is licensed under the terms of the **MIT License**. See the [LICENSE](LICENSE) file for complete details.

---

## 24. References

1. **Beven, K. J., & Kirkby, M. J. (1979).** *A physically based, variable contributing area model of basin hydrology.* Hydrological Sciences Bulletin, 24(1), 43-69.
2. **Chen, T., & Guestrin, C. (2016).** *XGBoost: A Scalable Tree Boosting System.* In Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (pp. 785-794).
3. **Boeing, G. (2017).** *OSMnx: New methods for acquiring, constructing, analyzing, and visualizing complex street networks.* Computers, Environment and Urban Systems, 65, 126-139.
4. **European Space Agency (ESA).** *Copernicus Global Digital Elevation Model (GLO-30).* [https://spacedata.copernicus.eu/](https://spacedata.copernicus.eu/)
5. **Open-Meteo Documentation.** *Free Weather API for Non-Commercial & Open Source Projects.* [https://open-meteo.com/](https://open-meteo.com/)
6. **World Meteorological Organization (WMO).** *Guidelines on Nowcasting Techniques for Extreme Weather Events.* WMO-No. 1198.