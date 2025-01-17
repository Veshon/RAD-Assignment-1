import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFields } from '../features/fields/fieldSlice';
import axios from 'axios';

const FieldList = () => {
    const dispatch = useDispatch();
    const fields = useSelector((state) => state.fields.fields);

    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get('http://localhost:5050/fcw/api/v1/fields', {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                });
                dispatch(setFields(response.data));
            } catch (error) {
                alert('Failed to load field codes.');
                console.error(error);
            }
        };

        fetchFields();
    }, [dispatch]);

    return (
        <div className="space-y-4">
            {fields.map((field) => (
                <div key={field.fieldCode} className="border p-4">
                    <h2>{field.fieldName}</h2>
                    <p>{field.fieldLocation}</p>
                </div>
            ))}
        </div>
    );
};

export default FieldList;
