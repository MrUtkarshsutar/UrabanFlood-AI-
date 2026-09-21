import React, { useState } from 'react';
import {
  FileWarning,
  MapPin,
  Camera,
  Send,
  AlertCircle,
  CheckCircle2,
  WifiOff,
} from 'lucide-react';
import Button from '../common/Button';
import { useIncidents } from '../../context/IncidentContext';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { PRESET_LOCATIONS } from '../../services/routingService';

export const IncidentReportForm = () => {
  const { submitReport } = useIncidents();
  const { isOnline } = useOnlineStatus();

  const [category, setCategory] = useState('ROAD_FLOODING');
  const [locationIndex, setLocationIndex] = useState(0);
  const [specificSpot, setSpecificSpot] = useState('');
  const [severity, setSeverity] = useState('HIGH');
  const [depthCm, setDepthCm] = useState(40);
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(
    'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const categories = [
    { key: 'ROAD_FLOODING', label: 'Road Inundation' },
    { key: 'WATERLOGGING', label: 'Urban Waterlogging' },
    { key: 'DRAINAGE_OVERFLOW', label: 'Drainage Overflow' },
    { key: 'RISING_WATER', label: 'Rapid River Rise' },
    { key: 'INFRASTRUCTURE_DAMAGE', label: 'Culvert/Bridge Damage' },
    { key: 'OTHER', label: 'Other Emergency' },
  ];

  const photoOptions = [
    { label: 'Submerged Road', url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80' },
    { label: 'Choked Drain', url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80' },
    { label: 'River Swell', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    const chosenLoc = PRESET_LOCATIONS[locationIndex];

    const report = {
      category,
      categoryLabel: categories.find((c) => c.key === category)?.label || 'Incident',
      ward: chosenLoc.ward,
      locationName: specificSpot.trim() ? `${specificSpot.trim()} (${chosenLoc.name})` : chosenLoc.name,
      coordinates: chosenLoc.coordinates,
      severity,
      depthCm: Number(depthCm),
      description: description.trim(),
      reportedBy: reportedBy.trim() || 'Citizen Responder',
      imageUrl: selectedPhoto,
    };

    try {
      await submitReport(report);
      setSuccessMessage(
        !isOnline
          ? 'Incident stored offline. Queued for automatic sync upon network reconnection.'
          : 'Incident reported successfully! Broadcasted to Municipal Disaster Response feed.'
      );
      setDescription('');
      setSpecificSpot('');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileWarning className="w-5 h-5 text-orange-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">
            Report Flood Inundation / Hazard
          </h3>
        </div>
        {!isOnline && (
          <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
            <WifiOff className="w-3 h-3" /> Offline Mode Active
          </span>
        )}
      </div>

      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Incident Type Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Hazard Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((c) => (
            <button
              type="button"
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                category === c.key
                  ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500 shadow-glow-blue'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Ward / Sector</label>
          <select
            value={locationIndex}
            onChange={(e) => setLocationIndex(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {PRESET_LOCATIONS.map((loc, idx) => (
              <option key={loc.id} value={idx}>
                {loc.name} ({loc.ward})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Specific Landmark / Road</label>
          <input
            type="text"
            value={specificSpot}
            onChange={(e) => setSpecificSpot(e.target.value)}
            placeholder="e.g. Near Z-Bridge underpass"
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Severity & Water Depth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Hazard Severity</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="CRITICAL">Critical (Life/Property Immediate Hazard)</option>
            <option value="HIGH">High (Road Blocked, Inundation &gt; 30cm)</option>
            <option value="MODERATE">Moderate (Vehicle Slowdown, ~15-30cm)</option>
            <option value="LOW">Low (Localized Puddling, &lt; 15cm)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Estimated Water Depth: <span className="font-mono text-cyan-400 font-bold">{depthCm} cm</span>
          </label>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={depthCm}
            onChange={(e) => setDepthCm(e.target.value)}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Ankle (10cm)</span>
            <span>Knee (45cm)</span>
            <span>Waist (90cm+)</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">
          Situation Description <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe water accumulation, stuck vehicles, embankment conditions, or stranded individuals..."
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
        ></textarea>
      </div>

      {/* Photo Attachment Presets */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
          <Camera className="w-3.5 h-3.5 text-cyan-400" />
          Attach Field Photo (Demo Presets):
        </label>
        <div className="flex gap-2">
          {photoOptions.map((p, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setSelectedPhoto(p.url)}
              className={`relative rounded-xl overflow-hidden border transition-all h-16 w-24 shrink-0 ${
                selectedPhoto === p.url ? 'border-cyan-400 ring-2 ring-cyan-500/50' : 'border-slate-800 opacity-60'
              }`}
            >
              <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
              <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white text-center py-0.5 font-medium">
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Submitter Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Your Name / Call Sign (Optional)</label>
        <input
          type="text"
          value={reportedBy}
          onChange={(e) => setReportedBy(e.target.value)}
          placeholder="Citizen Responder / Volunteer Name"
          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !description.trim()}
        variant="primary"
        className="w-full justify-center"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Transmitting Report...' : 'Broadcast Emergency Report'}</span>
      </Button>
    </form>
  );
};

export default IncidentReportForm;
