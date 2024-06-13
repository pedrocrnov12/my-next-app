import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from 'contexts/AuthContext'; // Corregir la ruta de importación del contexto de autenticación

// SVG para el ícono de usuario
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 14l2-2 5 5L19 7l2 2" />
  </svg>
);


const Header: React.FC = () => {
  const { user, logout } = useAuth(); // Obtener el estado de autenticación del contexto
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Estado para mostrar/ocultar el menú del perfil

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <a className="text-2xl font-bold">BlogFace</a>
        </Link>
        <nav>
          {/* Mostrar diferentes elementos dependiendo del estado de autenticación */}
          {user ? (
            // Mostrar el ícono de usuario si el usuario está autenticado
            <div className="relative">
              <div className="cursor-pointer" onClick={handleProfileClick}>
                <UserIcon />
              </div>
              {/* Mostrar el menú del perfil si está abierto */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Ver mi perfil
                    </a>
                    <a
                      href="#"
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Cerrar sesión
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Mostrar los enlaces de inicio de sesión y registro si el usuario no está autenticado
            <>
              <Link href="/auth/login">
                <a className="mr-4">Login</a>
              </Link>
              <Link href="/auth/register">
                <a>Register</a>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
