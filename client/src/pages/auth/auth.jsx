//import React from "react";
import "./auth.css";
const auth = () => {
    return (
        <>
            <div className="Container ">
                <div className="Form rounded-3xl">
                    <h1 className="Form_title text-6xl ">Authentication</h1>
                    <form>
                        <div className="Form_group">
                            <label htmlFor="email" className="Form_label block">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="Form_input rounded-lg"
                                placeholder="Email"
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
                            />
                        </div>
                        <button className="Form_button">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default auth;
