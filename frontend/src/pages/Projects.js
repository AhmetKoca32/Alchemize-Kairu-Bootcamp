// frontend/src/pages/Projects.js
import React, { useState } from 'react';
import {
  CodeBracketIcon,
  StarIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

// Diğer sayfalarınızdaki (Dashboard) proje isimleriyle tutarlı
const mockProjects = [
  {
    id: 1,
    name: 'Alchemize Backend',
    description: 'AI destekli kariyer platformunun ana backend servisi. Python, FastAPI ve makine öğrenimi modelleri kullanıldı.',
    language: 'Python',
    stars: 120,
    githubUrl: 'https://github.com/ahmetyilar/alchemize-backend',
    lastUpdated: '2 gün önce',
    isIncluded: true,
  },
  {
    id: 2,
    name: 'AI Job Matcher',
    description: 'İş ilanları ile CV\'leri eşleştirmek için kullanılan bir TensorFlow modeli.',
    language: 'Python',
    stars: 85,
    githubUrl: 'https://github.com/ahmetyilar/ai-job-matcher',
    lastUpdated: '1 hafta önce',
    isIncluded: true,
  },
  {
    id: 3,
    name: 'Portfolio Website',
    description: 'React ve Tailwind CSS ile oluşturulan kişisel portföy web sitesi.',
    language: 'JavaScript',
    stars: 45,
    githubUrl: 'https://github.com/ahmetyilar/portfolio-website',
    lastUpdated: '1 ay önce',
    isIncluded: true,
  },
  {
    id: 4,
    name: 'dotfiles',
    description: 'Kişisel geliştirme ortamı yapılandırma dosyaları (Vim, Zsh).',
    language: 'Shell',
    stars: 15,
    githubUrl: 'https://github.com/ahmetyilar/dotfiles',
    lastUpdated: '3 ay önce',
    isIncluded: false, // AI analizi için önemsiz
  },
];

// Basit GitHub ikonu SVG'si
const GitHubIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 16 16" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

// Dil için renk belirleyici
const getLanguageColor = (language) => {
  switch (language) {
    case 'Python': return 'bg-blue-200 text-blue-800';
    case 'JavaScript': return 'bg-yellow-200 text-yellow-800';
    case 'Shell': return 'bg-gray-200 text-gray-800';
    default: return 'bg-gray-200 text-gray-800';
  }
};

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [githubUser, setGithubUser] = useState('ahmetyilar'); // Simülasyon
  const [isLinked, setIsLinked] = useState(true); // Simülasyon

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Başlık */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Proje Yönetimi</h1>

        {/* GitHub Bağlantı Banner'ı */}
        <div className="bg-indigo-700 text-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center">
              <GitHubIcon className="w-12 h-12 mr-5 text-indigo-200" />
              <div>
                <h2 className="text-2xl font-bold">
                  {isLinked ? `Hesap Bağlı: ${githubUser}` : 'GitHub Hesabınızı Bağlayın'}
                </h2>
                <p className="text-indigo-100 text-lg mt-1">
                  {isLinked
                    ? 'Projeleriniz AI analizi için senkronize ediliyor.'
                    : 'Projelerinizi otomatik olarak senkronize edin ve AI\'ın iş eşleşmeleri için analiz etmesine izin verin.'}
                </p>
              </div>
            </div>
            {isLinked ? (
              <button
                onClick={() => setIsLinked(false)}
                className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition duration-300 flex items-center shadow"
              >
                <XCircleIcon className="w-5 h-5 mr-2" /> Bağlantıyı Kaldır
              </button>
            ) : (
              <button
                onClick={() => setIsLinked(true)}
                className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition duration-300 flex items-center shadow"
              >
                <LinkIcon className="w-5 h-5 mr-2" /> GitHub ile Bağlan
              </button>
            )}
          </div>
        </div>

        {/* Proje Listesi Başlığı */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Senkronize Edilen Projeler</h2>
          <button className="flex items-center bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-800 transition duration-300 shadow">
            <PlusIcon className="w-5 h-5 mr-2" /> Manuel Proje Ekle
          </button>
        </div>

        {/* Proje Kartları Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-all hover:shadow-lg border border-gray-100"
            >
              <div>
                {/* Kart Başlığı */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-indigo-700 flex items-center">
                    <CodeBracketIcon className="w-6 h-6 mr-2 text-indigo-500" />
                    {proj.name}
                  </h3>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub'da Görüntüle"
                    className="text-gray-400 hover:text-indigo-600"
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-gray-700 text-sm mb-4">{proj.description}</p>
              </div>

              <div>
                {/* Meta Bilgiler (Dil, Yıldız, vb.) */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getLanguageColor(proj.language)}`}>
                    {proj.language}
                  </span>
                  <span className="flex items-center">
                    <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                    {proj.stars}
                  </span>
                  <span className="text-xs">{proj.lastUpdated}</span>
                </div>

                {/* AI Analiz Girdisi */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor={`include-${proj.id}`} className="text-sm font-medium text-gray-700 flex-grow cursor-pointer">
                      AI Analizine Dahil Et
                    </label>
                    <button
                      id={`include-${proj.id}`}
                      onClick={() => {
                        // State'i güncelle
                        setProjects(prevProjects =>
                          prevProjects.map(p =>
                            p.id === proj.id ? { ...p, isIncluded: !p.isIncluded } : p
                          )
                        );
                      }}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                        ${proj.isIncluded ? 'bg-indigo-600' : 'bg-gray-200'}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                          ${proj.isIncluded ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Projects;
