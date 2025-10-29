// frontend/src/pages/Profile.js
import React, { useState } from 'react';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

// Ayarlar sayfasıyla tutarlı form bileşeni
const FormInput = ({ label, type, name, value, onChange, icon, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border-gray-300 py-2.5 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder={placeholder || label}
      />
    </div>
  </div>
);

// GitHub ikonu (SVG)
const GitHubIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

// LinkedIn ikonu (SVG)
const LinkedInIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zM3.742 5.106a1.38 1.38 0 0 1-1.38-1.383A1.383 1.383 0 1 1 3.742 5.106zm2.14 7.225V6.169h-2.4c.03-.678 0-7.225 0-7.225h2.4v1.01h.033a2.41 2.41 0 0 1 2.163-1.19c2.308 0 2.73 1.51 2.73 3.475v4.119H9.28V9.389c0-.825-.017-1.882-1.144-1.882-1.144 0-1.32.894-1.32 1.823v3.896h2.402z" />
  </svg>
);

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Ahmet Yılar",
    title: "Kıdemli Yazılım Geliştirici",
    email: "ahmet.yilar@email.com",
    phone: "+90 555 123 45 67",
    linkedin: "linkedin.com/in/ahmetyilar",
    github: "github.com/ahmetyilar",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Başlık */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Profil Yönetimi</h1>

        {/* Ana İçerik Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profil Kartı (Ana Kart) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-5 border-b pb-3">
              <UserCircleIcon className="w-8 h-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Genel Bilgiler</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Bu bilgiler CV'nizde ve işverenlere sunulan profilinizde kullanılacaktır.
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Ad Soyad"
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  icon={<UserCircleIcon className="w-5 h-5 text-gray-400" />}
                />
                <FormInput
                  label="Unvan"
                  type="text"
                  name="title"
                  value={profileData.title}
                  onChange={handleChange}
                  icon={<BriefcaseIcon className="w-5 h-5 text-gray-400" />}
                  placeholder="Örn: Yazılım Geliştirici"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Email Adresi"
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
                />
                <FormInput
                  label="Telefon Numarası"
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  icon={<PhoneIcon className="w-5 h-5 text-gray-400" />}
                />
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Sosyal Medya Linkleri</h4>
                <div className="space-y-4">
                  <FormInput
                    label="LinkedIn"
                    type="text"
                    name="linkedin"
                    value={profileData.linkedin}
                    onChange={handleChange}
                    icon={<LinkedInIcon className="w-5 h-5 text-gray-400" />}
                    placeholder="linkedin.com/in/..."
                  />
                  <FormInput
                    label="GitHub"
                    type="text"
                    name="github"
                    value={profileData.github}
                    onChange={handleChange}
                    icon={<GitHubIcon className="w-5 h-5 text-gray-400" />}
                    placeholder="github.com/..."
                  />
                </div>
              </div>

              <div className="text-right mt-6 border-t pt-6">
                <button className="flex items-center justify-center bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-800 transition duration-300 shadow-md">
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Profili Güncelle
                </button>
              </div>
            </div>
          </div>

          {/* Sağ Sütun (Yardımcı Kart) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center mb-4">
                <BriefcaseIcon className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Profil Önemi</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Profil bilgilerinizin güncel ve eksiksiz olması, AI'nin size en uygun iş ilanlarını bulmasına ve CV'nizi daha iyi optimize etmesine yardımcı olur.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-800">
                    <strong>LinkedIn</strong> ve <strong>GitHub</strong> linkleri, işverenlerin %70'i için kritiktir.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-800">
                    Net bir <strong>Unvan</strong>, AI eşleşme doğruluğunu artırır.
                  </p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;


