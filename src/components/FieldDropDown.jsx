import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFields } from '../redux/staffSlice';

const FieldDropdown = ({ selectedFieldCode, onChange }) => {
    const dispatch = useDispatch();
    const fields = useSelector((state) => state.staff.fields);

    useEffect(() => {
        dispatch(fetchFields());
    }, [dispatch]);

    return (
        <select name="fieldCode" value={selectedFieldCode} onChange={onChange}>
            <option value="">Select field</option>
            {fields.map((field) => (
                <option key={field.fieldCode} value={field.fieldCode}>
                    {field.fieldName} - {field.fieldLocation}
                </option>
            ))}
        </select>
    );
};

export default FieldDropdown;
