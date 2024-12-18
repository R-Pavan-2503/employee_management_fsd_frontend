import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeForm = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [formData, setFormData] = useState({
        name: "",
        employeeId: "",
        email: "",
        phone: "",
        department: "",
        dateOfJoining: "",
        role: "",
    });

    const [employees, setEmployees] = useState([]);
    const [viewingEmployees, setViewingEmployees] = useState(false);
    const [error, setError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            employeeId: "",
            email: "",
            phone: "",
            department: "",
            dateOfJoining: "",
            role: "",
        });
        setError(null);
        setSubmitSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitSuccess(false);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/employees/add`, formData);
            console.log("Employee added:", response.data);
            setSubmitSuccess(true);
            setTimeout(() => {
                resetForm();
            }, 3000);
        } catch (error) {
            console.error("Error adding employee:", error);
            setError(error.response?.data?.message || "An unexpected error occurred");
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/employees/list`);
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
            setError("Unable to fetch employees.");
        }
    };

    const handleViewEmployees = () => {
        fetchEmployees();
        setViewingEmployees(true);
    };

    const handleGoBack = () => {
        setViewingEmployees(false);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {viewingEmployees ? (
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold text-white">
                        Employee List
                    </h2>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">
                            <span>{error}</span>
                        </div>
                    )}
                    <ul className="mt-4 bg-white shadow-lg rounded-lg px-6 py-4">
                        {employees.map((employee) => (
                            <li key={employee.employeeId} className="border-b py-2">
                                {employee.name} - {employee.role}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleGoBack}
                        className="mt-4 w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
                    >
                        Go Back
                    </button>
                </div>
            ) : (
                <div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-bold text-white">
                            Employee Registration
                        </h2>
                        <p className="mt-2 text-center text-sm text-white">
                            Please enter the details to register the employee
                        </p>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white shadow-xl sm:rounded-lg sm:px-10 py-8 px-6">
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">
                                    <span>{error}</span>
                                </div>
                            )}
                            {submitSuccess && (
                                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md">
                                    <span>Employee added successfully!</span>
                                </div>
                            )}
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                                        Employee ID
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="employeeId"
                                            name="employeeId"
                                            type="text"
                                            required
                                            value={formData.employeeId}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                        Department
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="department"
                                            name="department"
                                            required
                                            value={formData.department}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm "
                                        >
                                            <option value="">Select Department</option>
                                            <option value="HR">HR</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="dateOfJoining" className="block text-sm font-medium text-gray-700">
                                        Date of Joining
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="dateOfJoining"
                                            name="dateOfJoining"
                                            type="date"
                                            required
                                            value={formData.dateOfJoining}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 "
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                        Role
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="role"
                                            name="role"
                                            type="text"
                                            required
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 "
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-4 mt-6">
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg shadow"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-lg shadow"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleViewEmployees}
                                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow"
                                    >
                                        View Employees
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeForm;
