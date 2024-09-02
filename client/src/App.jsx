import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/auth";
import MainAdmin from "./pages/mainAdmin/mainAdmin.jsx";
import Register from "./pages/register/register.jsx";
import AuthManager from "./pages/authManager/authManager.jsx";
import SuccessPage from "./pages/managerSuccessPage/managerSuccessPage.jsx";
import NotFound from "./components/NotFound.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true; // Important for sending cookies with requests
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function App() {
    return (
        <>
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <MainAdmin />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pop"
                        element={
                            <PrivateRoute>
                                <SuccessPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pip"
                        element={
                            <PrivateRoute>
                                <AuthManager />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
