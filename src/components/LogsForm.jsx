import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LogForm = () => {
    const { logCode } = useParams();
    const [log, setLog] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5050/fcw/api/v1/logs/${logCode}`)
            .then((response) => {
                setLog(response.data);
            })
            .catch((error) => {
                console.error("Error fetching log", error);
            });
    }, [logCode]);

    if (!log) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Log {log.logCode}</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="logDate" className="block">Log Date</label>
                    <input type="text" id="logDate" defaultValue={log.logDate} className="input" />
                </div>
                <div className="mb-4">
                    <label htmlFor="logDetails" className="block">Log Details</label>
                    <input type="text" id="logDetails" defaultValue={log.logDetails} className="input" />
                </div>
                <div className="mb-4">
                    <label htmlFor="logImg" className="block">Upload Image</label>
                    <input type="file" id="logImg" className="input" />
                </div>
                {/* Add other form fields */}
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};

export default LogForm;
