import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedField } from '../features/fields/fieldSlice';
import axios from 'axios';

const FieldForm = () => {
    const dispatch = useDispatch();
    const [fieldCode, setFieldCode] = useState('');

    const jwtToken = localStorage.getItem('jwtToken');

    const loadField = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5050/fcw/api/v1/fields/${fieldCode}`,
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            );
            dispatch(setSelectedField(response.data));
        } catch (error) {
            alert('Failed to load field data.');
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                className="border p-2"
                value={fieldCode}
                onChange={(e) => setFieldCode(e.target.value)}
                placeholder="Enter Field Code"
            />
            <button
                onClick={loadField}
                className="bg-blue-500 text-white p-2 mt-2"
            >
                Load Field
            </button>
        </div>
    );
};

export default FieldForm;
