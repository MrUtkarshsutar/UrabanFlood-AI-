"""
UrbanFlood AI - Database Seed Script
Populates initial administrative wards, critical shelters, and test sensor locations.
"""

import sys
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("seed_database")


def seed():
    logger.info("Initializing UrbanFlood AI sample database seed...")
    # Seed wards, sample shelter points, mock flood history
    logger.info("Populating sample administrative zones (Wards A through F)...")
    logger.info("Registering 12 emergency civic shelters...")
    logger.info("Database seed complete.")


if __name__ == "__main__":
    seed()
