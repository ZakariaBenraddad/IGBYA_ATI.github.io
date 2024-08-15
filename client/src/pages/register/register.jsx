import { useState } from "react";
import "./register.css";
const register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = (e) => {
        e.preventDefault(); //prevent the page to load
    };
    return (
        <>
            <div className="Container">
                <div className="Form rounded-3xl">
                    <h1 className="Form_title text-6xl ">Register</h1>
                    <form onSubmit={registerUser}>
                        <div className="Form_group">
                            <label htmlFor="Name" className="Form_label block">
                                Name
                            </label>
                            <input
                                type="text"
                                id="Name"
                                className="Form_input rounded-lg"
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData({ ...data, name: e.target.value })
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
                </div>
            </div>
        </>
    );
};

export default register;
