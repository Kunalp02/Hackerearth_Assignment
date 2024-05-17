/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('user');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            if (userInfo) {
                setUser(JSON.parse(userInfo));
            }
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            toast.success('Logged in successfully!');
            return response; // Return the response
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Invalid username or password');
            throw error; // Rethrow the error to be caught in the component
        }
    };
    
    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            console.log(response.data);
            toast.success('Registration successful!');
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = '';
        setUser(null);
        toast.success('Logged out successfully!');
    };

    const postProperty = async (propertyData) => {
        try {
            const resp = await axios.post(`${API_URL}/properties`, propertyData); // Changed the endpoint to match backend route
            console.log(resp.data);
            toast.success('Property posted successfully');
        } catch (error) {
            console.error('Failed to post property:', error);
            toast.error('Failed to post property');
        }
    };
    

    const updateProperty = async (id, propertyData) => {
        try {
            await axios.put(`${API_URL}/properties/${id}`, propertyData);
            toast.success('Property updated successfully');
        } catch (error) {
            console.error('Failed to update property:', error);
            toast.error('Failed to update property');
        }
    };

    const deleteProperty = async (id) => {
        try {
            await axios.delete(`${API_URL}/properties/${id}`);
            toast.success('Property deleted successfully');
        } catch (error) {
            console.error('Failed to delete property:', error);
            toast.error('Failed to delete property');
        }
    };

    const fetchPropertiesExcludingUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/properties`);
            console.log(response.data);
            if (Array.isArray(response.data.properties)) {
                const filteredProperties = response.data.properties.filter(property => user && property.seller !== user.id);
                setProperties(filteredProperties);
            } else {
                console.error('Invalid response format: properties array not found');
            }
        } catch (error) {
            console.error('Failed to fetch properties:', error);
        }
    };

    const fetchMyPosts = async () => {
        try {
            const response = await axios.get(`${API_URL}/properties/my-posts`);
            console.log(response.data);
            if (Array.isArray(response.data.properties)) {
                setProperties(response.data.properties);
            } else {
                console.error('Invalid response format: properties array not found');
            }
        } catch (error) {
            console.error('Failed to fetch my posts:', error);
        }
    };
    
    


    return (
        <AuthContext.Provider value={{ user, properties, login, register, logout, fetchPropertiesExcludingUser, fetchMyPosts, postProperty, updateProperty, deleteProperty }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
