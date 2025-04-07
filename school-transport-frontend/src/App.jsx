import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusManagement from './pages/BusManagement';
import RouteManagement from './pages/RouteManagement';
import PersonnelManagement from './pages/PersonnelManagement'
import StudentRegistration from './pages/StudentRegistration';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/buses" element={<BusManagement />} />
        <Route path="/routes" element={<RouteManagement />} />
        <Route path="/personnel" element={<PersonnelManagement />} />
        <Route path="/registrations" element={<StudentRegistration />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
