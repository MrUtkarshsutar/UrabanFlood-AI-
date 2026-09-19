# Working Workflow - UrbanFlood AI

## 1. System Operational Workflow

UrbanFlood AI functions as an event-driven and schedule-driven system designed to automate the early-warning and evacuation lifecycle.

```mermaid
flowchart TD
    Start([System Active / Scheduled Poll]) --> S1[Fetch Real-Time & Forecast Precipitation]
    S1 --> S2[Lookup Spatial Context: Elevation, Slope, Drainage Buffer]
    S2 --> S3[Construct Geospatial Feature Vectors per Grid Cell]
    S3 --> S4[Run ML Model: Predict Flood Probability]
    S4 --> S5{Evaluate Against Risk Thresholds}
    
    S5 -- "Probability < 0.30" --> Low[LOW RISK: Safe Green Zone]
    S5 -- "0.30 <= Prob < 0.60" --> Mod[MODERATE RISK: Water Logging Advisory]
    S5 -- "0.60 <= Prob < 0.85" --> High[HIGH RISK: Inundation Warning]
    S5 -- "Prob >= 0.85" --> Crit[CRITICAL RISK: Flash Flood Flash Alert]

    Low --> UpdateMap[Update Dynamic Map Layers]
    Mod --> UpdateMap
    High --> TriggerAlerts[Generate Early Warning Alerts]
    Crit --> TriggerAlerts
    TriggerAlerts --> UpdateMap

    UpdateMap --> Routing[Penalize Inundated Road Segments in Routing Graph]
    Routing --> DeliverClient[Deliver Updates to Citizen & Admin Dashboards]
    DeliverClient --> CachePWA[Cache Risk Snapshot for Offline PWA Access]
```

---

## 2. User Journey Scenarios

### 2.1 Citizen User
1. **Access**: Citizen opens web application on mobile or desktop (PWA).
2. **Geolocate**: System detects current location or accepts manual search.
3. **Hazard Perception**: Map displays color-coded hazard zones with clear rainfall and water-logging indicators.
4. **Evacuation & Navigation**: Citizen enters destination (e.g., home or emergency shelter). The routing engine calculates the path that completely circumvents High and Critical zones, preferring high-elevation roads.
5. **Offline Mode**: If network connectivity drops, the application displays the latest cached risk map, emergency telephone hotlines, and offline guidance.

### 2.2 Municipal / Disaster Management Admin
1. **Command View**: Real-time multi-ward overview with aggregate high-risk metrics.
2. **Alert Management**: Ability to draft, review, and broadcast localized push notifications and alerts.
3. **Infrastructure Monitoring**: Tracking critical infrastructure (hospitals, power substations, fire stations) intersecting predicted flood polygons.
