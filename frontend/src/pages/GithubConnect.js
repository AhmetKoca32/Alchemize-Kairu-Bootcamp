import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GithubConnect = () => {
  const [showHowTo, setShowHowTo] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleConnect = (e) => {
    e.preventDefault();
    // Token backend'e iletilecek (şimdilik sadece log)
    console.log("Girilen GitHub Token:", token);
    // Burada projede backend çağrısı yapılabilir
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/90 max-w-lg w-full rounded-2xl shadow-xl px-8 py-10 text-center">
        {/* Başlık ve Logo */}
        <div className="mb-6">
          <svg className="mx-auto w-12 h-12 text-indigo-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">GitHub Hesabınızı Bağlayın</h1>
        </div>

        {/* Avantajlar */}
        <div className="mb-4 text-left">
          <div className="font-semibold text-gray-900 text-base mb-2">GitHub hesabınızı bağlarsanız:</div>
          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
            <li>Projeleriniz otomatik analiz edilir ve öne çıkan teknolojiler tespit edilir.</li>
            <li>İş ilanlarına özel, en uygun projeler CV'nize otomatik eklenir.</li>
            <li>Yapay zeka, kariyeriniz için en güçlü profili önerir.</li>
            <li>Kariyer yol haritası ve öneriler kişiselleştirilir.</li>
          </ul>
        </div>

        <div className="mb-4">
          <span className="text-sm text-gray-600">
            Bu adımı atlayabilir ve daha sonra profilinizden GitHub bağlantısı ekleyebilirsiniz.
          </span>
        </div>

        {/* TOKEN INPUT FORMU */}
        <form onSubmit={handleConnect} className="mt-4 space-y-4">
          <div>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="GitHub Personal Access Token (PAT)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowHowTo((v) => !v)}
              className="block mt-2 mx-auto text-xs text-indigo-700 hover:underline focus:outline-none"
            >
              Token nasıl alınır?
            </button>
          </div>
          {showHowTo && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-left mb-2 animate-fade-in text-xs text-indigo-800">
              <div className="font-semibold mb-2">GitHub Token Nasıl Alınır?</div>
              <ol className="list-decimal list-inside space-y-1">
                <li>GitHub'da sağ üstten <strong>Settings</strong> &gt; <strong>Developer settings</strong> &gt; <strong>Personal access tokens</strong> menüsüne gidin.</li>
                <li><strong>Generate new token (classic)</strong> butonuna tıklayın.</li>
                <li><strong>repo</strong> ve <strong>user</strong> izni seçili olsun (kullanıcı adınızı ve repo bilgilerinizi okumak için yeterli).</li>
                <li>Token'ı oluşturun ve buraya kopyalayın. Token sadece 1 kez görünür!</li>
              </ol>
            </div>
          )}

          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
            >
              Atla
            </button>
            <button
              type="submit"
              disabled={token.trim().length < 16}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Bağla ve Devam Et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GithubConnect;
