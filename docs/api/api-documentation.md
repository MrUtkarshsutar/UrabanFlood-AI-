# API Documentation - UrbanFlood AI

All API routes are served under the versioned prefix `/api/v1`.

---

## 1. System Health & Diagnostics

### `GET /health`
- **Purpose**: Verify backend service status, database connectivity, and model availability.
- **Method**: `GET`
- **Authentication**: None
- **Parameters**: None
- **Example Request**:
  ```http
  GET /api/v1/health HTTP/1.1
  Host: api.urbanflood.ai
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-09-19T12:00:00Z",
    "version": "1.0.0",
    "services": {
      "database": "connected",
      "ml_model": "loaded",
      "weather_pipeline": "active"
    }
  }
  ```

---

## 2. Weather Nowcasting

### `GET /weather`
- **Purpose**: Retrieve current meteorological conditions and precipitation forecast for a location.
- **Method**: `GET`
- **Authentication**: None
- **Query Parameters**:
  - `lat` (float, required): Latitude in decimal degrees (e.g. `19.0760`)
  - `lng` (float, required): Longitude in decimal degrees (e.g. `72.8777`)
- **Example Request**:
  ```http
  GET /api/v1/weather?lat=19.0760&lng=72.8777 HTTP/1.1
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "current": {
      "precipitation_mm": 38.5,
      "precipitation_intensity_mm_per_hr": 24.2,
      "temperature_celsius": 28.4,
      "humidity_percent": 94,
      "condition": "Heavy Rain"
    },
    "forecast_next_6h": [
      {"hour": 1, "predicted_rainfall_mm": 22.0},
      {"hour": 2, "predicted_rainfall_mm": 18.5},
      {"hour": 3, "predicted_rainfall_mm": 9.0},
      {"hour": 4, "predicted_rainfall_mm": 4.2},
      {"hour": 5, "predicted_rainfall_mm": 2.0},
      {"hour": 6, "predicted_rainfall_mm": 1.0}
    ]
  }
  ```

---

## 3. Flood Risk Analysis

### `GET /flood-risk`
- **Purpose**: Get localized flood risk score, hazard level, and contributing factors for a single point.
- **Method**: `GET`
- **Authentication**: None
- **Query Parameters**:
  - `lat` (float, required): Latitude
  - `lng` (float, required): Longitude
- **Example Request**:
  ```http
  GET /api/v1/flood-risk?lat=19.0760&lng=72.8777 HTTP/1.1
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "coordinates": {"lat": 19.0760, "lng": 72.8777},
    "risk_score": 0.76,
    "risk_level": "HIGH",
    "risk_color": "#ea580c",
    "factors": {
      "rainfall_intensity_score": 0.85,
      "elevation_meters": 8.2,
      "slope_degrees": 1.1,
      "distance_to_drain_meters": 320.0,
      "drainage_congestion_index": 0.72
    },
    "advisory": "Hazardous road inundation likely. Pedestrian and low-vehicle movement discouraged."
  }
  ```

---

## 4. Flood Risk Geospatial Map

### `GET /flood-map`
- **Purpose**: Return active flood risk zones formatted as a GeoJSON FeatureCollection.
- **Method**: `GET`
- **Authentication**: None
- **Query Parameters**:
  - `bbox` (string, optional): Bounding box `min_lng,min_lat,max_lng,max_lat`
  - `min_risk` (string, optional): Filter by minimum risk (`LOW`, `MODERATE`, `HIGH`, `CRITICAL`)
- **Example Request**:
  ```http
  GET /api/v1/flood-map?bbox=72.82,18.98,72.95,19.15&min_risk=MODERATE HTTP/1.1
  ```
- **Example Response (200 OK)**:
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
          "ward": "F-North",
          "risk_level": "CRITICAL",
          "risk_score": 0.89,
          "water_depth_cm_est": 45.0,
          "updated_at": "2026-09-19T12:15:00Z"
        }
      }
    ]
  }
  ```

---

## 5. Safe Route Recommendation

### `POST /safe-route`
- **Purpose**: Calculate hazard-evading navigation routes avoiding inundated and high-risk zones.
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "origin": {"lat": 19.0700, "lng": 72.8700},
    "destination": {"lat": 19.1100, "lng": 72.8900},
    "mode": "driving",
    "avoid_risk_levels": ["HIGH", "CRITICAL"]
  }
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "status": "success",
    "route": {
      "distance_meters": 5840,
      "duration_seconds": 960,
      "max_encountered_risk": "MODERATE",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [72.8700, 19.0700],
          [72.8735, 19.0780],
          [72.8820, 19.0950],
          [72.8900, 19.1100]
        ]
      },
      "segments": [
        {"instruction": "Head north on Elevated Expressway", "risk": "LOW", "distance_m": 2300},
        {"instruction": "Turn right onto Ridge Road", "risk": "MODERATE", "distance_m": 3540}
      ]
    },
    "rerouted_due_to_hazard": true
  }
  ```

---

## 6. Early Warning Alerts

### `GET /alerts`
- **Purpose**: Fetch active municipal and hyper-local flood alerts and advisories.
- **Method**: `GET`
- **Authentication**: None
- **Query Parameters**:
  - `lat` (float, optional): Filter alerts targeting proximity to latitude
  - `lng` (float, optional): Filter alerts targeting proximity to longitude
  - `status` (string, optional): `active` or `resolved` (default: `active`)
- **Example Request**:
  ```http
  GET /api/v1/alerts?lat=19.0760&lng=72.8777 HTTP/1.1
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "count": 1,
    "alerts": [
      {
        "id": "ALT-20260919-002",
        "severity": "CRITICAL",
        "headline": "Severe Inundation Alert: Hindmata & Gandhi Market Junctions",
        "message": "Water accumulation exceeding 40cm. Subway closed. Avoid all non-emergency travel.",
        "issued_at": "2026-09-19T11:45:00Z",
        "expires_at": "2026-09-19T15:00:00Z",
        "affected_zones": ["ZN-401", "ZN-405"],
        "emergency_shelter": {
          "name": "Community Civic Center Ward F",
          "distance_km": 1.2,
          "contact": "+91-22-2410-0000"
        }
      }
    ]
  }
  ```

---

## 7. Model Direct Inference

### `POST /prediction`
- **Purpose**: Run direct tabular feature vector through the machine learning model.
- **Method**: `POST`
- **Authentication**: Bearer Token (Admin / Data Pipeline)
- **Request Body**:
  ```json
  {
    "rainfall_1h_mm": 42.0,
    "rainfall_3h_mm": 78.5,
    "rainfall_24h_mm": 130.0,
    "elevation_m": 6.5,
    "slope_deg": 0.8,
    "distance_to_drain_m": 450.0,
    "impervious_surface_ratio": 0.88,
    "historical_flood_count": 5
  }
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "flood_probability": 0.824,
    "risk_category": "HIGH",
    "feature_importances": {
      "rainfall_1h_mm": 0.41,
      "elevation_m": 0.28,
      "distance_to_drain_m": 0.18,
      "impervious_surface_ratio": 0.13
    },
    "model_version": "1.0.0"
  }
  ```
