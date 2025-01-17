import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogs } from '../slices/logsSlice';
import axios from 'axios';

const LogsTable = () => {
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.logs);

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");

        axios.get("http://localhost:5050/fcw/api/v1/logs", {
            headers: { "Authorization": `Bearer ${jwtToken}` }
        })
            .then((response) => {
                dispatch(setLogs(response.data));
            })
            .catch((error) => {
                console.error("Error fetching logs", error);
            });
    }, [dispatch]);

    return (
        <table className="min-w-full table-auto">
            <thead>
            <tr>
                <th>Log Code</th>
                <th>Log Date</th>
                <th>Log Details</th>
                <th>Field Code</th>
                <th>Crop Code</th>
                <th>Staff ID</th>
            </tr>
            </thead>
            <tbody>
            {logs.map((log) => (
                <tr key={log.logCode}>
                    <td>{log.logCode}</td>
                    <td>{log.logDate}</td>
                    <td>{log.logDetails}</td>
                    <td>{log.fieldCode}</td>
                    <td>{log.cropCode}</td>
                    <td>{log.staffId}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default LogsTable;
