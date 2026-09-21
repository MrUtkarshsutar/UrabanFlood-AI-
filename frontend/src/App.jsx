import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import { IncidentProvider } from './context/IncidentContext';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingState from './components/common/LoadingState';

// Lazy loaded pages for performance optimization
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LiveMap = lazy(() => import('./pages/LiveMap'));
const Nowcasting = lazy(() => import('./pages/Nowcasting'));
const Alerts = lazy(() => import('./pages/Alerts'));
const SafeRoute = lazy(() => import('./pages/SafeRoute'));
const Shelters = lazy(() => import('./pages/Shelters'));
const Incidents = lazy(() => import('./pages/Incidents'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <SimulationProvider>
      <IncidentProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingState message="Loading UrbanFlood AI..." />}>
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="map" element={<LiveMap />} />
                <Route path="nowcasting" element={<Nowcasting />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="safe-route" element={<SafeRoute />} />
                <Route path="shelters" element={<Shelters />} />
                <Route path="incidents" element={<Incidents />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </IncidentProvider>
    </SimulationProvider>
  );
}

export default App;
