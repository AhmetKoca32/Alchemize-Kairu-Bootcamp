// ... existing code ...
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

// Pages
import CareerRoadmap from './pages/CareerRoadmap';
import CV from './pages/CV';
import Dashboard from './pages/Dashboard';
import GithubConnect from './pages/GithubConnect';
import JobMatches from './pages/JobMatches';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Settings from './pages/Settings';

// Components
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Onboarding ve GithubConnect sayfaları Layout dışında kalacak */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/github-connect" element={<GithubConnect />} />

        {/* Layout içindeki diğer sayfalar */}
        {/* Nested Routes yapısını kullanarak Layout'u ana iskelet olarak belirliyoruz */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/career-roadmap" element={<CareerRoadmap />} />
          <Route path="/job-matches" element={<JobMatches />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;