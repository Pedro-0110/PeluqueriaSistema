import { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/dashboard', { withCredentials: true });
                setMessage(data.message);
            } catch (error) {
                setMessage('No autenticado');
            }
        };
        fetchDashboard();
    }, []);

    return <h1>{message}</h1>;
};

