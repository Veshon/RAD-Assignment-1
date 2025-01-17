import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCrop } from '../redux/cropSlice';

const CropForm: React.FC = () => {
    const [commonName, setCommonName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [category, setCategory] = useState('');
    const [season, setSeason] = useState('');
    const [fieldCode, setFieldCode] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCrop = { code: '', commonName, scientificName, category, season, fieldCode };
        dispatch(addCrop(newCrop));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Common Name"
                value={commonName}
                onChange={(e) => setCommonName(e.target.value)}
                className="input"
            />
            <input
                type="text"
                placeholder="Scientific Name"
                value={scientificName}
                onChange={(e) => setScientificName(e.target.value)}
                className="input"
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input"
            />
            <input
                type="text"
                placeholder="Season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="input"
            />
            <input
                type="text"
                placeholder="Field Code"
                value={fieldCode}
                onChange={(e) => setFieldCode(e.target.value)}
                className="input"
            />
            <button type="submit" className="btn">
                Save Crop
            </button>
        </form>
    );
};

export default CropForm;
