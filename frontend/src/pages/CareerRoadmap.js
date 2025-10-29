// frontend/src/pages/CareerRoadmap.js
import React from 'react';
import {
  SparklesIcon,
  FlagIcon,
  BoltIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  TrophyIcon,
  BookOpenIcon,
  BeakerIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// Örnek Yol Haritası Verisi
const mockRoadmap = {
  targetRole: "AI/ML Uzmanı",
  overallProgress: 25,
  steps: [
    {
      id: 1,
      title: "Adım 1: Temelleri Güçlendirme (Mevcut Durum)",
      status: "Tamamlandı",
      icon: FlagIcon,
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      skills: ["React", "Python", "Node.js", "PostgreSQL"],
      courses: [],
      projects: ["AI Job Matcher", "Alchemize Backend"],
      aiNote: "Mevcut yetenekleriniz 'Full-Stack' roller için güçlü bir temel oluşturuyor. Python bilginiz AI'a geçiş için kritik."
    },
    {
      id: 2,
      title: "Adım 2: Bulut Bilişim ve Veri Altyapısı",
      status: "Devam Ediyor",
      icon: BoltIcon,
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-800",
      skills: ["AWS (S3, Lambda, EC2)", "Docker", "Terraform"],
      courses: [
        { name: "AWS Certified Cloud Practitioner", link: "#" },
        { name: "Docker & Kubernetes: The Full Course", link: "#" }
      ],
      projects: [
        "Mevcut 'Alchemize' projesini Docker ile konteyner haline getirin.",
        "Serverless bir API oluşturmak için AWS Lambda kullanın."
      ],
      aiNote: "AI modellerini dağıtmak ve ölçeklendirmek için bulut altyapısı şarttır. Bu adım, veriyi işlemeye hazırlık."
    },
    {
      id: 3,
      title: "Adım 3: İleri Düzey Makine Öğrenimi",
      status: "Gelecek",
      icon: AcademicCapIcon,
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      skills: ["Scikit-learn", "Pandas", "NumPy", "Derin Öğrenme (TensorFlow/PyTorch)"],
      courses: [
        { name: "Machine Learning A-Z (Udemy)", link: "#" },
        { name: "Deep Learning Specialization (Coursera)", link: "#" }
      ],
      projects: [
        "Bir 'Kaggle' yarışmasına katılın.",
        "Doğal Dil İşleme (NLP) kullanarak bir duygu analizi aracı geliştirin."
      ],
      aiNote: "Teorik bilgiyi pratiğe dökme zamanı. 'AI Job Matcher' projenizdeki bilgileri burada derinleştireceksiniz."
    },
    {
      id: 4,
      title: "Adım 4: Uzmanlaşma ve Uygulama (Hedef)",
      status: "Gelecek",
      icon: RocketLaunchIcon,
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      skills: ["Büyük Dil Modelleri (LLMs)", "Model Dağıtımı (MLOps)", "Reinforcement Learning"],
      courses: [
        { name: "MLOps Specialization (Coursera)", link: "#" }
      ],
      projects: [
        "Kendi 'GPT-3' tabanlı chatbot'unuzu geliştirin.",
        "Gerçek zamanlı veri işleyen bir öneri sistemi kurun."
      ],
      aiNote: "Bu aşama sizi 'AI/ML Uzmanı' hedefinize ulaştıracak ve sektörde aranan bir profesyonel yapacaktır."
    }
  ]
};

const CareerRoadmap = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Başlık */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Kariyer Yol Haritası</h1>

        {/* Bilgi Kutusu (Görseldeki stile güncellendi) */}
        <div className="bg-indigo-700 text-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Bilgi ikonu yerine AI ikonunu kullanmak daha uygun oldu */}
              <SparklesIcon className="h-10 w-10 text-indigo-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">Size Özel Yol Haritası</h2>
              <p className="text-indigo-100 text-lg mt-1">
                Yapay zeka, profilinizi ve hedeflerinizi analiz ederek bu kişiselleştirilmiş kariyer yol haritasını oluşturdu.
              </p>
            </div>
          </div>
        </div>

        {/* Ana İçerik Alanı - İki Sütunlu Yapı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sol Sütun: Yol Haritası Adımları (Timeline) */}
          <div className="lg:col-span-2">
            <div className="flow-root">
              <ul className="-mb-8">
                {mockRoadmap.steps.map((step, stepIdx) => (
                  <li key={step.id}>
                    <div className="relative pb-8">
                      {/* Zaman çizgisi (Sonuncu hariç) */}
                      {stepIdx !== mockRoadmap.steps.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-300" aria-hidden="true" />
                      ) : null}

                      <div className="relative flex space-x-4">
                        {/* Adım İkonu */}
                        <div>
                          <span className={`h-8 w-8 rounded-full ${step.bgColor} flex items-center justify-center ring-8 ring-gray-50`}>
                            <step.icon className={`h-5 w-5 ${step.textColor}`} aria-hidden="true" />
                          </span>
                        </div>

                        {/* Adım Kartı */}
                        <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                          <div className="p-6">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${step.bgColor} ${step.textColor}`}>
                                {step.status}
                              </span>
                            </div>

                            {/* Yetenekler */}
                            {step.skills.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Hedeflenen Yetenekler</h4>
                                <div className="flex flex-wrap gap-2">
                                  {step.skills.map(skill => (
                                    <span key={skill} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Kurslar */}
                            {step.courses.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                  <BookOpenIcon className="w-4 h-4 mr-1.5 text-gray-500" />
                                  Önerilen Kurslar
                                </h4>
                                <ul className="space-y-1 list-disc list-inside">
                                  {step.courses.map(course => (
                                    <li key={course.name} className="text-sm">
                                      <a href={course.link} className="text-indigo-600 hover:underline">
                                        {course.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Projeler */}
                            {step.projects.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                  <BeakerIcon className="w-4 h-4 mr-1.5 text-gray-500" />
                                  Proje Fikirleri
                                </h4>
                                <ul className="space-y-1 list-disc list-inside text-sm text-gray-600">
                                  {step.projects.map(proj => (
                                    <li key={proj}>{proj}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* AI Notu */}
                          <div className="bg-indigo-50 px-6 py-3 border-t border-indigo-100">
                            <div className="flex items-start">
                              <SparklesIcon className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0" />
                              <p className="text-sm text-indigo-700">{step.aiNote}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sağ Sütun: Hedef ve İlerleme */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center mb-4">
                <TrophyIcon className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Kariyer Hedefi</h3>
              </div>

              <p className="text-3xl font-bold text-indigo-700 mb-4">{mockRoadmap.targetRole}</p>

              <p className="text-sm text-gray-700 mb-4">
                Yol haritanızı tamamlamaya doğru ilerlemeniz.
              </p>

              {/* İlerleme Çubuğu */}
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                  <span>Genel İlerleme</span>
                  <span>{mockRoadmap.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${mockRoadmap.overallProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Neden Bu Yol Haritası?</h4>
                <p className="text-sm text-gray-600">
                  Bu harita, mevcut <strong className="text-indigo-700">Python</strong> ve <strong className="text-indigo-700">React</strong> bilginizi temel alarak,
                  sizi en çok talep gören <strong className_="text-indigo-700">AI/ML</strong> rollerine en hızlı ve verimli şekilde
                  ulaştırmak için tasarlanmıştır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;

