import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { RISK_CONFIG } from '../../utils/constants';
import MapLegend from './MapLegend';
import MapLayerControls from './MapLayerControls';
import { formatWaterLevel, formatDistance } from '../../utils/formatters';

// Center updater helper component
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// Custom DivIcons for modern sleek markers
const createCustomIcon = (type, color, label = '') => {
  let iconHtml = '';
  
  if (type === 'shelter') {
    iconHtml = `
      <div style="background: #2563eb; color: white; border: 2px solid #60a5fa; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(37,99,235,0.6); font-size: 14px; font-weight: bold;">
        🏠
      </div>
    `;
  } else if (type === 'sensor') {
    iconHtml = `
      <div style="background: #0891b2; color: white; border: 2px solid #22d3ee; border-radius: 9999px; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(8,145,178,0.6); font-size: 12px;">
        🌊
      </div>
    `;
  } else if (type === 'incident') {
    iconHtml = `
      <div style="background: #ea580c; color: white; border: 2px solid #fb923c; border-radius: 9999px; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(234,88,12,0.6); font-size: 12px;">
        ⚠️
      </div>
    `;
  } else if (type === 'origin') {
    iconHtml = `
      <div style="background: #10b981; color: white; border: 2px solid white; border-radius: 9999px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(16,185,129,0.7);">
        📍
      </div>
    `;
  } else if (type === 'destination') {
    iconHtml = `
      <div style="background: #3b82f6; color: white; border: 2px solid white; border-radius: 9999px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(59,130,246,0.7);">
        🏁
      </div>
    `;
  }

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-div-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

export const FloodMap = ({
  center = [18.5204, 73.8567],
  zoom = 13,
  height = '560px',
  zones = [],
  shelters = [],
  sensors = [],
  incidents = [],
  safeRoute = null,
  hazardousRoute = null,
  onSelectZone,
  showControls = true,
  showLegend = true,
}) => {
  const [layers, setLayers] = useState({
    zones: true,
    shelters: true,
    sensors: true,
    incidents: true,
  });

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl z-0" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', backgroundColor: '#020617' }}
      >
        <ChangeView center={center} zoom={zoom} />

        {/* CartoDB Dark Matter Tactical Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* 1. Flood Risk Polygons */}
        {layers.zones &&
          zones.map((zone) => {
            const cfg = RISK_CONFIG[zone.riskLevel] || RISK_CONFIG.LOW;
            const isCritical = zone.riskLevel === 'CRITICAL';
            const isHigh = zone.riskLevel === 'HIGH';

            return (
              <Polygon
                key={zone.id}
                positions={zone.boundary}
                pathOptions={{
                  color: cfg.color,
                  weight: isCritical ? 3 : isHigh ? 2.5 : 1.5,
                  fillColor: cfg.color,
                  fillOpacity: isCritical ? 0.45 : isHigh ? 0.35 : 0.22,
                  dashArray: isCritical ? '4, 4' : null,
                }}
                eventHandlers={{
                  click: () => onSelectZone && onSelectZone(zone),
                }}
              >
                <Popup className="custom-map-popup">
                  <div className="p-2 text-slate-100 bg-slate-900 rounded-lg max-w-xs text-xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                      <span className="font-bold text-white text-sm">{zone.name}</span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                        style={{ backgroundColor: `${cfg.color}33`, color: cfg.color }}
                      >
                        {zone.riskLevel}
                      </span>
                    </div>
                    <div className="space-y-1 text-slate-300">
                      <div>
                        Estimated Inundation Depth:{' '}
                        <strong className="text-white font-mono">{zone.depthEstCm} cm</strong>
                      </div>
                      <div>
                        Ground Elevation:{' '}
                        <strong className="text-white font-mono">{zone.elevationM} m</strong>
                      </div>
                      <div>
                        Population at Risk:{' '}
                        <strong className="text-white font-mono">{zone.population.toLocaleString()}</strong>
                      </div>
                    </div>
                    {zone.criticalInfrastructure && (
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                        Critical Points: {zone.criticalInfrastructure.join(', ')}
                      </div>
                    )}
                  </div>
                </Popup>
              </Polygon>
            );
          })}

        {/* 2. Relief Shelters */}
        {layers.shelters &&
          shelters.map((sh) => (
            <Marker
              key={sh.id}
              position={sh.coordinates}
              icon={createCustomIcon('shelter', '#2563eb')}
            >
              <Popup>
                <div className="p-2 text-slate-100 bg-slate-900 rounded-lg max-w-xs text-xs space-y-1.5">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                    <span className="font-bold text-white text-sm">{sh.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300">
                      {sh.status}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    Capacity: <strong className="text-white">{sh.occupied} / {sh.capacity}</strong> (
                    {sh.capacity - sh.occupied} spots free)
                  </div>
                  <div className="text-slate-400 text-[10px]">
                    In-Charge: {sh.inCharge} ({sh.contact})
                  </div>
                  <div className="pt-1 flex flex-wrap gap-1">
                    {sh.amenities.slice(0, 3).map((am, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-slate-800 rounded text-[9px] text-slate-300">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 3. River Telemetry Sensors */}
        {layers.sensors &&
          sensors.map((sensor) => (
            <Marker
              key={sensor.id}
              position={sensor.coordinates}
              icon={createCustomIcon('sensor', '#0891b2')}
            >
              <Popup>
                <div className="p-2 text-slate-100 bg-slate-900 rounded-lg max-w-xs text-xs space-y-1.5">
                  <div className="font-bold text-white text-sm">{sensor.name}</div>
                  <div className="text-slate-400 text-[11px]">{sensor.river} • {sensor.type}</div>
                  <div className="space-y-0.5 text-slate-300 pt-1 border-t border-slate-800">
                    {sensor.waterLevelM !== undefined && (
                      <div>
                        Water Stage: <strong className="text-cyan-400 font-mono">{sensor.waterLevelM} m</strong> (Danger: {sensor.dangerLevelM} m)
                      </div>
                    )}
                    {sensor.rateOfRiseCmHr !== undefined && (
                      <div>
                        Rate of Rise: <strong className="text-amber-400 font-mono">{sensor.rateOfRiseCmHr} cm/hr</strong>
                      </div>
                    )}
                    {sensor.rainIntensityMmHr !== undefined && (
                      <div>
                        Rain Intensity: <strong className="text-cyan-400 font-mono">{sensor.rainIntensityMmHr} mm/hr</strong>
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1">
                    Status: {sensor.status} • Ping: {sensor.lastPing}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 4. Citizen Incidents */}
        {layers.incidents &&
          incidents.map((inc) => (
            <Marker
              key={inc.id}
              position={inc.coordinates}
              icon={createCustomIcon('incident', '#ea580c')}
            >
              <Popup>
                <div className="p-2 text-slate-100 bg-slate-900 rounded-lg max-w-xs text-xs space-y-1.5">
                  <div className="font-bold text-white text-sm">{inc.categoryLabel}</div>
                  <div className="text-slate-400 text-[11px]">{inc.locationName}</div>
                  <div className="text-amber-300 font-semibold">
                    Depth: ~{inc.depthCm} cm
                  </div>
                  <p className="text-slate-300 text-[11px]">{inc.description}</p>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                    Reported by {inc.reportedBy} • {inc.upvotes} Confirmations
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 5. Safe Route Polyline (Green / Cyan) */}
        {safeRoute && safeRoute.geometry && (
          <>
            <Polyline
              positions={safeRoute.geometry.coordinates}
              pathOptions={{
                color: '#06b6d4',
                weight: 5,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Origin Marker */}
            <Marker
              position={safeRoute.geometry.coordinates[0]}
              icon={createCustomIcon('origin', '#10b981')}
            />
            {/* Destination Marker */}
            <Marker
              position={safeRoute.geometry.coordinates[safeRoute.geometry.coordinates.length - 1]}
              icon={createCustomIcon('destination', '#3b82f6')}
            />
          </>
        )}

        {/* 6. Blocked / Hazardous Route Polyline (Red Dashed) */}
        {hazardousRoute && hazardousRoute.geometry && (
          <Polyline
            positions={hazardousRoute.geometry.coordinates}
            pathOptions={{
              color: '#ef4444',
              weight: 4,
              opacity: 0.8,
              dashArray: '8, 8',
              lineCap: 'round',
            }}
          />
        )}
      </MapContainer>

      {/* Map Overlays: Legend & Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 z-[400] max-w-[200px]">
          <MapLayerControls layers={layers} onToggleLayer={toggleLayer} />
        </div>
      )}

      {showLegend && (
        <div className="absolute bottom-4 left-4 z-[400] max-w-[220px]">
          <MapLegend />
        </div>
      )}
    </div>
  );
};

export default FloodMap;
