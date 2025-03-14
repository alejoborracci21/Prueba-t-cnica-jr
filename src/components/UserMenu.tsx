import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export default function UserMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = getAuth();

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    signOut(auth);
    console.log("Cerrar sesión");
  };

  const handleViewHistory = () => {
    // Lógica para ver historial
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
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Cerrar sesión
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleViewHistory}
            >
              Ver historial
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}