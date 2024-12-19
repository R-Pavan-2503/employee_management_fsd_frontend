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
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
        setSuccessMessage(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/employees/add`, formData);
            setSuccessMessage("Employee added successfully!");
            fetchEmployees();
            resetForm();
        } catch (error) {
            console.error("Error adding employee:", error);
            setError(error.response?.data?.message || "An unexpected error occurred");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/employees/delete/${id}`);
            setSuccessMessage("Employee deleted successfully!");
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
            setError("Failed to delete employee.");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Employee Management
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            placeholder="Employee ID"
                            required
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            required
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Department"
                            required
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                            type="date"
                            name="dateOfJoining"
                            value={formData.dateOfJoining}
                            onChange={handleChange}
                            required
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Role"
                            required
                            className="block w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md"
                        >
                            Add Employee
                        </button>
                    </form>
                </div>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <h3 className="text-xl font-semibold mb-4">Employee List</h3>
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b">Name</th>
                            <th className="px-6 py-3 border-b">Employee ID</th>
                            <th className="px-6 py-3 border-b">Email</th>
                            <th className="px-6 py-3 border-b">Department</th>
                            <th className="px-6 py-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="px-6 py-3 border-b">{employee.name}</td>
                                <td className="px-6 py-3 border-b">{employee.employeeId}</td>
                                <td className="px-6 py-3 border-b">{employee.email}</td>
                                <td className="px-6 py-3 border-b">{employee.department}</td>
                                <td className="px-6 py-3 border-b">
                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeForm;
