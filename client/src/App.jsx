import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/auth";
import MainAdmin from "./pages/mainAdmin/mainAdmin.jsx";
import Register from "./pages/register/register.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import AuthManager from "./pages/authManager/authManager.jsx";
import SuccessPage from "./pages/managerSuccessPage/managerSuccessPage.jsx";
import NotFound from "./components/NotFound.jsx";
axios.defaults.baseURL = "http://localhost:8000";

function App() {
    return (
        <>
            <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/admin" element={<MainAdmin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/pop" element={<SuccessPage />} />
                    <Route path="/pip" element={<AuthManager />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
