import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Terminal from './components/Terminal';
import AdminDashboard from './components/AdminDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-[#111] to-[#222] relative overflow-hidden h-screen">
            {/* Abstract animated background shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] animate-bounce"></div>
            <Terminal />
          </div>
        } />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
