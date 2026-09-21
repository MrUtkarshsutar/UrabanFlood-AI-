import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from '../components/navigation/TopNavbar';
import Sidebar from '../components/navigation/Sidebar';
import MobileNav from '../components/navigation/MobileNav';
import OfflineBanner from '../components/common/OfflineBanner';
import SimulationControls from '../components/navigation/SimulationControls';
import { useSimulation } from '../context/SimulationContext';

export const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scenarioId, audioSirenEnabled } = useSimulation();
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  // Optional Web Audio alert beep when Critical & audio enabled
  useEffect(() => {
    if (audioSirenEnabled && scenarioId === 'CRITICAL') {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioContextRef.current && AudioContext) {
          audioContextRef.current = new AudioContext();
        }
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        
        if (audioContextRef.current) {
          const osc = audioContextRef.current.createOscillator();
          const gain = audioContextRef.current.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
          osc.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.5);
          gain.gain.setValueAtTime(0.08, audioContextRef.current.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.5);
          osc.connect(gain);
          gain.connect(audioContextRef.current.destination);
          osc.start();
          osc.stop(audioContextRef.current.currentTime + 0.5);
        }
      } catch (err) {
        console.warn('Audio siren notification could not play:', err);
      }
    }
  }, [scenarioId, audioSirenEnabled]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Offline Alert Strip */}
      <OfflineBanner />

      {/* Top Navbar */}
      <TopNavbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Main App Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Desktop */}
        <Sidebar />

        {/* Mobile Navigation Drawer & Bottom Bar */}
        <MobileNav
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 pb-20 lg:pb-8 space-y-5 max-w-7xl mx-auto w-full">
          {/* Persistent Simulation Controls at Top */}
          <SimulationControls />

          {/* Page Outlet */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
