import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VehicleForm() {
    const [vehicleCode, setVehicleCode] = useState('');
    const [licensePlateNo, setLicensePlateNo] = useState('');
    const [category, setCategory] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [status, setStatus] = useState('');
    const [remarks, setRemarks] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [staff, setStaff] = useState([]);

    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        axios.get('http://localhost:5050/fcw/api/v1/vehicles', {
            headers: { Authorization: `Bearer ${jwtToken}` }
        }).then(response => {
            setVehicles(response.data);
        }).catch(error => {
            console.error('Error fetching vehicles', error);
        });

        axios.get('http://localhost:5050/fcw/api/v1/staff', {
            headers: { Authorization: `Bearer ${jwtToken}` }
        }).then(response => {
            setStaff(response.data);
        }).catch(error => {
            console.error('Error fetching staff', error);
        });
    }, [jwtToken]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const vehicleData = { licensePlateNo, category, fuelType, status, remarks };

        axios.post('http://localhost:5050/fcw/api/v1/vehicles', vehicleData, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` }
        }).then(() => {
            alert('Vehicle saved successfully!');
            clearFields();
        }).catch(() => {
            alert('Failed to save vehicle.');
        });
    };

    const clearFields = () => {
        setLicensePlateNo('');
        setCategory('');
        setFuelType('');
        setStatus('');
        setRemarks('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={licensePlateNo} onChange={e => setLicensePlateNo(e.target.value)} placeholder="License Plate No" />
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
            <input value={fuelType} onChange={e => setFuelType(e.target.value)} placeholder="Fuel Type" />
            <input value={status} onChange={e => setStatus(e.target.value)} placeholder="Status" />
            <input value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Remarks" />
            <button type="submit">Save</button>
            <button type="button" onClick={clearFields}>Clear</button>
        </form>
    );
}

export default VehicleForm;
