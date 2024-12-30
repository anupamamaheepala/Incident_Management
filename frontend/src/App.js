import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';

import Signin from './pages/Signin';
import UserProfile from './pages/UserProfile';
import AdminPage from './pages/AdminPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/userProfile/*" element={<UserProfile />} />
        <Route path="/dashboard/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
