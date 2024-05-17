import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const SellerDetailsModal = ({ seller, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Seller Details</h2>
                <p>Email: {seller.email}</p>
                <p>Phone Number: {seller.phone}</p>
                <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Close
                </button>
            </div>
        </div>
    );
};

const MyPosts = () => {
    const { user, properties, fetchMyPosts } = useContext(AuthContext);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const handleInterestClick = (property) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    return (
        <div>
            {properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                    {properties.map((property) => (
                        <div key={property._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{property.area}, {property.place}</h3>
                                <p className="mt-2 text-gray-600">Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}</p>
                                <p className="mt-2 text-gray-600">Nearby Hospitals: {property.nearbyHospitals}</p>
                                <p className="mt-2 text-gray-600">Nearby Colleges: {property.nearbyColleges}</p>
                                <p className="mt-2 text-gray-600">Posted on: {new Date(property.createdAt).toLocaleDateString()}</p>
                                <button onClick={() => handleInterestClick(property)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    I'm Interested
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-10">
                    <p>No posts available</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Make a Post
                    </button>
                </div>
            )}
            {selectedProperty && (
                <SellerDetailsModal seller={selectedProperty.seller} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default MyPosts;
