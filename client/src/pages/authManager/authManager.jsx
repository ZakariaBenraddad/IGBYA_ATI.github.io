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
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        if (type === "checkbox") {
            setFormData((prevState) => {
                const serviceRequested = prevState.serviceRequested;
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
        } else if (
            name.startsWith("requester") ||
            name.startsWith("beneficiary")
        ) {
            const [section, key] = name.split(".");
            setFormData((prevState) => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [key]: value,
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
        try {
            const response = await axios.post(
                "http://localhost:8000/api/generate-document",
                formData,
                {
                    responseType: "blob", // Important for receiving binary data
                }
            );

            // Create a Blob from the response data
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            // Create a link element and trigger download
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "generated_document.docx";
            link.click();

            console.log("Document generated successfully");
        } catch (error) {
            console.error("Error generating document:", error);
        }
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="bg-white p-16 rounded-lg shadow-lg max-w-4xl w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl mb-2 text-gray-800 border-b-2 border-teal-700 pb-1">
                        Type de la demande :
                    </h2>
                    <div className="mb-5">
                        <label className="block text-gray-900">
                            <input
                                type="radio"
                                name="requestType"
                                value="creation"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Création</span>
                        </label>
                        <label className="block text-gray-900">
                            <input
                                type="radio"
                                name="requestType"
                                value="modification"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Modification</span>
                        </label>
                        <label className="block text-gray-900">
                            <input
                                type="radio"
                                name="requestType"
                                value="suppression"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Suppression</span>
                        </label>
                        <label className="block text-gray-900">
                            <input
                                type="radio"
                                name="requestType"
                                value="debridage"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Débridage de poste</span>
                        </label>
                    </div>

                    <h2 className="text-xl mb-2 text-gray-800 border-b-2 border-teal-700 pb-1">
                        Service demandé :
                    </h2>
                    <div className="mb-5">
                        <label className="block text-gray-900">
                            <input
                                type="checkbox"
                                name="serviceRequested"
                                value="accessRemoteUserToSiRam"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Accès distant d’un user RAM au SI RAM
                        </label>
                        <label className="block text-gray-900">
                            <input
                                type="checkbox"
                                name="serviceRequested"
                                value="accessNonStandardUserToWeb"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Accès non standard d’un user RAM au Web
                        </label>
                        <label className="block text-gray-900">
                            <input
                                type="checkbox"
                                name="serviceRequested"
                                value="accessRemotePartner"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Accès distant pour partenaire
                        </label>
                        <label className="block text-gray-900">
                            <input
                                type="checkbox"
                                name="serviceRequested"
                                value="accessLanForContractors"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Accès LAN pour prestataires
                        </label>
                        <label className="block text-gray-900">
                            <input
                                type="checkbox"
                                name="serviceRequested"
                                value="other"
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Autre (à préciser en complément)
                        </label>
                    </div>

                    <h2 className="text-xl mb-2 text-gray-800 border-b-2 border-teal-700 pb-1">
                        Demandeur (RAM) :
                    </h2>
                    <div className="mb-5">
                        <label className="block mb-4 text-gray-900">
                            Nom:
                            <input
                                type="text"
                                name="requester.lastName"
                                value={formData.requester.lastName}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Prénom:
                            <input
                                type="text"
                                name="requester.firstName"
                                value={formData.requester.firstName}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Matricule:
                            <input
                                type="text"
                                name="requester.employeeId"
                                value={formData.requester.employeeId}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Direction:
                            <input
                                type="text"
                                name="requester.department"
                                value={formData.requester.department}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Site:
                            <input
                                type="text"
                                name="requester.site"
                                value={formData.requester.site}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Date demande:
                            <input
                                type="date"
                                name="requester.requestDate"
                                value={formData.requester.requestDate}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                    </div>

                    <h2 className="text-xl mb-2 text-gray-800 border-b-2 border-teal-700 pb-1">
                        Bénéficiaire (si autre que demandeur):
                    </h2>
                    <div className="mb-5">
                        <label className="block mb-4 text-gray-900">
                            Nom:
                            <input
                                type="text"
                                name="beneficiary.lastName"
                                value={formData.beneficiary.lastName}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Prénom:
                            <input
                                type="text"
                                name="beneficiary.firstName"
                                value={formData.beneficiary.firstName}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Matricule:
                            <input
                                type="text"
                                name="beneficiary.employeeId"
                                value={formData.beneficiary.employeeId}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Phone:
                            <input
                                type="tel"
                                name="beneficiary.phone"
                                value={formData.beneficiary.phone}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Email:
                            <input
                                type="email"
                                name="beneficiary.email"
                                value={formData.beneficiary.email}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                        <label className="block mb-4 text-gray-900">
                            Société Partenaire:
                            <input
                                type="text"
                                name="beneficiary.partnerCompany"
                                value={formData.beneficiary.partnerCompany}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-800 rounded"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-teal-700 text-white text-lg rounded hover:bg-teal-800 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthManager;
