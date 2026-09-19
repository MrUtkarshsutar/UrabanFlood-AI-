"""
UrbanFlood AI - Open Dataset Downloader Helper
Downloads sample DEM boundaries, historical flood shapefiles, and mock rainfall logs.
"""

import os
import sys
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("download_datasets")


def download_sample_data():
    logger.info("Checking target storage directories...")
    os.makedirs("ai/data/raw", exist_ok=True)
    os.makedirs("gis/raster", exist_ok=True)
    os.makedirs("gis/shapefiles", exist_ok=True)

    logger.info("Datasets directory configured. Use Copernicus DEM API and Open-Meteo archive for localized tile downloads.")


if __name__ == "__main__":
    download_sample_data()
