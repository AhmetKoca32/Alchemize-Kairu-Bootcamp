// ... existing code ...
import React from 'react';
import { Outlet } from 'react-router-dom'; // children yerine Outlet kullanacağız
import Sidebar from './Sidebar'; // Sidebar bileşenini import ediyoruz

const Layout = () => { // props olarak children almayacak
  console.log("Layout bileşeni render ediliyor."); // Bu satırı ekleyin
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 bg-gray-50"> {/* Sidebar genişliği kadar margin */}
        <Outlet /> {/* Layout içindeki alt rotaları burada render et */}
      </main>
    </div>
  );
};

export default Layout;