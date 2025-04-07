// src/pages/StudentRegistration.jsx
import React, { useState, useEffect } from "react";
import api from "../services/api";

const StudentRegistration = () => {
  const [routes, setRoutes] = useState([]);
  //   const [students, setStudents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    boardingPoint: "",
    routePreference: "",
    feeAmount: "",
    paymentStatus: "Pending",
    registrationDate: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRoutes();
    fetchRegistrations();
  }, []);

  const fetchRoutes = async () => {
    const res = await api.get("/routes");
    setRoutes(res.data);
  };

  //   const fetchStudents = async () => {
  //     const res = await api.get("/students");
  //     setStudents(res.data);
  //   };

  const fetchRegistrations = async () => {
    const res = await api.get("/registrations");
    setRegistrations(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/registrations/${editingId}`, formData);
      } else {
        await api.post("/registrations", formData);
      }
      setFormData({
        studentId: "",
        boardingPoint: "",
        routePreference: "",
        feeAmount: "",
        paymentStatus: "Pending",
        registrationDate: new Date().toISOString().split("T")[0],
      });
      setEditingId(null);
      fetchRegistrations();
    } catch (err) {
      alert("Error: " + err.response?.data?.error || err.message);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      studentId: student.studentId,
      boardingPoint: student.boardingPoint,
      routePreference: student.routePreference._id,
      feeAmount: student.feeAmount,
      paymentStatus: student.paymentStatus,
      registrationDate:
        student.registrationDate || new Date().toISOString().split("T")[0],
    });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this registration?")) {
      await api.delete(`/registrations/${id}`);
      fetchRegistrations();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Student Transport Registration
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-4 gap-4 bg-gray-100 p-4 rounded mb-6"
      >
        <input
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="Student ID"
          className="p-2 border rounded"
          required
        />
        <input
          name="boardingPoint"
          value={formData.boardingPoint}
          onChange={handleChange}
          placeholder="Boarding Point"
          className="p-2 border rounded"
          required
        />
        <select
          name="routePreference"
          value={formData.routePreference}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={route._id} value={route._id}>
              {route.routeNumber} ({route.startingPoint} → {route.endingPoint})
            </option>
          ))}
        </select>
        <input
          name="feeAmount"
          type="number"
          value={formData.feeAmount}
          onChange={handleChange}
          placeholder="Fee Amount"
          className="p-2 border rounded"
          required
        />
        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <input
          type="date"
          name="registrationDate"
          value={formData.registrationDate}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="col-span-4 bg-blue-500 text-black p-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Registration" : "Register Student"}
        </button>
      </form>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Student ID</th>
            <th className="p-2 border">Boarding Point</th>
            <th className="p-2 border">Route</th>
            <th className="p-2 border">Fee</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((stu) => (
            <tr key={stu._id} className="border-t">
              <td className="p-2 border">{stu.studentId}</td>
              <td className="p-2 border">{stu.boardingPoint}</td>
              <td className="p-2 border">
                {stu.routePreference?.routeNumber} (
                {stu.routePreference?.startingPoint} →{" "}
                {stu.routePreference?.endingPoint})
              </td>
              <td className="p-2 border">₹{stu.feeAmount}</td>
              <td className="p-2 border">{stu.paymentStatus}</td>
              <td className="p-2 border">
                {new Date(stu.registrationDate).toLocaleDateString()}
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(stu)}
                  className="bg-yellow-500 text-black px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stu._id)}
                  className="bg-red-500 text-black px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRegistration;
