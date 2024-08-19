/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const auth = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const loginUser = async (e) => {
        e.preventDefault(); //prevent the page to load
        const { email, password } = data;
        try {
            const data = await axios.post("api/admin/login", {
                email,
                password,
            });
            if (data.error) {
                toast.error("user doesn't exist");
            } else {
                setData({});
                toast.success("👌");
                navigate("/admin");
            }
        } catch (err) {
            console.log(err);
            toast.error("user doesn't exist");
        }
    };

    return (
        <>
            <div className="Container ">
                <div className="Form rounded-3xl">
                    <h1 className="Form_title text-6xl ">Authentication</h1>
                    <form onSubmit={loginUser}>
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
                                    setData({ ...data, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="Form_group">
                            <label
                                htmlFor="password"
                                className="Form_label block"
                            >
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
                            Login
                        </button>
                    </form>
                    <Link className="registerLink" to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </>
    );
};

export default auth;
