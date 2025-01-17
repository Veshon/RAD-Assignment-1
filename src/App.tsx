import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CropPage from './pages/CropPage';
import VehicleList from './components/VehicleForm.jsx';
import StaffList from './components/StaffList';
import FieldList from './components/FieldList';
import EquipmentList from './components/equipmentList';
import LogsForm from './components/LogsForm';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/crops" element={<CropPage />} />
                <Route path="/vehicles" element={<VehicleList />} />
                <Route path="/staff" element={<StaffList />} />
                <Route path="/fields" element={<FieldList />} />
                <Route path="/equipmets" element={<EquipmentList />} />
                <Route path="/logs" element={<LogsForm />} />
            </Routes>
        </Router>
    );
};

export default App;
