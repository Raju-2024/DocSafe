// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">DocSafe</h1>

      <div className="flex items-center space-x-6">
        {user && (
          <>
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/upload" className="text-gray-700 hover:text-blue-600 font-medium">Upload</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
