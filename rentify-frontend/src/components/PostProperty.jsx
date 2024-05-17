import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const PostProperty = () => {
    const { postProperty } = useContext(AuthContext);
    const navigate = useNavigate();
    const [propertyData, setPropertyData] = useState({
        area: '',
        place: '',
        bedrooms: 0,
        bathrooms: 0,
        nearbyHospitals: '',
        nearbyColleges: ''
    });

    const handleChange = (e) => {
        setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postProperty(propertyData);
            console.log(response);
        } catch (error) {
            console.error('Failed to post property:', error);
        }
    };
    
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Post Property</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <label htmlFor="area">Area:</label>
                <input type="text" id="area" name="area" value={propertyData.area} onChange={handleChange} placeholder="Area" required className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full" />

                <label htmlFor="place">Place:</label>
                <input type="text" id="place" name="place" value={propertyData.place} onChange={handleChange} placeholder="Place" required className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full" />

                <label htmlFor="bedrooms">Bedrooms:</label>
                <input type="number" id="bedrooms" name="bedrooms" value={propertyData.bedrooms} onChange={handleChange} placeholder="Bedrooms" required className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full" />

                <label htmlFor="bathrooms">Bathrooms:</label>
                <input type="number" id="bathrooms" name="bathrooms" value={propertyData.bathrooms} onChange={handleChange} placeholder="Bathrooms" required className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full" />

                <label htmlFor="nearbyHospitals">Nearby Hospitals:</label>
                <input type="text" id="nearbyHospitals" name="nearbyHospitals" value={propertyData.nearbyHospitals} onChange={handleChange} placeholder="Nearby Hospitals" required className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full" />

                <label htmlFor="nearbyColleges">Nearby Colleges:</label>
                <input type="text" id="nearbyColleges" name="nearbyColleges" value={propertyData.nearbyColleges} onChange={handleChange} placeholder="Nearby Colleges" required className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full" />

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Post Property</button>
            </form>
        </div>
    );
};

export default PostProperty;
