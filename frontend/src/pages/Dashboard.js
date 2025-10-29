// frontend/src/pages/Dashboard.js
import { AcademicCapIcon, ArrowRightIcon, BriefcaseIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const userName = "Ahmet"; // Bu bilgi auth context'ten gelecek

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hoş Geldin ve Genel Bakış */}
        <div className="bg-indigo-700 text-white rounded-xl shadow-lg p-8 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Merhaba, {userName}!</h1>
            <p className="text-indigo-100 text-lg">Kariyer yolculuğunuzda son durumunuzu ve yeni fırsatları keşfedin.</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/job-matches"
              className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition duration-300 flex items-center"
            >
              <BriefcaseIcon className="w-5 h-5 mr-2" /> Yeni İş İlanı Analizi Yap
            </Link>
            <Link
              to="/cv"
              className="bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 transition duration-300 flex items-center"
            >
              <ArrowRightIcon className="w-5 h-5 mr-2" /> CV'mi Güncelle
            </Link>
          </div>
        </div>

        {/* Bilgi Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CV Durumu Kartı */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-gray-500 mb-2">
                <AcademicCapIcon className="w-6 h-6 mr-2" />
                <span className="text-sm font-medium">CV ANALİZİ</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">85<span className="text-xl">/100</span></h2>
              <p className="text-green-600 font-semibold">Harika! Kariyer hedeflerinize uygun.</p>
            </div>
            <Link to="/cv" className="text-indigo-600 font-medium mt-4 flex items-center hover:underline">
              Detaylı İncele <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* GitHub Aktiviteleri Kartı */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-gray-500 mb-2">
                <CodeBracketIcon className="w-6 h-6 mr-2" />
                <span className="text-sm font-medium">GİTHUB KATKILARINIZ</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">20<span className="text-xl"> Proje</span></h2>
              <p className="text-purple-600 font-semibold">Profilinizde güncel projeler var.</p>
            </div>
            <Link to="/projects" className="text-indigo-600 font-medium mt-4 flex items-center hover:underline">
              Projeleri Yönet <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Yeni Kariyer Fırsatları Kartı */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center text-gray-500 mb-2">
                <BriefcaseIcon className="w-6 h-6 mr-2" />
                <span className="text-sm font-medium">YENİ FIRSATLAR</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">5<span className="text-xl"> Yeni İlan</span></h2>
              <p className="text-blue-600 font-semibold">İlanları inceleyip başvurabilirsiniz.</p>
            </div>
            <Link to="/job-matches" className="text-indigo-600 font-medium mt-4 flex items-center hover:underline">
              İş İlanlarına Git <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Detaylı Bilgiler / Son Aktiviteler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Son Analizler & Öneriler */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Son Analizler & Öneriler</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1">&#8226;</span>
                <p className="text-gray-700">Yeni bir `Flutter` projesi ekleyerek mobil yeteneklerinizi sergileyin.</p>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1">&#8226;</span>
                <p className="text-gray-700">İş ilanı analizi sonuçlarını inceleyerek CV'nizi güncelleyin.</p>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1">&#8226;</span>
                <p className="text-gray-700">GitHub profilinizde `README` dosyalarınızı daha detaylı hale getirin.</p>
              </li>
            </ul>
          </div>

          {/* Güncel Projelerim (GitHub) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Öne Çıkan GitHub Projeleri</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-gray-700">
                <span>**Alchemize Backend** (Python)</span>
                <span className="text-sm text-gray-500">2 gün önce güncellendi</span>
              </li>
              <li className="flex items-center justify-between text-gray-700">
                <span>**AI Job Matcher** (TensorFlow)</span>
                <span className="text-sm text-gray-500">1 hafta önce güncellendi</span>
              </li>
              <li className="flex items-center justify-between text-gray-700">
                <span>**Portfolio Website** (React)</span>
                <span className="text-sm text-gray-500">1 ay önce güncellendi</span>
              </li>
            </ul>
            <Link to="/projects" className="text-indigo-600 font-medium mt-4 flex items-center hover:underline">
              Tüm Projeleri Gör <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;