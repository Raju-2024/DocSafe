// src/App.jsx
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase/config";
import { setUser, logout } from "./features/authSlice";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
        }));
      } else {
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading DigiLocker...
      </div>
    );
  }

  return (
    <div className="flex">
      {user && <Sidebar />}
      <div className="flex-1">
        {user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/upload"
            element={user ? <Upload /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
