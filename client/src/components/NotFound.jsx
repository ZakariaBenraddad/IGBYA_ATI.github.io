import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">Oops! Page not found.</p>
            <button
                onClick={handleGoHome}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Go Home
            </button>
        </div>
    );
};

export default NotFound;
