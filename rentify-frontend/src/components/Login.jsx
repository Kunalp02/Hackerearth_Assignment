import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userData);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="border-2 border-gray-500 rounded px-3 py-2 w-full mb-3"
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="border-2 border-gray-500 rounded px-3 py-2 w-full mb-3"
                />
                <div className="flex space-x-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                    <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
