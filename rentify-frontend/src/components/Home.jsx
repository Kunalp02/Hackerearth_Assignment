import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold underline mb-5">
                Welcome to Rentify
            </h1>
            {user && (
                <p className="text-2xl mb-2">
                    Hello, {user.username}! Your role is: {user.role}
                </p>
            )}
            <div className="flex justify-center space-x-4">
                {!user && (
                    <>
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </Link>
                        <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Register
                        </Link>
                    </>
                )}
                {user && (
                    <>
                        {user.role === 'seller' && (
                            <>
                                <Link to="/my-posts" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                    My Posts
                                </Link>
                                <Link to="/post-property" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                    Make a Post
                                </Link>
                            </>
                        )}
                        <Link to="/properties" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            All Posts
                        </Link>
                        <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
