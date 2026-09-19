$dirs = @(
    "docs/diagrams",
    "frontend/public",
    "frontend/src/assets",
    "frontend/src/components",
    "frontend/src/pages",
    "frontend/src/layouts",
    "frontend/src/hooks",
    "frontend/src/services",
    "frontend/src/context",
    "frontend/src/utils",
    "frontend/src/constants",
    "frontend/src/types",
    "backend/app/api/routes",
    "backend/app/core",
    "backend/app/models",
    "backend/app/schemas",
    "backend/app/services",
    "backend/app/database",
    "backend/app/utils",
    "backend/tests",
    "ai/data/raw",
    "ai/data/processed",
    "ai/data/external",
    "ai/notebooks",
    "ai/preprocessing",
    "ai/models/saved",
    "ai/experiments",
    "gis/shapefiles",
    "gis/raster",
    "gis/geojson",
    "gis/scripts",
    "gis/qgis",
    "data-pipeline/collectors",
    "data-pipeline/processors",
    "data-pipeline/validators",
    "data-pipeline/schedulers",
    "simulation/rainfall",
    "simulation/flood-model",
    "simulation/scenarios",
    "alerts/notification-service",
    "alerts/templates",
    "routing/safe-route",
    "routing/graph",
    "tests/frontend",
    "tests/backend",
    "tests/ai",
    "tests/integration"
)

foreach ($d in $dirs) {
    if (-not (Test-Path $d)) {
        New-Item -ItemType Directory -Path $d -Force | Out-Null
    }
    $f = Join-Path $d ".gitkeep"
    if (-not (Test-Path $f)) {
        New-Item -ItemType File -Path $f -Force | Out-Null
    }
}
Write-Host "All .gitkeep files created successfully."
