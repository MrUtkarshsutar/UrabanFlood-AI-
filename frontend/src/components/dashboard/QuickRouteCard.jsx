import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, ShieldCheck, MapPin, ArrowRight, AlertOctagon } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useSimulation } from '../../context/SimulationContext';

export const QuickRouteCard = () => {
  const { scenarioId } = useSimulation();
  const isFlooded = scenarioId === 'FLOOD_RISK' || scenarioId === 'CRITICAL';

  return (
    <Card
      title="Dynamic Safe Evacuation"
      subtitle="AI Hazard-Evading Pathfinding"
      icon={Navigation}
    >
      <div className="space-y-4">
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span className="text-slate-400">From:</span>
            <span className="font-semibold text-slate-200">Deccan Gymkhana (Ward 12)</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span className="text-slate-400">To Nearest Shelter:</span>
            <span className="font-semibold text-emerald-300">Balgandharva Relief Hall</span>
          </div>
        </div>

        {isFlooded ? (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Hazard Bypass Active:</span> River Bed Road is submerged (45cm). Route automatically diverts via elevated FC Road ridge.
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-300">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>All transit corridors clear. Direct route available (7 mins).</span>
          </div>
        )}

        <Link to="/safe-route" className="block">
          <Button variant="primary" className="w-full justify-center">
            Open Safe Route Navigator <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default QuickRouteCard;
