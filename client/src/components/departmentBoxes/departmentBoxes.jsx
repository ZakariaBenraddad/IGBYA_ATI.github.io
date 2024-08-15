//import React from "react";
import "./departementBoxes.css";
function DepartmentBoxes({ department }) {
    return (
        <>
            <div className="box">
                <h1 className="nameDepartment">{department.name}</h1>
                <h2 className="nameChefDepartement">
                    {department.chefDepartment}
                </h2>
                <p className="nombreEmployee">Nombre employer</p>
            </div>
        </>
    );
}

export default DepartmentBoxes;
