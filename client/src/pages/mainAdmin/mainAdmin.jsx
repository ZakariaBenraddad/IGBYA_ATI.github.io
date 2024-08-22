//import React from "react";
import "./mainAdmin.css";
import Menu from "../../assets/menu.png";
import Zak from "../../assets/zak.jpg";
import DepartmentBoxes from "../../components/departmentBoxes/departmentBoxes";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:8000";
const MainAdmin = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios
            .get("/api/departments")
            .then((response) => {
                console.log("Departments fetched:", response.data);
                setDepartments(response.data);
            })
            .catch((err) => console.log(err));
    }, []);
    const [query, setQuery] = useState("");

    return (
        <div className="container">
            <div className="mainSection">
                <div className="header">
                    <img className="menuLogo" src={Menu} alt="menu logo" />
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="profileSection">
                        <div>
                            <img
                                src={Zak}
                                alt="profile"
                                className="profilePic"
                            />
                        </div>
                        <div className="profileTextField">
                            <h2 className="profileUserName">
                                Zakaria benraddad
                            </h2>
                            {/* Depends on the user */}
                            <p className="profileUserJob">Developer Web</p>
                            {/* Depends on the user */}
                        </div>
                    </div>
                </div>
                <div className="heroSection">
                    <div className="employeesCountSection">
                        <h1 className="allEmployees">All Employees:</h1>
                        <div>
                            <h2></h2>
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
                <div className="centerDepartment">
                    <div className="departmentGrid">
                        {departments
                            .filter((department) =>
                                department.name.includes(query)
                            )
                            .map((department) => (
                                <DepartmentBoxes
                                    key={department._id}
                                    department={department}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainAdmin;
