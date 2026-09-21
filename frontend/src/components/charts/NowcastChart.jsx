import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs space-y-1.5">
        <div className="font-bold text-white border-b border-slate-800 pb-1 flex items-center justify-between gap-4">
          <span>{label}</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
              data?.riskLevel === 'CRITICAL'
                ? 'bg-red-500/20 text-red-400'
                : data?.riskLevel === 'HIGH'
                ? 'bg-orange-500/20 text-orange-400'
                : data?.riskLevel === 'MODERATE'
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}
          >
            {data?.riskLevel} RISK
          </span>
        </div>
        <div className="space-y-1 text-slate-300">
          <div className="flex justify-between gap-3">
            <span className="text-cyan-400 font-medium">Precipitation:</span>
            <span className="font-mono font-bold text-white">{data?.rainfallMmHr} mm/hr</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-blue-400 font-medium">Water Stage:</span>
            <span className="font-mono font-bold text-white">{data?.waterLevelM} m</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-400 font-medium">Inundated Area:</span>
            <span className="font-mono text-white">{data?.affectedAreaSqKm} sq km</span>
          </div>
          <div className="flex justify-between gap-3 text-[10px] text-slate-500 pt-0.5">
            <span>Model Confidence:</span>
            <span>{data?.confidencePercent}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const NowcastChart = ({ timeline = [], dangerMark = 2.80, height = 320 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={timeline}
          margin={{ top: 20, right: 20, bottom: 10, left: -10 }}
        >
          <defs>
            <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

          <XAxis
            dataKey="time"
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            tickLine={false}
          />

          {/* Left Y Axis: Water Level (m) */}
          <YAxis
            yAxisId="left"
            stroke="#3b82f6"
            domain={[0, 4.0]}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            tickLine={false}
            tickFormatter={(val) => `${val}m`}
          />

          {/* Right Y Axis: Rainfall (mm/hr) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#06b6d4"
            domain={[0, 140]}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#334155' }}
            tickLine={false}
            tickFormatter={(val) => `${val}mm`}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: 12, fontSize: 11 }}
          />

          {/* Danger Mark Reference Line */}
          <ReferenceLine
            yAxisId="left"
            y={dangerMark}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{
              value: `Danger Mark (${dangerMark}m)`,
              fill: '#ef4444',
              fontSize: 10,
              position: 'insideTopLeft',
            }}
          />

          {/* Rainfall Area */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="rainfallMmHr"
            name="Precipitation (mm/hr)"
            fill="url(#rainGrad)"
            stroke="#06b6d4"
            strokeWidth={2}
          />

          {/* Water Level Line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="waterLevelM"
            name="River Stage (m)"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#60a5fa', stroke: '#ffffff' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NowcastChart;
