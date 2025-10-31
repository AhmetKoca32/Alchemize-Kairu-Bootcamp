// frontend/src/pages/Settings.js
import React, { useState } from 'react';
import {
  BellIcon,
  KeyIcon,
  LinkIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

// Profil sayfasıyla tutarlı bileşenler
const FormInput = ({ label, type, name, value, onChange, icon }) => (
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
        placeholder={label}
      />
    </div>
  </div>
);

const ToggleSwitch = ({ label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  </div>
);

const GitHubIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const Settings = () => {
  // Simülasyon için state'ler
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    cvTips: true,
  });
  const [isGithubLinked, setIsGithubLinked] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Başlık */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Ayarlar</h1>

        {/* Ana İçerik Alanı - İki Sütunlu Yapı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sol Sütun: Ayar Kartları */}
          <div className="lg:col-span-2 space-y-6">

            {/* Şifre Değişikliği Kartı */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-5 border-b pb-3">
                <KeyIcon className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Güvenlik</h3>
              </div>
              <div className="space-y-4">
                <FormInput
                  label="Mevcut Şifre"
                  type="password"
                  name="currentPassword"
                  icon={<KeyIcon className="w-5 h-5 text-gray-400" />}
                />
                <FormInput
                  label="Yeni Şifre"
                  type="password"
                  name="newPassword"
                  icon={<KeyIcon className="w-5 h-5 text-gray-400" />}
                />
              </div>
              <div className="text-right mt-6">
                <button className="flex items-center justify-center bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-800 transition duration-300 shadow">
                  <CheckCircleIcon className="w-5 h-5 mr-2" /> Şifreyi Güncelle
                </button>
              </div>
            </div>

            {/* Hesap Silme Kartı */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-red-200">
              <div className="flex items-center mb-5 border-b pb-3 border-red-200">
                <TrashIcon className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold text-red-700">Tehlikeli Alan</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Hesabınızı silerseniz, tüm CV bilgileriniz, proje analizleriniz ve iş eşleşmeleriniz kalıcı olarak kaldırılacaktır.
              </p>
              <button className="w-full flex items-center justify-center bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 shadow-md">
                <TrashIcon className="w-5 h-5 mr-2" /> Hesabımı Kalıcı Olarak Sil
              </button>
            </div>
          </div>

          {/* Sağ Sütun: Bağlantılar ve Bildirimler */}
          <div className="lg:col-span-1 space-y-6">

            {/* GitHub Bağlantı Kartı */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center mb-5 border-b pb-3">
                <GitHubIcon className="w-7 h-7 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">GitHub Bağlantısı</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {isGithubLinked
                  ? 'Hesabınız bağlı. Projeleriniz AI analizi için senkronize ediliyor.'
                  : 'Projelerinizi otomatik senkronize etmek için hesabınızı bağlayın.'}
              </p>
              {isGithubLinked ? (
                <button
                  onClick={() => setIsGithubLinked(false)}
                  className="w-full flex items-center justify-center bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition duration-300"
                >
                  <XCircleIcon className="w-5 h-5 mr-2" /> Bağlantıyı Kaldır
                </button>
              ) : (
                <button
                  onClick={() => setIsGithubLinked(true)}
                  className="w-full flex items-center justify-center bg-gray-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition duration-300"
                >
                  <LinkIcon className="w-5 h-5 mr-2" /> GitHub ile Bağlan
                </button>
              )}
            </div>

            {/* Bildirim Ayarları Kartı */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-28">
              <div className="flex items-center mb-5 border-b pb-3">
                <BellIcon className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Bildirim Ayarları</h3>
              </div>
              <div className="space-y-4">
                <ToggleSwitch
                  label="Yeni İş İlanı Uyarıları"
                  enabled={notifications.jobAlerts}
                  setEnabled={(value) => setNotifications(p => ({ ...p, jobAlerts: value }))}
                />
                <ToggleSwitch
                  label="AI CV İpuçları"
                  enabled={notifications.cvTips}
                  setEnabled={(value) => setNotifications(p => ({ ...p, cvTips: value }))}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;


