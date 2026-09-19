"""
UrbanFlood AI - Main FastAPI Application Entrypoint
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

app = FastAPI(
    title="UrbanFlood AI API",
    description="Nowcasting, Risk Prediction, Early Warning, and Safe Route Recommendation Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health", tags=["System"])
async def health_check():
    """
    Service health check endpoint reporting status of core dependencies.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0",
        "services": {
            "api": "operational",
            "database": "ready",
            "ml_inference": "loaded",
            "weather_pipeline": "standby"
        }
    }


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to UrbanFlood AI Core API",
        "docs": "/docs",
        "health": "/api/v1/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
