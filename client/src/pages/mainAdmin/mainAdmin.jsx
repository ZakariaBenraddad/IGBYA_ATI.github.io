import "./mainAdmin.css";
import Menu from "../../assets/menu.png";
import Zak from "../../assets/zak.jpg";
import DepartmentBoxes from "../../components/departmentBoxes/departmentBoxes";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoList from "../../components/TodoList";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true; // Important for sending cookies with requests

const MainAdmin = () => {
    const [departments, setDepartments] = useState([]);
    const [showTodoList, setShowTodoList] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/api/departments")
            .then((response) => {
                console.log("Departments fetched:", response.data);
                setDepartments(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("/api/admin/logout");
            localStorage.removeItem("token"); // Remove the token
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="container">
            <div className="mainSection">
                <div className="header">
                    <img
                        className="menuLogo"
                        src={Menu}
                        alt="menu logo"
                        onClick={() => setShowTodoList(!showTodoList)}
                        style={{ cursor: "pointer" }}
                    />
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
                            <p className="profileUserJob">Developer Web</p>
                        </div>
                        <button onClick={handleLogout} className="logoutButton">
                            Logout
                        </button>
                    </div>
                </div>
                <div className="heroSection">
                    <div className="employeesCountSection">
                        <h1 className="allEmployees">
                            All Dapartements: {departments.length}
                        </h1>
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
            {showTodoList && (
                <div className="todo-list-popup">
                    <TodoList />
                    <button
                        className="close-button"
                        onClick={() => setShowTodoList(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default MainAdmin;
