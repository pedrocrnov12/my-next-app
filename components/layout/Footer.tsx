// components/layout/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} BlogFace hecho por pedro alv. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
