import React from "react";
import { Link } from "react-router-dom";
import {
  BusFront,
  Route,
  Users,
  ClipboardList,
  MapPinned,
} from "lucide-react";

const Dashboard = () => {
  const modules = [
    {
      name: "Bus Management",
      description: "Manage buses and their capacities.",
      icon: <BusFront className="w-8 h-8 text-blue-600" />,
      link: "/buses",
    },
    {
      name: "Route Management",
      description: "Manage and assign routes.",
      icon: <Route className="w-8 h-8 text-green-600" />,
      link: "/routes",
    },
    {
      name: "Personnel Management",
      description: "Manage drivers, cleaners, and incharges.",
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      link: "/personnel",
    },
    {
      name: "Student Registrations",
      description: "View and manage student transport registrations.",
      icon: <ClipboardList className="w-8 h-8 text-purple-600" />,
      link: "/registrations",
    },
    // {
    //   name: "Live Location (Coming Soon)",
    //   description: "Track buses in real-time.",
    //   icon: <MapPinned className="w-8 h-8 text-red-600" />,
    //   link: "#",
    // },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">School Transport Management System</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <Link
            key={mod.name}
            to={mod.link}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-200 border hover:border-blue-500"
          >
            <div className="flex items-center space-x-4">
              {mod.icon}
              <div>
                <h2 className="text-xl font-semibold">{mod.name}</h2>
                <p className="text-sm text-gray-500">{mod.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
