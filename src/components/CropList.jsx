import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { setCrops } from '../redux/cropSlice'; // Import your slice action

const CropList = () => {
    const dispatch = useDispatch();
    const crops = useSelector(state => state.crops); // Get the crops from the Redux store

    useEffect(() => {
        // Fetch crops and dispatch the action to set them in the Redux store
        const fetchCrops = async () => {
            try {
                const response = await fetch('http://localhost:5050/fcw/api/v1/crops');
                const data = await response.json();
                dispatch(setCrops(data)); // Dispatch the action with fetched data
            } catch (error) {
                console.error('Error fetching crops:', error);
            }
        };

        fetchCrops();
    }, [dispatch]); // Only rerun if dispatch changes

    return (
        <div>
            <h2>Crops List</h2>
            <ul>
                {crops.map(crop => (
                    <li key={crop.code}>
                        {crop.commonName} - {crop.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CropList;
