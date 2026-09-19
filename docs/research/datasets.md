# Datasets and External Sources - UrbanFlood AI

UrbanFlood AI is architected around free-tier, open-access, and open-source geospatial and meteorological datasets.

---

## 1. Primary Dataset Inventory

| Dataset / Source | Provider | Resolution / Coverage | Update Frequency | Purpose in System | Official Resource Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Open-Meteo Weather API** | Open-Meteo | ~1km to 11km Global | Hourly & 15-min updates | Real-time precipitation, intensity, temperature, wind, and short-term forecast | [open-meteo.com](https://open-meteo.com/) |
| **Copernicus GLO-30 DEM** | European Space Agency (ESA) | 30-meter Global | Static (2020 baseline) | Elevation contours, slope calculations, aspect, depression filling, and watershed delineation | [copernicus.eu](https://spacedata.copernicus.eu/) |
| **OpenStreetMap (OSM)** | OpenStreetMap Foundation | Vector (Streets, Waterways, Buildings) | Community Real-time | Road network graph extraction for routing, drainage channels, building footprints | [openstreetmap.org](https://www.openstreetmap.org/) |
| **NASA SRTM DEM (Alternative)** | NASA / USGS | 30-meter / 90-meter | Static baseline | Secondary benchmark for terrain comparison | [earthdata.nasa.gov](https://www.earthdata.nasa.gov/) |
| **Dartmouth Flood Observatory / Historical Records** | University of Colorado / Local Municipal Data | Tabular event logs & polygons | Historical (1985–present) | Ground-truth labels for training and calibrating supervised flood susceptibility models | [floodobservatory.colorado.edu](https://floodobservatory.colorado.edu/) |
| **Municipal GIS Portals (Open Data)** | City Municipal Corporations (e.g. MCGM, BBMP) | Ward-level shapefiles | Periodic | Administrative boundaries, storm drain networks, and marked historical chronic spots | Municipal Open Data Portals |
| **IoT Water Level Sensors** | Planned Future Ingestion | Point sensors in storm drains | Real-time (1-5 min) | Ultra-localized validation and real-time water depth ground truthing | Open Hardware / MQTT Broker |

---

## 2. Feature Extraction Schema

From these primary layers, the data pipeline derives the following ML feature vector:

1. **`rainfall_1h`** (mm): Cumulative rainfall recorded over the preceding 60 minutes.
2. **`rainfall_3h`** (mm): Short-term cumulative precipitation indicating ground saturation.
3. **`rainfall_intensity`** (mm/hr): Peak rate of precipitation observed during the current hour.
4. **`elevation`** (meters): Orthometric height above mean sea level extracted from the DEM.
5. **`slope`** (degrees): Topographic gradient; lower slopes inhibit natural gravitational runoff.
6. **`distance_to_drain`** (meters): Euclidean or network distance to the nearest mapped stormwater canal or culvert.
7. **`impervious_surface_ratio`** (0.0 to 1.0): Estimated fraction of ground covered by paved roads or building structures.
8. **`flow_accumulation`**: Upstream contributing drainage cell count derived from hydrological D8 flow direction algorithms.
