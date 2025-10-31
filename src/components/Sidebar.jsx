// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { Home, Upload, Share2, User } from "lucide-react";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/upload", label: "Upload", icon: <Upload size={20} /> },
    { to: "/shared", label: "Shared", icon: <Share2 size={20} /> },
    { to: "/profile", label: "Profile", icon: <User size={20} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-md p-4 space-y-4 sticky top-0 h-screen">
      {links.map(({ to, label, icon }) => (
        <Link key={label} to={to}
          className="flex items-center space-x-2 hover:bg-blue-50 p-2 rounded-md text-gray-700 font-medium">
          {icon}<span>{label}</span>
        </Link>
      ))}
    </aside>
  );
}
