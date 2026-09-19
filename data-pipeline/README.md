# Data Pipeline Subsystem - UrbanFlood AI

The data pipeline manages automated ingestion, cleaning, validation, and scheduled dispatch of meteorological and geospatial records.

## Subdirectories
- `collectors/`:
  - `open_meteo.py`: Polls Open-Meteo REST API for precipitation and short-range forecast.
  - `osm.py`: Extracts highway segments and drainage infrastructure via Overpass API.
  - `dem.py`: Downloads and clips Copernicus 30m DEM elevation tiles for the target region.
- `processors/`: Data transformation, normalization, and spatial joining scripts.
- `validators/`: Data hygiene and schema sanity checks to detect missing or corrupted telemetry.
- `schedulers/`: Cron jobs or Celery/APScheduler tasks maintaining continuous data synchronization.
