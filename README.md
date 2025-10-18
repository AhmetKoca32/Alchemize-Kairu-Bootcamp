# Alchemize Kairu Bootcamp - Monorepo Mimarisi

Bu proje, modüler ve sağlam bir mimari ile tasarlanmış CV ve GitHub proje yönetim sistemidir. Web scraping'in getirdiği zorlukları (proxy yönetimi, IP engellemeleri vb.) karşılamak üzere tasarlanmış, "sorumlulukların ayrılması" ilkesini temel alan tam mimari yapıdır.

## Mimari Yapı

### Backend (FastAPI)
- **API Katmanı**: HTTP endpoint'leri (`/backend/app/api/`)
- **Servis Katmanı**: İş mantığı ve adaptörler (`/backend/app/services/`)
- **Scraper Engine**: Web scraping motoru (`/backend/app/services/scraper_engine/`)
- **Veritabanı**: SQLAlchemy modelleri ve CRUD işlemleri

### Frontend (React)
- **Bileşenler**: UI bileşenleri (`/frontend/src/components/`)
- **Sayfalar**: Route sayfaları (`/frontend/src/pages/`)
- **Servisler**: API iletişim katmanı (`/frontend/src/services/`)

### Docker
- **docker-compose.yml**: 3 servis (frontend, backend, db)
- **Dockerfile**: Her servis için container tanımları

## Özellikler

- GitHub repo import sistemi
- Proxy yönetimi ve IP engelleme koruması
- CV oluşturma ve yönetimi
- AI destekli analiz (Hugging Face)
- Modüler ve genişletilebilir mimari

### 👥 Takım ve Mentör

| Rol | İsim Soyisim |
| :--- | :--- |
| **Backend Developer** | Ahmet Koca |
| **Frontend Developer** | Edanur Özkan |
| **Deep Learning Engineer** | Yeliz İrfan |
| **Machine Learning Engineer** | Fatima Sadıxova |
| **Mentör** | Mustafa Kocaman |

### 🌟 Temel Özellikler

Platform, kullanıcıların kariyer gelişimini ve iş başvurularını optimize etmek için üç ana modül etrafında tasarlanmıştır:

#### 1. Dinamik CV Asistanı
* **Profesyonel CV Oluşturma:** Kullanıcı bilgilerine dayanarak yapılandırılmış ve şık CV'ler üretir.
* **GitHub Entegrasyonu (Real-Time Data):** Kullanıcının GitHub hesabındaki herkese açık repoları, katkıları ve teknik yetenekleri anlık olarak çekerek CV'ye dinamik olarak ekler.

#### 2. Kişiselleştirilmiş Kariyer Yol Haritası
* **AI Analizi:** Mevcut CV ve belirlenen hedefleri analiz eder.
* **Özel Yol Haritası:** Kurs, sertifika, proje ve eğitim önerilerinden oluşan kişiye özel, interaktif bir kariyer yol haritası sunar.

#### 3. Akıllı Başvuru Optimizasyonu
* **İlana Özel CV Optimizasyonu:** Yüklenen iş ilanı metnini Yapay Zeka (NLP) ile analiz eder ve kullanıcının mevcut CV'sini ilana en uygun hale getirir.
* **Ön Yazı (Cover Letter) Oluşturma:** Başvuruya ve profile birebir uyumlu, etkili ön yazı metinleri üretir.

### 🛠️ Kullanılan Teknolojiler

| Kategori | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Frontend** | React, JavaScript (ES6+), HTML5 & CSS3 | Modern, bileşen tabanlı kullanıcı arayüzleri ve istemci tarafı mantığı. |
| **Backend** | Python, FastAPI, Uvicorn, SQLAlchemy | Yüksek performanslı ve ölçeklenebilir API'ler için Python framework'ü ve ORM. |
| **Yapay Zeka** | Hugging Face (Transformers), TensorFlow/PyTorch, Scikit-learn | NLP ile analiz, Generative AI ile metin üretimi ve derin öğrenme modelleri. |
| **Veritabanı** | PostgreSQL | Kullanıcı profillerini ve CV verilerini depolamak için güçlü ilişkisel veritabanı sistemi. |
| **Entegrasyon** | GitHub REST API | Teknik yetenek ve proje verilerini gerçek zamanlı çekme. |
| **DevOps** | Docker | Uygulamanın mikroservislerini izole etmek ve dağıtımı kolaylaştırmak. |

### 📚 Veri Seti

* **Adı:** `Resume.csv`
* **Kaynak:** Kaggle – Resume Dataset (Snehaan Bhawal)

### 🚀 Nasıl Başlatılır?

1.  Projeyi klonlayın:
    ```bash
    git clone [https://github.com/Aivio/Alchemize.git](https://github.com/Aivio/Alchemize.git)
    cd Alchemize
    ```
2.  Gerekli bağımlılıkları yükleyin:
    ```bash
    # Frontend klasöründe
    npm install
    # Backend klasöründe
    pip install -r requirements.txt
    ```
3.  Çevresel değişkenleri ayarlayın (`.env` dosyasını oluşturun) ve API anahtarlarınızı girin.
4.  Uygulamayı çalıştırın:
    ```bash
    # Frontend
    npm start
    # Backend
    python app.py
    ```

### 🗓️ Proje Takvimi (Özet)

| Dönem | Tarih Aralığı | Odak Noktası |
| :--- | :--- | :--- |
| **1. Hafta** | 8 - 15 Ekim | Planlama, Altyapı Hazırlığı ve İş Dağılımı. |
| **2. Hafta** | 16 - 22 Ekim | Backend/Frontend Kurulumu, **CV Modülü** ve **GitHub Entegrasyonu**. |
| **3. Hafta** | 23 - 29 Ekim | **Kariyer Yol Haritası** ve **Başvuru Optimizasyonu** AI Modül Entegrasyonu. |
| **4. Hafta** | 30 Ekim - 5 Kasım | Kapsamlı Testler, Hata Ayıklama ve Proje Teslimi. |

### 🤝 Katkıda Bulunma

**Alchemize** projesinin gelişimine katkıda bulunmaktan mutluluk duyarız! Hata raporları, özellik önerileri veya kod katkıları için lütfen bir `issue` açmaktan veya `pull request` göndermekten çekinmeyin.
