import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStaff, updateStaff, deleteStaff, fetchStaff } from '../redux/staffSlice';
import Swal from 'sweetalert2';
import FieldDropdown from './FieldDropdown';
import VehicleDropdown from './VehicleDropdown';

const StaffForm = () => {
    const dispatch = useDispatch();
    const staffList = useSelector((state) => state.staff.staffList);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        designation: '',
        gender: '',
        joinedDate: '',
        dob: '',
        addressLine01: '',
        addressLine02: '',
        addressLine03: '',
        addressLine04: '',
        addressLine05: '',
        contactNo: '',
        email: '',
        role: '',
        fieldCode: '',
        vehicleCode: '',
    });

    useEffect(() => {
        dispatch(fetchStaff());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        dispatch(addStaff(formData));
        Swal.fire('Saved!', 'Staff member saved successfully!', 'success');
        clearFields();
    };

    const handleUpdate = () => {
        dispatch(updateStaff(formData));
        Swal.fire('Updated!', 'Staff member updated successfully!', 'success');
        clearFields();
    };

    const handleDelete = () => {
        dispatch(deleteStaff(formData.id));
        Swal.fire('Deleted!', 'Staff member deleted successfully!', 'success');
        clearFields();
    };

    const clearFields = () => {
        setFormData({
            firstName: '',
            lastName: '',
            designation: '',
            gender: '',
            joinedDate: '',
            dob: '',
            addressLine01: '',
            addressLine02: '',
            addressLine03: '',
            addressLine04: '',
            addressLine05: '',
            contactNo: '',
            email: '',
            role: '',
            fieldCode: '',
            vehicleCode: '',
        });
    };

    return (
        <div className="p-6 bg-white shadow-md rounded">
            <form>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                {/* Additional input fields */}
                <FieldDropdown selectedFieldCode={formData.fieldCode} onChange={handleChange} />
                <VehicleDropdown selectedVehicleCode={formData.vehicleCode} onChange={handleChange} />
                <div className="space-x-4">
                    <button type="button" onClick={handleSave} className="btn-primary">Save</button>
                    <button type="button" onClick={handleUpdate} className="btn-warning">Update</button>
                    <button type="button" onClick={handleDelete} className="btn-danger">Delete</button>
                </div>
            </form>
        </div>
    );
};

export default StaffForm;
