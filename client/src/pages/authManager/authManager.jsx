import { useState } from "react";
import axios from "axios";

const AuthManager = () => {
    const [formData, setFormData] = useState({
        requestType: "",
        serviceRequested: [],
        requester: {
            lastName: "",
            firstName: "",
            employeeId: "",
            department: "",
            site: "",
            requestDate: "",
        },
        beneficiary: {
            lastName: "",
            firstName: "",
            employeeId: "",
            phone: "",
            email: "",
            partnerCompany: "",
        },
        need: {
            usage: "",
            duration: {
                permanent: false,
                temporary: false,
                from: "",
                to: "",
            },
        },
        description: "",
        signatures: {
            requesterDirector: "",
            functionalAdministrator: "",
            sigeResponsible: "",
            rssi: "",
        },
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        if (type === "checkbox") {
            if (name.startsWith("need.duration")) {
                const durationKey = name.split(".")[2];
                setFormData((prevState) => ({
                    ...prevState,
                    need: {
                        ...prevState.need,
                        duration: {
                            ...prevState.need.duration,
                            [durationKey]: checked,
                        },
                    },
                }));
            } else {
                setFormData((prevState) => {
                    const serviceRequested = [...prevState.serviceRequested];
                    if (checked) {
                        serviceRequested.push(value);
                    } else {
                        const index = serviceRequested.indexOf(value);
                        if (index > -1) {
                            serviceRequested.splice(index, 1);
                        }
                    }
                    return { ...prevState, serviceRequested };
                });
            }
        } else if (name.includes(".")) {
            const [section, key, subKey] = name.split(".");
            setFormData((prevState) => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [key]: subKey
                        ? {
                              ...prevState[section][key],
                              [subKey]: value,
                          }
                        : value,
                },
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/generate-document",
                formData,
                {
                    responseType: "json",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data && response.data.buffer) {
                const blob = new Blob([new Uint8Array(response.data.buffer)], {
                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "formulaire_demande_acces.docx");
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error generating document:", error);
            alert(
                `Error generating document: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b-2 border-teal-700 pb-4">
                    FICHE DE DEMANDE SECURITE
                </h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-teal-700 pb-2">
                            Type de la demande
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {[
                                "Création",
                                "Modification",
                                "Suppression",
                                "Débridage de poste",
                            ].map((type) => (
                                <label
                                    key={type}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value={type.toLowerCase()}
                                        onChange={handleChange}
                                        className="form-radio text-teal-600 focus:ring-teal-500"
                                    />
                                    <span className="text-gray-700">
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-teal-700 pb-2">
                            Service demandé
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Accès distant d'un user RAM au SI RAM",
                                "Accès non standard d'un user RAM au Web",
                                "Accès distant pour partenaire",
                                "Accès LAN pour prestataires",
                                "Autre (à préciser en complément)",
                            ].map((service) => (
                                <label
                                    key={service}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        name="serviceRequested"
                                        value={service}
                                        onChange={handleChange}
                                        className="form-checkbox text-teal-600 focus:ring-teal-500"
                                    />
                                    <span className="text-gray-700">
                                        {service}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-teal-700 pb-2">
                            Demandeur (RAM)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "lastName",
                                "firstName",
                                "employeeId",
                                "department",
                                "site",
                                "requestDate",
                            ].map((field) => (
                                <label key={field} className="block">
                                    <span className="text-gray-700 font-medium">
                                        {field.charAt(0).toUpperCase() +
                                            field
                                                .slice(1)
                                                .replace(/([A-Z])/g, " $1")
                                                .trim()}
                                        :
                                    </span>
                                    <input
                                        type={
                                            field === "requestDate"
                                                ? "date"
                                                : "text"
                                        }
                                        name={`requester.${field}`}
                                        value={formData.requester[field]}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-teal-700 pb-2">
                            Bénéficiaire (si autre que demandeur)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "lastName",
                                "firstName",
                                "employeeId",
                                "phone",
                                "email",
                                "partnerCompany",
                            ].map((field) => (
                                <label key={field} className="block">
                                    <span className="text-gray-700 font-medium">
                                        {field.charAt(0).toUpperCase() +
                                            field
                                                .slice(1)
                                                .replace(/([A-Z])/g, " $1")
                                                .trim()}
                                        :
                                    </span>
                                    <input
                                        type={
                                            field === "email" ? "email" : "text"
                                        }
                                        name={`beneficiary.${field}`}
                                        value={formData.beneficiary[field]}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-teal-700 pb-2">
                            Besoin (les accès pour non RAM ne peuvent être
                            permanents)
                        </h2>
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-gray-700 font-medium">
                                    Usage:
                                </span>
                                <input
                                    type="text"
                                    name="need.usage"
                                    value={formData.need.usage}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                />
                            </label>
                            <div className="flex space-x-4">
                                {["permanent", "temporary"].map(
                                    (durationType) => (
                                        <label
                                            key={durationType}
                                            className="flex items-center space-x-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                name={`need.duration.${durationType}`}
                                                checked={
                                                    formData.need.duration[
                                                        durationType
                                                    ]
                                                }
                                                onChange={handleChange}
                                                className="form-checkbox text-teal-600 focus:ring-teal-500"
                                            />
                                            <span className="text-gray-700 capitalize">
                                                {durationType}
                                            </span>
                                        </label>
                                    )
                                )}
                            </div>
                            {formData.need.duration.temporary && (
                                <div className="flex space-x-4">
                                    {["from", "to"].map((dateType) => (
                                        <label
                                            key={dateType}
                                            className="block flex-1"
                                        >
                                            <span className="text-gray-700 font-medium capitalize">
                                                {dateType}:
                                            </span>
                                            <input
                                                type="date"
                                                name={`need.duration.${dateType}`}
                                                value={
                                                    formData.need.duration[
                                                        dateType
                                                    ]
                                                }
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                            />
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-teal-700 pb-2">
                            Description du besoin
                        </h2>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                            placeholder="Décrivez votre besoin en détail..."
                        ></textarea>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-teal-700 pb-2">
                            Signatures
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "requesterDirector",
                                "functionalAdministrator",
                                "sigeResponsible",
                                "rssi",
                            ].map((role) => (
                                <div key={role}>
                                    <h3 className="font-medium text-gray-700 mb-1">
                                        {role
                                            .split(/(?=[A-Z])/)
                                            .join(" ")
                                            .replace(/\b\w/g, (l) =>
                                                l.toUpperCase()
                                            )}
                                    </h3>
                                    <input
                                        type="text"
                                        name={`signatures.${role}`}
                                        value={formData.signatures[role]}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                                        placeholder="Nom, date et signature"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition duration-300"
                    >
                        Générer le Document
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthManager;
