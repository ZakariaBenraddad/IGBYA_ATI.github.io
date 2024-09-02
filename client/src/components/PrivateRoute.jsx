import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Check for the token

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
