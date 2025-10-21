import React from 'react';

const CareerRoadmap = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Kariyer Yol Haritası</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700">
            Yapay zeka destekli kişiselleştirilmiş kariyer yol haritanızı burada bulabilirsiniz.
            Hedeflerinize ulaşmak için öğrenmeniz gereken beceriler, almanız gereken kurslar ve
            yapmanız gereken projeler burada listelenecek.
          </p>
          <p className="mt-4 text-gray-500 text-sm">Bu sayfa geliştirme aşamasındadır.</p>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;