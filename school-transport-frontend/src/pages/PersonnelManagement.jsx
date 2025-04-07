// src/pages/PersonnelManagement.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Axios instance (api.js)

const PersonnelManagement = () => {
  const [buses, setBuses] = useState([]);
  const [personnelList, setPersonnelList] = useState([]);
  const [formData, setFormData] = useState({
    busId: '',
    driver: { name: '', contactNumber: '', licenseDetails: '' },
    cleaner: { name: '', contactNumber: '' },
    incharge: { name: '', contactNumber: '', email: '' }
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBuses();
    fetchPersonnel();
  }, []);

  const fetchBuses = async () => {
    const res = await api.get('/buses');
    setBuses(res.data);
  };

  const fetchPersonnel = async () => {
    const res = await api.get('/personnel');
    setPersonnelList(res.data);
  };

  const handleChange = (e, section) => {
    if (section) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [e.target.name]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/personnel/${editingId}`, formData);
    } else {
      await api.post('/personnel', formData);
    }
    setFormData({
      busId: '',
      driver: { name: '', contactNumber: '', licenseDetails: '' },
      cleaner: { name: '', contactNumber: '' },
      incharge: { name: '', contactNumber: '', email: '' }
    });
    setEditingId(null);
    fetchPersonnel();
  };

  const handleEdit = (personnel) => {
    setFormData(personnel);
    setEditingId(personnel._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this personnel record?')) {
      await api.delete(`/personnel/${id}`);
      fetchPersonnel();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Personnel Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 bg-gray-100 p-4 rounded mb-6">
        <select
          name="busId"
          value={formData.busId}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Bus</option>
          {buses.map((bus) => (
            <option key={bus._id} value={bus._id}>
              {bus.busNumber} ({bus.routeNumber})
            </option>
          ))}
        </select>

        <input name="name" placeholder="Driver Name" value={formData.driver.name} onChange={(e) => handleChange(e, 'driver')} className="p-2 border rounded" required />
        <input name="contactNumber" placeholder="Driver Contact" value={formData.driver.contactNumber} onChange={(e) => handleChange(e, 'driver')} className="p-2 border rounded" required />
        <input name="licenseDetails" placeholder="Driver License" value={formData.driver.licenseDetails} onChange={(e) => handleChange(e, 'driver')} className="p-2 border rounded" />

        <input name="name" placeholder="Cleaner Name" value={formData.cleaner.name} onChange={(e) => handleChange(e, 'cleaner')} className="p-2 border rounded" required />
        <input name="contactNumber" placeholder="Cleaner Contact" value={formData.cleaner.contactNumber} onChange={(e) => handleChange(e, 'cleaner')} className="p-2 border rounded" required />

        <input name="name" placeholder="Incharge Name" value={formData.incharge.name} onChange={(e) => handleChange(e, 'incharge')} className="p-2 border rounded" required />
        <input name="contactNumber" placeholder="Incharge Contact" value={formData.incharge.contactNumber} onChange={(e) => handleChange(e, 'incharge')} className="p-2 border rounded" required />
        <input name="email" placeholder="Incharge Email" value={formData.incharge.email} onChange={(e) => handleChange(e, 'incharge')} className="p-2 border rounded" />

        <button type="submit" className="col-span-3 bg-blue-500 text-black p-2 rounded hover:bg-blue-600">
          {editingId ? 'Update Personnel' : 'Add Personnel'}
        </button>
      </form>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Bus</th>
            <th className="p-2 border">Driver</th>
            <th className="p-2 border">Cleaner</th>
            <th className="p-2 border">Incharge</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnelList.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2 border">{p.busId?.busNumber} ({p.busId?.routeNumber})</td>
              <td className="p-2 border">
                {p.driver.name} <br /> {p.driver.contactNumber} <br /> {p.driver.licenseDetails}
              </td>
              <td className="p-2 border">
                {p.cleaner.name} <br /> {p.cleaner.contactNumber}
              </td>
              <td className="p-2 border">
                {p.incharge.name} <br /> {p.incharge.contactNumber} <br /> {p.incharge.email}
              </td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-black px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-black px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonnelManagement;
