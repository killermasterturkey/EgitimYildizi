# EğitimYıldızı - Proje Spesifikasyonu

## 1. Genel Bakış

EğitimYıldızı, Türkiye'de özel eğitime ihtiyaç duyan çocuklar için tasarlanmış kapsamlı bir eğitim platformudur.

### 1.1 Hedef Kitle
- **Yaş Grubu:** 3-14 yaş (Okul öncesi - Ortaokul)
- **Özel İhtiyaç Grupları:**
  - Otizm Spektrum Bozukluğu
  - Öğrenme Güçlüğü (Disleksi, Diskalkuli, DEHB)
  - Zihinsel Yetersizlik (Hafif-Orta)
  - Tüm özel eğitim kategorileri

### 1.2 Teknoloji Stack
- **Frontend:** React 18 + TypeScript + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL (Ana) + Redis (Cache/Sessions)
- **ORM:** Prisma
- **Authentication:** JWT + Passport.js (Google, Facebook OAuth)

## 2. Kullanıcı Rolleri

### 2.1 Öğrenci
- Ders ve konu görüntüleme
- Oyun oynama
- Sınav/quiz çözme
- İlerleme takibi
- Avatar ve mağaza
- Rozet/başarı görüntüleme

### 2.2 Veli
- Çocuk hesabı yönetimi
- İlerleme raporları görüntüleme
- Bildirim ayarları
- BEP takibi
- Öğretmenle iletişim

### 2.3 Öğretmen
- Öğrenci listesi yönetimi
- Ödev atama ve takip
- İlerleme analizi
- BEP oluşturma/düzenleme
- İçerik önerisi
- Veli iletişimi

### 2.4 Admin
- Kullanıcı yönetimi
- İçerik yönetimi (CRUD)
- Platform ayarları
- Analitik dashboard
- Sistem raporları

## 3. Modüller

### 3.1 Dersler
- **Temel:** Matematik, Türkçe, Hayat Bilgisi/Fen
- **Genişletilmiş:** İngilizce, Sosyal Bilgiler
- **Yaşam Becerileri:** Günlük yaşam, öz bakım, sosyal beceriler

Her ders için:
- Sınıf bazlı ayrım (1-8. sınıf + okul öncesi)
- Konu anlatımları (metin + etkileşimli animasyon)
- Alıştırmalar
- Oyunlar
- Sınavlar

### 3.2 Oyunlar
- **Eşleştirme/Hafıza:** Kart eşleştirme, hafıza oyunları
- **Sürükle-Bırak:** Sıralama, yerleştirme, gruplama
- **Basit Arcade:** Puan toplama, hedef vurma, engelden kaçma
- Her oyun ders/konu ile ilişkili
- Zorluk seviyeleri (kolay, orta, zor)
- Puan ve rozet kazanımı

### 3.3 Sınavlar (Oyunlaştırılmış)
- Çoktan seçmeli
- Boşluk doldurma
- Eşleştirme
- Sürükle-bırak sıralama
- Stressiz ortam (süre baskısı yok opsiyonu)
- Anında görsel geri bildirim
- Yanlış cevaplarda ipucu

### 3.4 Gamification
- **Puan sistemi:** Her aktivitede puan kazanımı
- **Seviyeler:** XP ile seviye atlama
- **Rozetler:** Başarı rozetleri (100+ farklı rozet)
- **Avatar:** Özelleştirilebilir avatar
- **Mağaza:** Puanla avatar aksesuarı satın alma
- **Liderlik Tablosu:** Sınıf/okul bazlı sıralamalar

### 3.5 BEP Yönetimi
- BEP şablonları
- Hedef belirleme
- İlerleme eşleştirme
- Otomatik rapor oluşturma
- PDF export

### 3.6 Bildirimler
- Email (haftalık/aylık raporlar)
- Push (başarı, hatırlatma)
- SMS (önemli uyarılar)
- Uygulama içi bildirimler

### 3.7 Sosyal Özellikler
- Arkadaş ekleme
- Sınıf grupları
- Grup aktiviteleri
- Mesajlaşma (moderasyonlu)

## 4. Erişilebilirlik

### 4.1 Görsel
- Yüksek kontrast modu
- Büyük yazı tipi seçeneği
- Ayarlanabilir renk temaları
- Koyu/açık mod

### 4.2 İşitsel
- Tüm içerikler için TTS (Text-to-Speech)
- Sesli talimatlar
- Ses efektleri (açılıp kapanabilir)
- Arka plan müziği (açılıp kapanabilir)

### 4.3 Bilişsel
- Basitleştirilmiş arayüz modu
- Minimum dikkat dağıtıcı
- Tutarlı navigasyon
- Görsel ipuçları
- Akıllı mola hatırlatıcı

## 5. Teknik Gereksinimler

### 5.1 Frontend
```
/client
├── src/
│   ├── components/
│   │   ├── common/         # Button, Card, Modal, Input vb.
│   │   ├── layout/         # Header, Sidebar, Footer
│   │   ├── games/          # Oyun bileşenleri
│   │   ├── lessons/        # Ders bileşenleri
│   │   ├── quiz/           # Sınav bileşenleri
│   │   ├── gamification/   # Rozet, seviye, avatar
│   │   └── accessibility/  # Erişilebilirlik bileşenleri
│   ├── pages/
│   │   ├── auth/           # Login, Register, ForgotPassword
│   │   ├── student/        # Öğrenci sayfaları
│   │   ├── parent/         # Veli sayfaları
│   │   ├── teacher/        # Öğretmen sayfaları
│   │   └── admin/          # Admin sayfaları
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   ├── useAccessibility.ts
│   │   ├── useSound.ts
│   │   └── useOffline.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── AccessibilityContext.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── lesson.service.ts
│   │   └── game.service.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts
```

### 5.2 Backend
```
/server
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── lesson.controller.ts
│   │   ├── game.controller.ts
│   │   ├── quiz.controller.ts
│   │   └── admin.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── lesson.service.ts
│   │   ├── game.service.ts
│   │   ├── notification.service.ts
│   │   └── bep.service.ts
│   ├── models/
│   │   └── (Prisma generated)
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── lesson.routes.ts
│   │   ├── game.routes.ts
│   │   └── admin.routes.ts
│   └── utils/
│       ├── jwt.ts
│       ├── encryption.ts
│       └── validators.ts
└── prisma/
    └── schema.prisma
```

### 5.3 Database Schema (Prisma)

Temel tablolar:
- User (id, email, password, role, profile, settings)
- Student (userId, grade, specialNeeds, parentId)
- Parent (userId, children[])
- Teacher (userId, students[], classes[])
- Lesson (id, subject, grade, title, content, order)
- Topic (id, lessonId, title, content, animations)
- Game (id, topicId, type, config, difficulty)
- Quiz (id, topicId, questions[], settings)
- Progress (userId, lessonId/gameId/quizId, score, completedAt)
- Achievement (id, name, description, icon, criteria)
- UserAchievement (userId, achievementId, earnedAt)
- BEP (studentId, goals[], progress[])
- Notification (userId, type, content, read, sentAt)

## 6. Güvenlik

- HTTPS everywhere
- JWT token authentication
- Password hashing (bcrypt)
- Rate limiting
- Input validation (Zod)
- SQL injection protection (Prisma)
- XSS protection
- CSRF protection
- KVKK & GDPR uyumlu
- Audit logging
- 2FA (opsiyonel)

## 7. Geliştirme Fazları

### Faz 1 - Çekirdek (MVP)
- [ ] Proje yapısı kurulumu
- [ ] Authentication sistemi
- [ ] Temel kullanıcı yönetimi
- [ ] 1 ders için konu anlatımı
- [ ] 2-3 basit oyun
- [ ] Basit sınav sistemi
- [ ] Temel ilerleme takibi

### Faz 2 - Genişletme
- [ ] Tüm dersler ve konular
- [ ] Tüm oyun türleri
- [ ] Gamification sistemi
- [ ] Veli paneli
- [ ] Öğretmen paneli
- [ ] Bildirim sistemi

### Faz 3 - Tam Özellik
- [ ] Admin paneli
- [ ] BEP yönetimi
- [ ] Sosyal özellikler
- [ ] Offline destek
- [ ] Çoklu dil
- [ ] Gelişmiş analitik

## 8. Test Gereksinimleri

- Unit tests (Jest)
- Integration tests
- E2E tests (Cypress/Playwright)
- Accessibility tests (axe-core)
- Performance tests

## 9. Deployment

- Docker Compose konfigürasyonu
- Environment variables
- CI/CD pipeline (GitHub Actions)
- Monitoring & Logging
