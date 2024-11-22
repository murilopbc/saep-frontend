import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageTasks from '../pages/ManageTasks';
import RegisterTask from '../pages/RegisterTask';
import RegisterUser from '../pages/RegisterUser';
import UpdateTask from '../pages/UpdateTask';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/tasks/new" element={<RegisterTask />} />
        <Route path="/tasks" element={<ManageTasks />} />
        <Route path="/tasks/:id/update" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;