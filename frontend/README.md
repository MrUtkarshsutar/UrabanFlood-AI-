# UrbanFlood AI — Production React Frontend

> **Smart India Hackathon (SIH) Platform for Urban Flood Nowcasting, Hazard Analysis, and Emergency Response**

---

## 1. Project Overview

**UrbanFlood AI** is a production-grade, disaster-management decision support interface engineered for rapid hydrological hazard perception, 0–60 minute flood nowcasting, dynamic hazard-evading evacuation routing, and citizen incident crowdsourcing.

Initially operating in **SIH Live Presentation Demo Mode** via calibrated simulation layers (Pune / Mula-Mutha river basin), the frontend is architecturally decoupled to transition directly to real FastAPI backend endpoints (`/api/v1/*`), PostGIS databases, and machine-learning inference pipelines without requiring any UI code rewrites.

---

## 2. Key Features

- **Executive Disaster Command Dashboard**:
  - Live urban basin hazard index (Low, Moderate, High, Critical) with animated gauge.
  - Telemetry cards for precipitation intensity (mm/hr), Bund Garden river stage (m vs 2.80m danger mark), active broadcast alerts, and shelter occupancy.
  - Embedded interactive geospatial map with layer filters.
  - Active high-priority emergency notices and quick safe evacuation launcher.
- **Geospatial Tactical Inundation Map (`/map`)**:
  - Interactive Leaflet map with CartoDB Dark tactical tiles.
  - Color-coded flood risk zone polygons (`LOW`: green, `MODERATE`: amber, `HIGH`: orange, `CRITICAL`: red).
  - Water-level telemetry markers (ultrasonic river gauges & automated weather stations).
  - Emergency relief shelter pins with capacity statistics.
  - Community incident pins with water depth tags.
  - Ward inspection drawer with elevation, drainage congestion, and vulnerable junctions.
- **Flood Nowcasting Engine (`/nowcasting`)**:
  - 0–60 minute predictive horizon at 15-minute intervals (+0m, +15m, +30m, +45m, +60m).
  - Dual-axis Recharts visualization: Rainfall intensity (mm/hr) vs Bund Garden river level (m) with danger threshold benchmark.
  - Interactive timeline scrubber with instant metric projection.
  - Ward-by-ward predictive inundation depth matrix.
  - AI confidence indicator (94.2% XGBoost + 2D Hydraulic Overland Flow ensemble).
- **Early Warning Alerts Center (`/alerts`)**:
  - Severity filters (`CRITICAL`, `HIGH`, `MODERATE`, `LOW`) and multi-attribute search.
  - Actionable advice, avoided flooded roads list, and one-click routing to the nearest relief center.
  - Audio emergency siren synthesizer using the Web Audio API for live hackathon demonstrations.
- **Flood-Aware Safe Evacuation Routing (`/safe-route`)**:
  - Origin & destination selector across Pune municipal wards and shelters.
  - Multi-modal support (Driving, Walking, Emergency Rescue Vehicle).
  - Dynamic path comparison:
    - **Hazardous Path (Red)**: Avoided because River Bed Road is inundated up to 45cm.
    - **AI Recommended Safe Route (Cyan)**: Diverts via high-elevation FC Road ridge with 0% flood exposure.
  - Turn-by-turn guidance with distance, road type, and clearance status per segment.
- **Emergency Relief Shelters Directory (`/shelters`)**:
  - Live shelter occupancy meters (available beds vs total capacity).
  - Status indicators (`AVAILABLE`, `LIMITED`, `FULL`, `CLOSED`).
  - Emergency amenity badges (Medical Camp, Drinking Water, Food Rations, Power Backup, Child Care, Pet Safe).
  - Direct "Route Here" navigation trigger.
- **Crowdsourced Incident Reporting (`/incidents`)**:
  - Citizen report form with water depth slider, hazard categories, photo attachments, and location tagging.
  - Ground reality community feed with upvoting and verification badges.
  - Fully functional in offline mode with automatic synchronization upon network reconnection.
- **Offline & Low-Network Resilience**:
  - Automatic connectivity monitoring via `useOnlineStatus`.
  - Manual "Simulate Offline Mode" toggle in the top navbar for presentation demonstrations.
  - Persistent snapshot caching in `localStorage`.
  - Persistent offline banner displaying the last synchronized timestamp.
- **SIH Live Presentation Controller**:
  - 4-stage deterministic simulation stepper (`NORMAL` → `HEAVY_RAIN` → `FLOOD_RISK` → `CRITICAL`).
  - Seamlessly updates all dashboard gauges, map polygons, charts, alerts, and routes in real-time.

---

## 3. Technology Stack

- **Core**: React 18, Vite 5, JavaScript (ESModules)
- **Styling**: Tailwind CSS 3 with custom tactical dark palette (`slate-950`, `slate-900`) and glowing hazard tokens
- **Routing**: React Router 6 (SPA with `vercel.json` rewrite configuration)
- **Mapping**: Leaflet 1.9 & React Leaflet 4 with custom SVG HTML DivIcons
- **Charts**: Recharts 2
- **Icons**: Lucide React
- **HTTP Transport**: Axios (with centralized interceptors and base URL)

---

## 4. Folder Structure

```
frontend/
├── public/
│   ├── logo.svg
│   └── ...
├── src/
│   ├── components/
│   │   ├── alerts/          # AlertCard, AlertFilterBar
│   │   ├── charts/          # NowcastChart, Recharts visualizations
│   │   ├── common/          # Badge, Button, Card, OfflineBanner, LoadingState
│   │   ├── dashboard/       # RiskOverview, MetricCard, WaterLevelGauge, WeatherCard, SystemStatusWidget
│   │   ├── incidents/       # IncidentReportForm, IncidentFeedCard
│   │   ├── map/             # FloodMap, MapLegend, MapLayerControls
│   │   ├── navigation/      # TopNavbar, Sidebar, MobileNav, SimulationControls
│   │   └── shelters/        # ShelterCard, ShelterCapacityBar
│   ├── context/
│   │   ├── SimulationContext.jsx  # Scenario state & live telemetry
│   │   └── IncidentContext.jsx    # Citizen incident state & persistence
│   ├── data/
│   │   ├── demoScenario.js  # 4-stage simulation triggers & dynamic alerts
│   │   ├── forecasts.js     # 0–60 min nowcasting time-series
│   │   ├── incidents.js     # Community hazard reports
│   │   ├── sensors.js       # Ultrasonic river gauges & AWS stations
│   │   ├── shelters.js      # Relief camp registry
│   │   └── zones.js         # Pune ward GeoJSON boundary polygons & topography
│   ├── hooks/
│   │   ├── useAlerts.js
│   │   ├── useFloodData.js
│   │   ├── useOnlineStatus.js
│   │   ├── useShelters.js
│   │   └── useWeather.js
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Alerts.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Incidents.jsx
│   │   ├── LiveMap.jsx
│   │   ├── Nowcasting.jsx
│   │   ├── SafeRoute.jsx
│   │   └── Shelters.jsx
│   ├── services/
│   │   ├── api.js           # Axios instance
│   │   ├── mockService.js   # Client-side simulation service matching backend schemas
│   │   ├── floodService.js  # Flood risk and map data service
│   │   ├── weatherService.js
│   │   ├── alertService.js
│   │   ├── routingService.js # Hazard-evading routing calculation
│   │   └── shelterService.js
│   ├── utils/
│   │   ├── constants.js     # Risk tokens, scenario definitions, nav links
│   │   ├── formatters.js    # Date, distance, and water level formatters
│   │   ├── riskCalculator.js# Deterministic risk engine
│   │   └── storage.js       # LocalStorage snapshot & offline queue manager
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── .env.example
```

---

## 5. Getting Started

### Prerequisites
- Node.js 18+ and npm installed

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
```
The application will start at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
The production bundle will be generated in `dist/`.

---

## 6. Environment Variables

Create `.env` based on `.env.example`:

```env
# Backend API Base URL (FastAPI)
VITE_API_BASE_URL=http://localhost:8000

# Demo Mode Switch (true = simulated SIH demo layer; false = live backend REST APIs)
VITE_DEMO_MODE=true

# Default Map Centroid (Pune Metropolitan Area)
VITE_MAP_DEFAULT_LAT=18.5204
VITE_MAP_DEFAULT_LNG=73.8567
VITE_MAP_DEFAULT_ZOOM=13
```

---

## 7. SIH 3–5 Minute Presentation Flow

Follow this structured script during hackathon evaluations:

1. **Step 1: Dashboard Overview (`/`)**:
   - Show initial baseline: **Normal Monsoon** (18 mm/hr rain, 1.2m water level, Low Risk, green indicators).
   - Point out Bund Garden river gauge, active telemetry sensors (98.4% uptime), and zero flooded roads.
2. **Step 2: Live Tactical Map (`/map`)**:
   - Inspect Pune Mula-Mutha river basin. Toggle map layers (Risk zones, ultrasonic sensors, emergency shelters, citizen incident pins). Click on a zone to inspect ground elevation and drainage congestion.
3. **Step 3: Nowcasting (`/nowcasting`)**:
   - Highlight the 0–60 min prediction window. Use the interactive time scrubber (+15m, +30m, +45m, +60m) to explain how ML anticipates peak inundation before it reaches citizen doorsteps.
4. **Step 4: Trigger Simulation Escalation**:
   - Click **"Heavy Rain"** in the top simulation controller bar (Rain increases to 48 mm/hr, Water level to 1.9m, Warning issued).
   - Click **"Critical Warning"** (Cloudburst: 105 mm/hr, Water level breaches 2.80m danger mark to 3.15m!).
   - Watch the entire UI dynamically respond:
     - Dashboard risk gauge flashes RED (`CRITICAL`).
     - Map polygons turn crimson.
     - Early warning sirens activate.
5. **Step 5: Safe Route Navigation (`/safe-route`)**:
   - Demonstrate flood-aware routing from Deccan Gymkhana to Balgandharva Shelter.
   - Show how the algorithm detects that the low-lying River Bed Road is submerged by 45cm and automatically re-routes traffic via the high-elevation FC Road corridor.
6. **Step 6: Emergency Shelters (`/shelters`)**:
   - Show live capacity meters, amenities (medical units, drinking water, backup generators), and remaining available beds.
7. **Step 7: Citizen Incident Reporting (`/incidents`)**:
   - Submit a ground report for waterlogging. Confirm it immediately appears in the community feed with depth tagging.
8. **Step 8: Offline / Disaster Resilience**:
   - Click **"Online (Simulate Offline)"** in the top navbar.
   - Show the persistent **OFFLINE MODE** banner. Verify that maps, emergency shelter locations, and evacuation routes remain 100% accessible via local storage caching.

---

## 8. Backend REST API Integration

When ready to switch from simulated mock data to the live FastAPI backend:

1. Set `VITE_DEMO_MODE=false` in `.env`.
2. Start the FastAPI backend on port 8000.
3. All service methods in `src/services/` seamlessly direct requests to:
   - `GET /api/v1/health`
   - `GET /api/v1/weather?lat=...&lng=...`
   - `GET /api/v1/flood-risk`
   - `GET /api/v1/flood-map` (GeoJSON FeatureCollection)
   - `POST /api/v1/safe-route` (A* dynamic routing)
   - `GET /api/v1/alerts`
4. The React components require **zero alterations** because all data contracts strictly match `docs/api/api-documentation.md`.

---

## 9. Vercel Deployment

The project is pre-configured for instant Vercel deployment:

1. Set Root Directory to `frontend`.
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. `vercel.json` contains the SPA rewrite rules so client-side routes (`/map`, `/alerts`, `/nowcasting`) do not return 404 upon browser refresh.
