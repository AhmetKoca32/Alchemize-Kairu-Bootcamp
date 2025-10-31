// frontend/src/pages/CVManagement.js
import React, { useState } from 'react';
import {
  PencilSquareIcon,
  SparklesIcon,
  UserCircleIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon,
  ArrowDownTrayIcon, // İndirme ikonu
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  PaperAirplaneIcon // Chatbot için
} from '@heroicons/react/24/outline';

/*
  PDF İndirme Özelliği Notu:
  Bu özellik (handleDownload) tarayıcıda PDF oluşturmak için iki kütüphane kullanır:
  1. jspdf: PDF dosyasını oluşturur.
  2. html2canvas: React bileşenini bir resme dönüştürür.
  
  Bu kütüphaneleri projenize eklemeniz gerekir:
  
  YÖNTEM 1: NPM (Tavsiye edilir)
  Terminalinize şunu yazın:
  npm install jspdf html2canvas
  
  Ve dosyanın başına import edin:
  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';

  YÖNTEM 2: CDN (index.html dosyanıza ekleyin)
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
*/

// Başlangıç için örnek CV verisi
const initialCvData = {
  personalInfo: {
    name: "Ahmet Yılar",
    title: "Kıdemli Yazılım Geliştirici",
    email: "ahmet.yilar@email.com",
    phone: "+90 555 123 45 67",
    linkedin: "linkedin.com/in/ahmetyilar",
    github: "github.com/ahmetyilar",
  },
  summary: "Teknolojiye tutkulu, 10 yılı aşkın deneyime sahip bir yazılım geliştiriciyim. Özellikle React, Node.js ve bulut teknolojileri üzerine uzmanlaştım. Ölçeklenebilir ve yüksek performanslı uygulamalar geliştirmek ana hedefimdir.",
  experience: [
    {
      id: 1,
      title: "Kıdemli Yazılım Geliştirici",
      company: "Teknoloji A.Ş.",
      dates: "Ocak 2020 - Günümüz",
      description: "React ve TypeScript kullanarak modern web uygulamaları geliştirdim. Mikroservis mimarisi üzerinde çalıştım ve AWS servislerini (Lambda, S3) aktif olarak kullandım."
    },
    {
      id: 2,
      title: "Yazılım Geliştirici",
      company: "Çözüm Bilişim",
      dates: "Mart 2017 - Aralık 2019",
      description: "Node.js ve Express ile RESTful API'ler geliştirdim. MongoDB ve PostgreSQL veritabanları ile çalıştım. Agile/Scrum metodolojilerine uygun projelerde yer aldım."
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bilgisayar Mühendisliği Yüksek Lisans",
      school: "Orta Doğu Teknik Üniversitesi",
      dates: "2017 - 2019"
    },
    {
      id: 2,
      degree: "Bilgisayar Mühendisliği Lisans",
      school: "İstanbul Teknik Üniversitesi",
      dates: "2013 - 2017"
    }
  ],
  skills: ["React", "Node.js", "TypeScript", "JavaScript", "Python", "AWS", "Docker", "Terraform", "PostgreSQL", "MongoDB", "Git"]
};

// AI Öneri Butonu Bileşeni
const AiSuggestionButton = ({ onClick, isLoading }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative text-indigo-500 hover:text-indigo-700 transition-colors duration-200 p-1 rounded-full ${isLoading ? 'animate-pulse' : ''}`}
    title="Yapay Zeka ile İyileştir"
  >
    <SparklesIcon className="w-6 h-6" />
    {isLoading && (
      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-indigo-400 ring-2 ring-white" />
    )}
  </button>
);

// Düzenlenebilir Alan Bileşeni (Input)
const EditableInput = ({ value, onChange, isEditing, placeholder, name }) => (
  isEditing ? (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name} // name prop'u eklendi
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
    />
  ) : (
    <p className="text-gray-700">{value}</p>
  )
);

// Düzenlenebilir Alan Bileşeni (Textarea)
const EditableTextarea = ({ value, onChange, isEditing, placeholder, name }) => (
  isEditing ? (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name} // name prop'u eklendi
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
    />
  ) : (
    <p className="text-gray-600 whitespace-pre-wrap">{value}</p>
  )
);

// CV Görüntüleme Modu için Başlık Bileşeni
const Section = ({ title, children, icon }) => (
  <section className="mb-8">
    <div className="flex items-center mb-4 border-b-2 border-gray-200 pb-2">
      {icon}
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <div className="text-gray-700">
      {children}
    </div>
  </section>
);


const CVManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [cvData, setCvData] = useState(initialCvData);
  const [isDownloading, setIsDownloading] = useState(false);

  // Hangi AI butonunun yüklendiğini takip etmek için
  const [aiLoading, setAiLoading] = useState(null); // 'summary', 'exp-0', 'skill'
  const [aiSuggestion, setAiSuggestion] = useState({}); // { summary: 'Öneri...', 'exp-0': '...' }

  // Chatbot State'leri
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiChatResponse, setAiChatResponse] = useState("");
  const [isAiChatLoading, setIsAiChatLoading] = useState(false);

  // Ana Düzenleme Modunu Aç/Kapat
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Düzenlemeyi bitirirken önerileri temizle
      setAiSuggestion({});
    }
  };

  // PDF İndirme Fonksiyonu
  const handleDownload = () => {
    // Kütüphanelerin yüklenip yüklenmediğini kontrol et (CDN veya import)
    // Eğer NPM ile import ettiyseniz, bu 'window' kontrollerine gerek yoktur.
    // const jsPDF = window.jspdf?.jsPDF;
    // const html2canvas = window.html2canvas;

    // Geçici olarak, kütüphanelerin import edildiğini varsayalım:
    const jsPDF = window.jspdf?.jsPDF; // VEYA import jsPDF from 'jspdf';
    const html2canvas = window.html2canvas; // VEYA import html2canvas from 'html2canvas';

    if (!jsPDF || !html2canvas) {
      console.error("PDF indirme kütüphaneleri (jsPDF, html2canvas) bulunamadı. Lütfen projenize ekleyin.");
      // Kullanıcıya bir hata mesajı gösterebilirsiniz (alert yerine)
      return;
    }

    const cvElement = document.getElementById('cv-preview-area');
    if (!cvElement) return;

    setIsDownloading(true);

    html2canvas(cvElement, {
      scale: 2, // Daha yüksek çözünürlük için
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV-${cvData.personalInfo.name.replace(' ', '-')}.pdf`);
      setIsDownloading(false);
    }).catch(err => {
      console.error("PDF oluşturulurken hata oluştu:", err);
      setIsDownloading(false);
    });
  };

  // AI Önerisi Alma (Simülasyon)
  const handleAISuggestion = (key, currentText) => {
    setAiLoading(key);
    setAiSuggestion(prev => ({ ...prev, [key]: null })); // Önceki öneriyi temizle

    // API çağrısını simüle et
    setTimeout(() => {
      const mockSuggestion = `Yapay zeka tarafından iyileştirilmiş öneri:\n"${currentText}" metnini daha etkili hale getirmek için şu ifadeler eklenebilir: '...sonuç odaklı...', '...proaktif yaklaşım...' ve '...ölçülebilir başarılar...'.`;

      setAiSuggestion(prev => ({ ...prev, [key]: mockSuggestion }));
      setAiLoading(false);
    }, 1500);
  };

  // AI Chatbot Fonksiyonu (Simülasyon)
  const handleAskAI = () => {
    if (!aiChatInput.trim()) return;

    setIsAiChatLoading(true);
    setAiChatResponse(""); // Önceki yanıtı temizle
    const userQuestion = aiChatInput; // Soruyu sakla
    setAiChatInput(""); // Girişi hemen temizle

    setTimeout(() => {
      const mockResponse = `AI Yanıtı (Simülasyon):\n\nSoru: "${userQuestion}"\n\nCevap: CV'nizi güçlendirmek için 'İş Deneyimi' bölümünüzdeki başarılarınızı 'X projesinde %Y verimlilik artışı sağlandı' gibi ölçülebilir verilerle desteklemenizi öneririm.`;
      setAiChatResponse(mockResponse);
      setIsAiChatLoading(false);
    }, 2000);
  };

  // Veri Güncelleme Fonksiyonları
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handleSummaryChange = (e) => {
    setCvData(prev => ({ ...prev, summary: e.target.value }));
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperience = [...cvData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };
    setCvData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // Eğitim için güncelleme fonksiyonu eklendi
  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = [...cvData.education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setCvData(prev => ({ ...prev, education: updatedEducation }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Başlık ve Butonlar */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900">CV Yönetimi</h1>
          <div className="flex items-center gap-4">
            {!isEditing && (
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200"
              >
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                {isDownloading ? 'İndiriliyor...' : 'PDF İndir'}
              </button>
            )}
            <button
              onClick={handleToggleEdit}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md ${isEditing
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-indigo-700 text-white hover:bg-indigo-800'
                }`}
            >
              {isEditing ? (
                <>
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Değişiklikleri Kaydet
                </>
              ) : (
                <>
                  <PencilSquareIcon className="w-5 h-5 mr-2" />
                  CV'yi Düzenle
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI CV Asistanı (Chatbot) - YENİ EKLENEN BÖLÜM */}
        <div className="bg-indigo-700 text-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <SparklesIcon className="h-10 w-10 text-indigo-300" aria-hidden="true" />
            </div>
            <div className="ml-4 flex-grow">
              <h2 className="text-2xl font-bold">AI CV Asistanı</h2>
              <p className="text-indigo-100 text-lg mt-1 mb-4">
                CV'niz hakkında yapay zekaya sorular sorun. (Örn: "Özetimi nasıl daha etkili hale getirebilirim?")
              </p>

              {/* Chat Yanıt Alanı */}
              {isAiChatLoading && (
                <div className="bg-indigo-900/50 p-4 rounded-lg mb-4 border border-indigo-500">
                  <p className="text-sm text-indigo-100 animate-pulse">AI yanıt oluşturuyor...</p>
                </div>
              )}
              {aiChatResponse && !isAiChatLoading && (
                <div className="bg-indigo-900/50 p-4 rounded-lg mb-4 border border-indigo-500">
                  <p className="text-sm text-indigo-100 whitespace-pre-wrap">{aiChatResponse}</p>
                </div>
              )}

              {/* Chat Giriş Alanı */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiChatInput}
                  onChange={(e) => setAiChatInput(e.target.value)}
                  placeholder="Sorunuzu buraya yazın..."
                  className="flex-grow px-4 py-2 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                  disabled={isAiChatLoading}
                />
                <button
                  onClick={handleAskAI}
                  disabled={isAiChatLoading || !aiChatInput.trim()}
                  className="bg-white text-indigo-700 px-5 py-2 rounded-full font-semibold hover:bg-indigo-100 transition duration-300 disabled:opacity-50 flex items-center"
                >
                  <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                  Sor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------
         DÜZENLEME MODU GÖRÜNÜMÜ (isEditing === true)
         ------------------------------------------
        */}
        {isEditing ? (
          <>
            {/* AI Düzenleme Modu Bilgi Kutusu */}
            <div className="mb-6 p-4 bg-indigo-100 border-l-4 border-indigo-500 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-5 w-5 text-indigo-700" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-indigo-700">
                    <span className="font-semibold">Düzenleme Modu Aktif.</span> Değişiklik yapmak istediğiniz alanın üzerine gelin.
                    Yapay zeka önerileri için <SparklesIcon className="inline w-4 h-4" /> ikonuna tıklayın.
                  </p>
                </div>
              </div>
            </div>

            {/* CV İçerik Alanı - İki Sütunlu Yapı (Düzenleme) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Sol Sütun: Kişisel Bilgiler ve Yetenekler */}
              <div className="lg:col-span-1 space-y-6">
                {/* Kişisel Bilgiler Kartı */}
                <div className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
                  <div className="flex items-center mb-4">
                    <UserCircleIcon className="w-8 h-8 text-indigo-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Kişisel Bilgiler</h3>
                  </div>
                  <div className="space-y-3">
                    <EditableInput isEditing={isEditing} value={cvData.personalInfo.name} onChange={handlePersonalInfoChange} placeholder="Ad Soyad" name="name" />
                    <EditableInput isEditing={isEditing} value={cvData.personalInfo.title} onChange={handlePersonalInfoChange} placeholder="Unvan" name="title" />
                    <hr />
                    <EditableInput isEditing={isEditing} value={cvData.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="Email" name="email" />
                    <EditableInput isEditing={isEditing} value={cvData.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="Telefon" name="phone" />
                    <EditableInput isEditing={isEditing} value={cvData.personalInfo.linkedin} onChange={handlePersonalInfoChange} placeholder="LinkedIn" name="linkedin" />
                    <EditableInput isEditing={isEditing} value={cvData.personalInfo.github} onChange={handlePersonalInfoChange} placeholder="GitHub" name="github" />
                  </div>
                </div>

                {/* Yetenekler Kartı */}
                <div className="bg-white rounded-xl shadow-md p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <WrenchScrewdriverIcon className="w-8 h-8 text-indigo-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Yetenekler</h3>
                    </div>
                    {isEditing && (
                      <AiSuggestionButton
                        onClick={() => handleAISuggestion('skills', cvData.skills.join(', '))}
                        isLoading={aiLoading === 'skills'}
                      />
                    )}
                  </div>
                  {aiSuggestion.skills && (
                    <p className="text-sm text-indigo-700 bg-indigo-50 p-3 rounded-lg mb-4 whitespace-pre-wrap">{aiSuggestion.skills}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((skill, index) => (
                      <span key={index} className="relative bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                        {skill}
                        {isEditing && (
                          <button className="ml-2 text-indigo-500 hover:text-indigo-800">
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <button className="bg-gray-200 text-gray-600 hover:bg-gray-300 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                        <PlusIcon className="w-4 h-4 mr-1" /> Ekle
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sağ Sütun: Özet, Deneyim, Eğitim */}
              <div className="lg:col-span-2 space-y-6">
                {/* Profesyonel Özet Kartı */}
                <div className="bg-white rounded-xl shadow-md p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Profesyonel Özet</h3>
                    {isEditing && (
                      <AiSuggestionButton
                        onClick={() => handleAISuggestion('summary', cvData.summary)}
                        isLoading={aiLoading === 'summary'}
                      />
                    )}
                  </div>
                  {aiSuggestion.summary && (
                    <p className="text-sm text-indigo-700 bg-indigo-50 p-3 rounded-lg mb-4 whitespace-pre-wrap">{aiSuggestion.summary}</p>
                  )}
                  <EditableTextarea isEditing={isEditing} value={cvData.summary} onChange={handleSummaryChange} placeholder="Kendinizi ve hedeflerinizi özetleyin..." name="summary" />
                </div>

                {/* İş Deneyimi Kartı */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <BriefcaseIcon className="w-8 h-8 text-indigo-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">İş Deneyimi</h3>
                    </div>
                    {isEditing && (
                      <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        <PlusIcon className="w-5 h-5 mr-1" /> Deneyim Ekle
                      </button>
                    )}
                  </div>
                  <ul className="space-y-6">
                    {cvData.experience.map((exp, index) => (
                      <li key={exp.id} className="border-l-4 border-indigo-200 pl-4 relative">
                        {isEditing && (
                          <button className="absolute top-0 right-0 text-red-500 hover:text-red-700">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        )}

                        <EditableInput isEditing={isEditing} value={exp.title} onChange={(e) => handleExperienceChange(e, index)} placeholder="Pozisyon" name="title" />
                        <EditableInput isEditing={isEditing} value={exp.company} onChange={(e) => handleExperienceChange(e, index)} placeholder="Şirket Adı" name="company" />
                        <EditableInput isEditing={isEditing} value={exp.dates} onChange={(e) => handleExperienceChange(e, index)} placeholder="Tarih Aralığı (örn: Ocak 2020 - Günümüz)" name="dates" />

                        <div className="relative mt-2">
                          <EditableTextarea isEditing={isEditing} value={exp.description} onChange={(e) => handleExperienceChange(e, index)} placeholder="İş tanımı ve sorumluluklar..." name="description" />
                          {isEditing && (
                            <div className="absolute top-1 right-1">
                              <AiSuggestionButton
                                onClick={() => handleAISuggestion(`exp-${index}`, exp.description)}
                                isLoading={aiLoading === `exp-${index}`}
                              />
                            </div>
                          )}
                        </div>
                        {aiSuggestion[`exp-${index}`] && (
                          <p className="text-sm text-indigo-700 bg-indigo-50 p-3 rounded-lg mt-2 whitespace-pre-wrap">{aiSuggestion[`exp-${index}`]}</p>

                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eğitim Kartı */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <AcademicCapIcon className="w-8 h-8 text-indigo-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Eğitim Bilgileri</h3>
                    </div>
                    {isEditing && (
                      <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        <PlusIcon className="w-5 h-5 mr-1" /> Eğitim Ekle
                      </button>
                    )}
                  </div>
                  <ul className="space-y-4">
                    {cvData.education.map((edu, index) => (
                      <li key={edu.id} className="relative">
                        {isEditing && (
                          <button className="absolute top-0 right-0 text-red-500 hover:text-red-700">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        )}
                        <EditableInput isEditing={isEditing} value={edu.degree} onChange={(e) => handleEducationChange(e, index)} placeholder="Bölüm / Derece" name="degree" />
                        <EditableInput isEditing={isEditing} value={edu.school} onChange={(e) => handleEducationChange(e, index)} placeholder="Okul Adı" name="school" />
                        <EditableInput isEditing={isEditing} value={edu.dates} onChange={(e) => handleEducationChange(e, index)} placeholder="Tarih Aralığı" name="dates" />
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </>
        ) : (
          /* ------------------------------------------
           CV GÖRÜNTÜLEME MODU (isEditing === false)
           ------------------------------------------
          */
          <div id="cv-preview-area" className="max-w-4xl mx-auto bg-white shadow-2xl p-12 rounded-lg border border-gray-200">
            {/* CV Başlığı */}
            <header className="text-center mb-10">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-2">{cvData.personalInfo.name}</h2>
              <p className="text-3xl text-indigo-700 font-semibold">{cvData.personalInfo.title}</p>

              <div className="flex justify-center items-center flex-wrap gap-6 mt-6 text-sm text-gray-600">
                <a href={`mailto:${cvData.personalInfo.email}`} className="flex items-center hover:text-indigo-600">
                  <EnvelopeIcon className="w-4 h-4 mr-2" /> {cvData.personalInfo.email}
                </a>
                <span className="flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-2" /> {cvData.personalInfo.phone}
                </span>
                <a href={`https://${cvData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600">
                  <GlobeAltIcon className="w-4 h-4 mr-2" /> {cvData.personalInfo.linkedin}
                </a>
                <a href={`https://${cvData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                  {cvData.personalInfo.github}
                </a>
              </div>
            </header>

            {/* Profesyonel Özet */}
            <Section title="Profesyonel Özet" icon={<UserCircleIcon className="w-7 h-7 mr-3 text-indigo-600" />}>
              <p className="text-base leading-relaxed">{cvData.summary}</p>
            </Section>

            {/* İş Deneyimi */}
            <Section title="İş Deneyimi" icon={<BriefcaseIcon className="w-7 h-7 mr-3 text-indigo-600" />}>
              <ul className="space-y-6">
                {cvData.experience.map(exp => (
                  <li key={exp.id}>
                    <h4 className="text-xl font-semibold text-gray-800">{exp.title}</h4>
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="text-lg font-medium text-indigo-700">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.dates}</p>
                    </div>
                    <p className="text-base">{exp.description}</p>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Eğitim Bilgileri */}
            <Section title="Eğitim Bilgileri" icon={<AcademicCapIcon className="w-7 h-7 mr-3 text-indigo-600" />}>
              <ul className="space-y-4">
                {cvData.education.map(edu => (
                  <li key={edu.id}>
                    <h4 className="text-xl font-semibold text-gray-800">{edu.degree}</h4>
                    <div className="flex justify-between items-baseline">
                      <p className="text-lg font-medium text-indigo-700">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.dates}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Yetenekler */}
            <Section title="Yetenekler" icon={<WrenchScrewdriverIcon className="w-7 h-7 mr-3 text-indigo-600" />}>
              <div className="flex flex-wrap gap-3">
                {cvData.skills.map((skill, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-800 text-base font-medium px-4 py-2 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          </div>
        )}

      </div>
    </div>
  );
};

export default CVManagement;


