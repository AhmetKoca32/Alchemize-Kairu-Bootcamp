// ... existing code ...
import { BriefcaseIcon, CogIcon, CommandLineIcon, DocumentTextIcon, HomeIcon, MapIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  console.log("Sidebar bileşeni render ediliyor."); // Bu satırı ekleyin
  const location = useLocation();
  const userName = "Ahmet Koca"; 

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'CV Yönetimi', href: '/cv', icon: DocumentTextIcon },
    { name: 'Projelerim', href: '/projects', icon: CommandLineIcon },
    { name: 'Kariyer Yol Haritası', href: '/career-roadmap', icon: MapIcon }, 
    { name: 'İş İlanları', href: '/job-matches', icon: BriefcaseIcon },    
    { name: 'Ayarlar', href: '/settings', icon: CogIcon }, 
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white flex flex-col p-4 shadow-xl z-50">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700 mb-6">
        <span className="text-2xl font-bold text-indigo-400">Alchemize</span>
      </div>

      {/* Navigasyon */}
      <nav className="flex-grow space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center p-3 rounded-lg transition-colors duration-200 
              ${location.pathname === item.href 
                ? 'bg-indigo-700 text-white shadow-md' 
                : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Kullanıcı Profili / Ayarlar */}
      <div className="mt-auto border-t border-gray-700 pt-4">
        <Link 
          to="/profile" 
          className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200"
        >
          <UserCircleIcon className="w-8 h-8 rounded-full mr-3 text-gray-400" />
          <div>
            <div className="text-sm font-medium">{userName}</div>
            <div className="text-xs text-gray-400">Profil Ayarları</div>
          </div>
        </Link>
        <button 
          onClick={() => console.log('Çıkış Yap')} 
          className="w-full mt-2 p-3 text-sm text-red-400 hover:bg-red-900 rounded-lg transition-colors duration-200 text-left"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Sidebar;