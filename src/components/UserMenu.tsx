import { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/');
  };

  const handleViewHistory = () => {
    console.log("Ver historial");
  };

  return (
    <div className="relative flex justify-end p-4">
      <button
        className="flex items-center space-x-2"
        onClick={handleToggleDropdown}
      >
        <img
          src="/user-icon.svg"
          alt="User"
          className="w-16 h-16 rounded-full"
        />
      </button>
      {showDropdown && (
        <div className="absolute top-20 right-4 bg-white shadow-md rounded-lg w-48">
          <ul className="py-2">
            {isLoggedIn ? (
              <>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            ) : (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogin}
              >
                Login
              </li>
            )}
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleViewHistory}
            >
              View history
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}