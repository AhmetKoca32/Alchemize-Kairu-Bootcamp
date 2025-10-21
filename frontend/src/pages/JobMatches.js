import React from 'react';

const JobMatches = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">İş İlanları Eşleşmeleri</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700">
            CV'niz ve GitHub projelerinizle eşleşen iş ilanlarını burada göreceksiniz.
            Yapay zeka, ilan gereksinimlerine göre projelerinizi vurgulayarak
            size özel CV önerileri sunacak.
          </p>
          <p className="mt-4 text-gray-500 text-sm">Bu sayfa geliştirme aşamasındadır.</p>
        </div>
      </div>
    </div>
  );
};

export default JobMatches;