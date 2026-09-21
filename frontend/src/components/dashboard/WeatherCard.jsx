import React from 'react';
import { CloudRain, Wind, Droplets, Thermometer, ShieldAlert } from 'lucide-react';
import Card from '../common/Card';
import { useWeather } from '../../hooks/useWeather';

export const WeatherCard = () => {
  const { weather, isLoading } = useWeather();

  const current = weather?.current || {
    precipitation_intensity_mm_per_hr: 18,
    precipitation_mm: 32,
    temperature_celsius: 26.2,
    humidity_percent: 88,
    wind_speed_kmh: 16,
    condition: 'Moderate Rain',
  };

  return (
    <Card
      title="Meteorological Conditions"
      subtitle="Open-Meteo & Radar Ground Station"
      icon={CloudRain}
      action={
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full">
          AWS 08 LIVE
        </span>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">
              {Math.round(current.precipitation_intensity_mm_per_hr)}{' '}
              <span className="text-sm font-semibold text-slate-400 font-sans">mm/hr</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Rainfall Rate • {current.condition}
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400">
            <CloudRain className="w-6 h-6" />
          </div>
        </div>

        {/* 3 Metric Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
          <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 text-center">
            <Droplets className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
            <span className="text-[10px] text-slate-500 uppercase font-semibold">24h Rain</span>
            <div className="text-sm font-bold text-slate-200 font-mono">
              {current.precipitation_mm} mm
            </div>
          </div>

          <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 text-center">
            <Thermometer className="w-4 h-4 mx-auto text-amber-400 mb-1" />
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Temp</span>
            <div className="text-sm font-bold text-slate-200 font-mono">
              {current.temperature_celsius}°C
            </div>
          </div>

          <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80 text-center">
            <Wind className="w-4 h-4 mx-auto text-blue-400 mb-1" />
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Wind</span>
            <div className="text-sm font-bold text-slate-200 font-mono">
              {current.wind_speed_kmh} km/h
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
