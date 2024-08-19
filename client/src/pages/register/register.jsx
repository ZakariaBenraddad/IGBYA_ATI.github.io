/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import "./register.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const registerUser = async (e) => {
        e.preventDefault(); // Prevent the page from reloading
        const { username, password, email } = data;
        try {
            const response = await axios.post(
                "/api/admin/register",
                {
                    username,
                    email,
                    password,
                },
                {
                    timeout: 3000,
                }
            );
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({ username: "", email: "", password: "" }); // Clear form after success
                toast.success("User registered successfully!");
                navigate("/login");
            }
        } catch (e) {
            toast.error("An error occurred during registration.");
            console.log(e.response ? e.response.data : e.message);
        }
    };

    return (
        <div className="Container">
            <div className="Form rounded-3xl">
                <h1 className="Form_title text-6xl">Register</h1>
                <form onSubmit={registerUser}>
                    <div className="Form_group">
                        <label htmlFor="username" className="Form_label block">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="Form_input rounded-lg"
                            placeholder="Username"
                            value={data.username} // Corrected to data.username
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    username: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="Form_group">
                        <label htmlFor="email" className="Form_label block">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="Form_input rounded-lg"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="Form_group">
                        <label htmlFor="password" className="Form_label block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="Form_input rounded-lg"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button type="submit" className="Form_button">
                        Register {/* Updated from "Login" to "Register" */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
