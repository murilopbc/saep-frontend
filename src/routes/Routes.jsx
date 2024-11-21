import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageTasks from '../pages/ManageTasks';
import RegisterTask from '../pages/RegisterTask';
import RegisterUser from '../pages/RegisterUser';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/tasks/new" element={<RegisterTask />} />
        <Route path="/tasks" element={<ManageTasks />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;