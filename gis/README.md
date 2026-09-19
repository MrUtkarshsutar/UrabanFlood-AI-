# GIS & Spatial Subsystem - UrbanFlood AI

The GIS subsystem handles spatial data management, vector layers, Digital Elevation Models (DEMs), and map tiling preparation.

## Subdirectories
- `shapefiles/`: Administrative ward polygons, water body boundaries, and drainage network layers.
- `raster/`: Copernicus DEM 30m tiles, derived slope maps, and flow direction rasters.
- `geojson/`: Lightweight GeoJSON layers served directly to the frontend Leaflet maps.
- `scripts/`: Python utilities using GeoPandas and Rasterio to clip rasters, calculate zonal statistics, and generate contour vectors.
- `qgis/`: QGIS project templates (`.qgz`) and layer styling files (`.qml`) used for visual inspection and cartographic validation.
