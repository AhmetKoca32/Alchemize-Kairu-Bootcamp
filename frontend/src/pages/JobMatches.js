// frontend/src/pages/JobMatches.js
import React from 'react';
import {
  SparklesIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  MapPinIcon,
  InformationCircleIcon,
  LightBulbIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

// Diğer sayfalarınızdaki (Dashboard) proje isimleriyle tutarlı
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechNova Solutions',
    location: 'İstanbul (Remote)',
    matchPercent: 92,
    matchingSkills: ['React', 'TypeScript', 'Tailwind CSS'],
    matchingProjects: ['Portfolio Website (React)'],
    aiSuggestion: 'CV\'nizdeki "Portfolio Website" projenizin açıklamasında kullandığınız Tailwind CSS deneyimini vurgulayın.'
  },
  {
    id: 2,
    title: 'Full-Stack Developer (Python/React)',
    company: 'DataCore Analytics',
    location: 'Ankara',
    matchPercent: 85,
    matchingSkills: ['Python', 'React', 'PostgreSQL'],
    matchingProjects: ['Alchemize Backend (Python)', 'Portfolio Website (React)'],
    aiSuggestion: 'Hem "Alchemize Backend" hem de "Portfolio Website" projelerinizi birleştirerek full-stack yetkinliğinizi öne çıkarın.'
  },
  {
    id: 3,
    title: 'AI/ML Engineer',
    company: 'InnovateAI',
    location: 'İzmir',
    matchPercent: 78,
    matchingSkills: ['Python', 'TensorFlow'],
    matchingProjects: ['AI Job Matcher (TensorFlow)'],
    aiSuggestion: '"AI Job Matcher" projenizdeki TensorFlow kullanımınızı detaylandırın. CV özetinize "Makine Öğrenimi" anahtar kelimesini ekleyin.'
  }
];

const JobMatches = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Başlık */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">İş Eşleşmeleri</h1>

        {/* Bilgi Kutusu (Görseldeki stile güncellendi) */}
        <div className="bg-indigo-700 text-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <SparklesIcon className="h-10 w-10 text-indigo-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">AI Destekli Eşleşme</h2>
              <p className="text-indigo-100 text-lg mt-1">
                CV'niz ve GitHub projelerinizle eşleşen iş ilanlarını burada göreceksiniz. Yapay zeka, ilan gereksinimlerine göre projelerinizi vurgulayarak size özel CV önerileri sunacak.
              </p>
            </div>
          </div>
        </div>

        {/* Ana İçerik Alanı - İki Sütunlu Yapı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sol Sütun: İş İlanı Kartları */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Profilinize Uygun İlanlar</h2>
            {mockJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg border border-gray-100">

                {/* Kart Başlığı */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-700 hover:underline cursor-pointer">{job.title}</h3>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPinIcon className="w-4 h-4 mr-1.5" /> {job.location}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="text-3xl font-bold text-green-600">{job.matchPercent}%</span>
                    <p className="text-sm text-gray-500">Eşleşme</p>
                  </div>
                </div>

                {/* Eşleşme Detayları */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-gray-500" />
                    Eşleşen Yetenekler
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.matchingSkills.map(skill => (
                      <span key={skill} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-2 flex items-center">
                    <CodeBracketIcon className="w-5 h-5 mr-2 text-gray-500" />
                    İlgili Projeler
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.matchingProjects.map(proj => (
                      <span key={proj} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Önerisi */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start p-3 bg-indigo-50 rounded-lg">
                    <LightBulbIcon className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0" />
                    <div>
                      <h5 className="text-sm font-semibold text-indigo-800">AI CV Önerisi</h5>
                      <p className="text-sm text-indigo-700">{job.aiSuggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sağ Sütun: AI Analiz Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center mb-4">
                <SparklesIcon className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">AI Analiz Özeti</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Yapay zeka, profilinizi analiz etti ve en çok talep edilen yeteneklerinizi belirledi.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-800">
                    İlanların <strong className="text-indigo-700">%80'i</strong> 'React' ve 'Python' yeteneklerinizi arıyor.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-800">
                    'AI Job Matcher' projeniz, <strong className="text-indigo-700">3 ilanla</strong> doğrudan eşleşiyor.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-800">
                    CV özetinizi 'Bulut Teknolojileri' (AWS) üzerine yoğunlaştırmanız, <strong className="text-indigo-700">+5 ilanda</strong> şansınızı artırabilir.
                  </p>
                </li>
              </ul>
              <button className="mt-6 w-full bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-800 transition duration-300 flex items-center justify-center">
                Tüm Önerileri Gör
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatches;

