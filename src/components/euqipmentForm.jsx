import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEquipment } from '../features/equipment/equipmentSlice';
import axios from 'axios';
import Swal from 'sweetalert2';

const FieldForm = () => {
    const [fieldCode, setFieldCode] = useState('');
    const [equipmentData, setEquipmentData] = useState({
        name: '',
        type: '',
        status: '',
        staffId: '',
        fieldCode: '',
    });

    const jwtToken = localStorage.getItem('jwtToken');
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch equipment list
        axios.get('http://localhost:5050/fcw/api/v1/equipments', {
            headers: { Authorization: `Bearer ${jwtToken}` },
        })
            .then(response => {
                dispatch(setEquipmentList(response.data));
            })
            .catch(error => {
                console.error('Error loading equipment ids:', error);
            });
    }, [dispatch, jwtToken]);

    const handleLoadEquipment = () => {
        if (fieldCode) {
            axios.get(`http://localhost:5050/fcw/api/v1/equipments/${fieldCode}`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
                .then(response => {
                    setEquipmentData(response.data);
                    dispatch(setEquipment(response.data));  // Update Redux state with the selected equipment data
                })
                .catch(error => {
                    Swal.fire('Error', 'Failed to load equipment data.', 'error');
                    console.error('Error fetching equipment data:', error);
                });
        } else {
            Swal.fire('Warning', 'Please enter a valid equipment code.', 'warning');
        }
    };

    const handleSave = () => {
        const data = { ...equipmentData };
        axios.post('http://localhost:5050/fcw/api/v1/equipments', data, {
            headers: { 'Authorization': `Bearer ${jwtToken}`, 'Content-Type': 'application/json' }
        })
            .then(response => {
                Swal.fire('Saved', 'Equipment saved successfully!', 'success');
            })
            .catch(error => {
                Swal.fire('Error', 'Error saving equipment!', 'error');
                console.error('Error saving equipment:', error);
            });
    };

    const handleDelete = () => {
        const { equipmentId } = equipmentData;
        axios.delete(`http://localhost:5050/fcw/api/v1/equipments/${equipmentId}`, {
            headers: { 'Authorization': `Bearer ${jwtToken}` },
        })
            .then(() => {
                Swal.fire('Deleted', 'Equipment deleted successfully!', 'success');
            })
            .catch(error => {
                Swal.fire('Error', 'Error deleting equipment!', 'error');
                console.error('Error deleting equipment:', error);
            });
    };

    return (
        <div className="p-4">
            <input
                type="text"
                className="border p-2 mb-4"
                value={fieldCode}
                onChange={(e) => setFieldCode(e.target.value)}
                placeholder="Enter Equipment Code"
            />
            <button onClick={handleLoadEquipment} className="bg-blue-500 text-white px-4 py-2 rounded">
                Load Equipment
            </button>
            <form className="mt-4">
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="Equipment Name"
                    value={equipmentData.name}
                    onChange={(e) => setEquipmentData({ ...equipmentData, name: e.target.value })}
                />
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="Equipment Type"
                    value={equipmentData.type}
                    onChange={(e) => setEquipmentData({ ...equipmentData, type: e.target.value })}
                />
                <input
                    type="text"
                    className="border p-2 w-full mb-4"
                    placeholder="Status"
                    value={equipmentData.status}
                    onChange={(e) => setEquipmentData({ ...equipmentData, status: e.target.value })}
                />
                <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
                    Save Equipment
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded ml-4">
                    Delete Equipment
                </button>
            </form>
        </div>
    );
};

export default FieldForm;
