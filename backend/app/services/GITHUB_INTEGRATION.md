# GitHub Entegrasyonu - Mimari Dokümantasyonu

## 🎯 Amaç
Bu dokümantasyon, Alchemize projesinde GitHub entegrasyonunun nasıl çalıştığını ve mimari kararları açıklar.

## 🔐 GitHub Token Yönetimi

### Problem
- GitHub API'ye erişim için Personal Access Token (PAT) gerekiyor
- Token'ları güvenli bir şekilde saklamak gerekiyor
- Kullanıcılar sürekli token girmek istemiyor

### Çözüm: Veritabanında Şifreli Saklama

#### 1. **Veritabanı Yapısı**
```python
# User tablosuna GitHub token alanı ekle
class User(Base):
    github_token = Column(String, nullable=True)  # Şifreli saklanacak
    github_connected = Column(Boolean, default=False)
    github_username = Column(String, nullable=True)
```

#### 2. **Token Şifreleme**
```python
from cryptography.fernet import Fernet

def encrypt_token(token: str) -> str:
    """GitHub token'ını şifreler"""
    key = Fernet.generate_key()
    f = Fernet(key)
    return f.encrypt(token.encode()).decode()

def decrypt_token(encrypted_token: str) -> str:
    """Şifreli token'ı çözer"""
    f = Fernet(key)
    return f.decrypt(encrypted_token.encode()).decode()
```

#### 3. **Frontend Entegrasyonu**
```javascript
// GitHub bağlantı modal'ı
const GitHubConnectModal = () => {
  const [token, setToken] = useState('');
  
  const connectGitHub = async () => {
    await fetch('/api/github/connect', {
      method: 'POST',
      body: JSON.stringify({ token })
    });
  };
};
```

#### 4. **Backend API Endpoints**
```python
@router.post("/github/connect")
async def connect_github(token: str, current_user: User):
    # Token'ı şifrele ve veritabanına kaydet
    encrypted_token = encrypt_token(token)
    current_user.github_token = encrypted_token
    current_user.github_connected = True
    # GitHub kullanıcı adını al
    g = Github(token)
    current_user.github_username = g.get_user().login
```

## 🏗️ Mimari Yapı

### **Dosya Yapısı**
```
backend/app/services/
├── github_repo_fetcher.py    # GitHub veri çekme servisi
├── github_service.py         # GitHub API wrapper
└── GITHUB_INTEGRATION.md    # Bu dokümantasyon
```

### **Servis Katmanı**
- `github_repo_fetcher.py`: Repository verilerini çeker
- `github_service.py`: GitHub API işlemlerini yönetir
- Token yönetimi ve hata yönetimi

### **API Katmanı**
- `/api/github/connect`: GitHub bağlantısı
- `/api/github/repos`: Repository listesi
- `/api/github/sync`: Veri senkronizasyonu

## 🔄 Veri Akışı

### 1. **İlk Bağlantı**
```
Kullanıcı → Token Girişi → Şifreleme → Veritabanı → GitHub API Test
```

### 2. **Veri Çekme**
```
İstek → Token Çözme → GitHub API → Veri İşleme → Response
```

### 3. **Otomatik Senkronizasyon**
```
Zamanlayıcı → Token Kontrol → GitHub API → Veri Güncelleme
```

## 🛡️ Güvenlik Önlemleri

### **Token Güvenliği**
- ✅ AES-256 şifreleme
- ✅ HTTPS zorunlu
- ✅ Token'ları loglamayın
- ✅ Session timeout

### **API Güvenliği**
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ Token geçerlilik kontrolü

## 📊 Kullanım Senaryoları

### **CV Builder Entegrasyonu**
1. Kullanıcı GitHub'ı bağlar
2. Repository verileri çekilir
3. CV'ye otomatik eklenir
4. Güncellemeler takip edilir

### **Proje Analizi**
1. Repository istatistikleri
2. Dil analizi
3. Aktivite takibi
4. Trend analizi

## 🔧 Geliştirme Notları

### **Token Yenileme**
- Token süresi dolduğunda kullanıcıya bildirim
- Yeniden bağlantı için kolay arayüz
- Otomatik token geçerlilik kontrolü

### **Hata Yönetimi**
- GitHub API hatalarını yakala
- Rate limit durumlarını yönet
- Kullanıcı dostu hata mesajları

### **Performans**
- Repository verilerini cache'le
- Gereksiz API çağrılarını önle
- Batch işlemler kullan

## 📝 Gelecek Geliştirmeler

- [ ] GitHub webhook entegrasyonu
- [ ] Otomatik repository analizi
- [ ] GitHub Actions entegrasyonu
- [ ] Çoklu GitHub hesabı desteği
- [ ] Repository kategorilendirme

---

**Son Güncelleme:** 21 Ekim 2025  
**Geliştirici:** Ahmet Koca  
**Versiyon:** 1.0.0
