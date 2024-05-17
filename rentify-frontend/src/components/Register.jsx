import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: 'buyer'
  });
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(userData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="border-2 border-gray-500 rounded px-3 py-2 w-full mb-3"
        />
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="border-2 border-gray-500 rounded px-3 py-2 w-full mb-3"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border-2 border-gray-500 rounded px-3 py-2 w-full mb-3"
        />
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="border-2 border-gray-500 rounded px-3 py-2 w-full mb-3"
        />
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
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="border-2 border-gray-500 rounded px-3 py-2 w-full mb-3"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-3 w-full">
          Register
        </button>
      </form>
      <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login here</Link>
    </div>
  );
};

export default Register;
