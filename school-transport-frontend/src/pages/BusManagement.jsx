// src/pages/BusManagement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api'; // ✅ import the axios instance


const BusManagement = () => {
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({ busNumber: '', routeNumber: '', capacity: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    // const res = await axios.get('/api/buses');
    const res = await api.get('/buses'); // ✅
    setBuses(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
    //   await axios.put(`/api/buses/${editingId}`, formData);
    await api.put(`/buses/${editingId}`, formData); // ✅
    } else {
    //   await axios.post('/api/buses', formData);
    await api.post('/buses', formData); // ✅
    }
    setFormData({ busNumber: '', routeNumber: '', capacity: '', status: 'Active' });
    setEditingId(null);
    fetchBuses();
  };

  const handleEdit = (bus) => {
    setFormData(bus);
    setEditingId(bus._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this bus?')) {
    //   await axios.delete(`/api/buses/${id}`);
    await api.delete(`/buses/${id}`); // ✅
      fetchBuses();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Bus Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 bg-gray-100 p-4 rounded mb-6">
        <input name="busNumber" value={formData.busNumber} onChange={handleChange} placeholder="Bus Number" className="p-2 border rounded" required />
        <input name="routeNumber" value={formData.routeNumber} onChange={handleChange} placeholder="Route Number" className="p-2 border rounded" required />
        <input name="capacity" type="number" value={formData.capacity} onChange={handleChange} placeholder="Capacity" className="p-2 border rounded" required />
        <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="col-span-4  text-black p-2 rounded hover:bg-blue-600 bg-amber-700">
          {editingId ? 'Update Bus' : 'Add Bus'}
        </button>
      </form>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Bus Number</th>
            <th className="p-2 border">Route Number</th>
            <th className="p-2 border">Capacity</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus._id} className="border-t">
              <td className="p-2 border">{bus.busNumber}</td>
              <td className="p-2 border">{bus.routeNumber}</td>
              <td className="p-2 border">{bus.capacity}</td>
              <td className="p-2 border">{bus.status}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(bus)} className="bg-yellow-500 text-black px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(bus._id)} className="bg-red-500 text-black px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusManagement;
