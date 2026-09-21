import React from 'react';
import { Activity, Server, Radio, Database, CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';

export const SystemStatusWidget = () => {
  const services = [
    { name: 'XGBoost Flood Probability Engine', status: 'ONLINE', latency: '24ms', icon: Activity },
    { name: 'PostGIS Spatial Query Engine', status: 'ONLINE', latency: '12ms', icon: Database },
    { name: 'Ultrasonic River Stage Sensors (5/5)', status: 'ACTIVE', latency: '4s ping', icon: Radio },
    { name: 'Doppler Radar Precipitation Ingestion', status: 'SYNCED', latency: '30s ago', icon: Server },
  ];

  return (
    <Card
      title="Telemetry & Inference Pipeline"
      subtitle="Distributed Early Warning Health"
      icon={Activity}
      action={
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          99.8% Uptime
        </span>
      }
    >
      <div className="space-y-2.5">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300 font-medium truncate">{srv.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-500 font-mono">{srv.latency}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {srv.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SystemStatusWidget;
