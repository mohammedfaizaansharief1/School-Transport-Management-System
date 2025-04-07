import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Axios instance

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState({
    routeNumber: '',
    startingPoint: '',
    endingPoint: '',
    intermediateStops: [],
    stops: [],
    status: 'Active',
  });
  const [intermediateInput, setIntermediateInput] = useState('');
  const [stop, setStop] = useState({ name: '', latitude: '', longitude: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const res = await api.get('/routes');
    setRoutes(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIntermediateAdd = () => {
    if (intermediateInput.trim() !== '') {
      setFormData({
        ...formData,
        intermediateStops: [...formData.intermediateStops, intermediateInput],
      });
      setIntermediateInput('');
    }
  };

  const handleStopAdd = () => {
    if (stop.name && stop.latitude && stop.longitude) {
      setFormData({
        ...formData,
        stops: [...formData.stops, stop],
      });
      setStop({ name: '', latitude: '', longitude: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/routes/${editingId}`, formData);
    } else {
      await api.post('/routes', formData);
    }
    setFormData({
      routeNumber: '',
      startingPoint: '',
      endingPoint: '',
      intermediateStops: [],
      stops: [],
      status: 'Active',
    });
    setEditingId(null);
    fetchRoutes();
  };

  const handleEdit = (route) => {
    setFormData(route);
    setEditingId(route._id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this route?')) {
      await api.delete(`/routes/${id}`);
      fetchRoutes();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Route Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded mb-6">
        <input name="routeNumber" value={formData.routeNumber} onChange={handleChange} placeholder="Route Number" className="p-2 border rounded" required />
        <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <input name="startingPoint" value={formData.startingPoint} onChange={handleChange} placeholder="Starting Point" className="p-2 border rounded" required />
        <input name="endingPoint" value={formData.endingPoint} onChange={handleChange} placeholder="Ending Point" className="p-2 border rounded" required />

        {/* Intermediate Stops */}
        <div className="col-span-2">
          <label className="block mb-1">Intermediate Stops</label>
          <div className="flex gap-2 mb-2">
            <input value={intermediateInput} onChange={(e) => setIntermediateInput(e.target.value)} placeholder="Add Intermediate Stop" className="p-2 border rounded w-full" />
            <button type="button" onClick={handleIntermediateAdd} className="bg-blue-500 text-black px-4 py-2 rounded">Add</button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {formData.intermediateStops.map((stop, i) => (
              <li key={i} className="bg-gray-300 px-2 py-1 rounded">{stop}</li>
            ))}
          </ul>
        </div>

        {/* Stop Coordinates */}
        <div className="col-span-2">
          <label className="block mb-1">Stops with Coordinates</label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <input value={stop.name} onChange={(e) => setStop({ ...stop, name: e.target.value })} placeholder="Stop Name" className="p-2 border rounded" />
            <input value={stop.latitude} onChange={(e) => setStop({ ...stop, latitude: e.target.value })} placeholder="Latitude" className="p-2 border rounded" />
            <input value={stop.longitude} onChange={(e) => setStop({ ...stop, longitude: e.target.value })} placeholder="Longitude" className="p-2 border rounded" />
          </div>
          <button type="button" onClick={handleStopAdd} className="bg-green-600 text-black px-4 py-2 rounded">Add Stop</button>
          <ul className="mt-2 space-y-1">
            {formData.stops.map((s, i) => (
              <li key={i} className="text-sm">{s.name} - ({s.latitude}, {s.longitude})</li>
            ))}
          </ul>
        </div>

        <button type="submit" className="col-span-2 bg-blue-600 text-black py-2 rounded hover:bg-blue-700">
          {editingId ? 'Update Route' : 'Add Route'}
        </button>
      </form>

      {/* Table to display routes */}
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Route No.</th>
            <th className="p-2 border">Start - End</th>
            <th className="p-2 border">Intermediate Stops</th>
            <th className="p-2 border"># of Geo Stops</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route._id} className="border-t">
              <td className="p-2 border">{route.routeNumber}</td>
              <td className="p-2 border">{route.startingPoint} - {route.endingPoint}</td>
              {/* <td className="p-2 border">{route.intermediateStops.join(', ')}</td>
              <td className="p-2 border">{route.stops.length}</td> */}
              <td className="p-2 border">
              {Array.isArray(route.intermediateStops) ? route.intermediateStops.join(', ') : 'No stops'}
              </td>
              <td className="p-2 border">{Array.isArray(route.stops) ? route.stops.length : 0}</td>

              <td className="p-2 border">{route.status}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleEdit(route)} className="bg-yellow-500 text-black px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(route._id)} className="bg-red-600 text-black px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteManagement;
