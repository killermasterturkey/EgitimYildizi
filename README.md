# EğitimYıldızı

Özel eğitime ihtiyaç duyan çocuklar için etkileşimli eğitim platformu.

Interactive educational platform for children with special needs.

## Özellikler / Features

- Tüm eğitim seviyeleri (Okul öncesi - Ortaokul)
- Özel ihtiyaç gruplarına uygun erişilebilirlik
- Etkileşimli oyunlar ve aktiviteler
- Oyunlaştırılmış öğrenme deneyimi
- BEP (Bireysel Eğitim Programı) yönetimi
- Çoklu kullanıcı rolleri (Öğrenci, Veli, Öğretmen, Admin)
- Kapsamlı ilerleme takibi ve raporlama

## Teknolojiler / Technologies

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL, Redis
- **Authentication:** JWT, OAuth 2.0 (Google, Facebook)

## Kurulum / Installation

```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build
```

## Proje Yapısı / Project Structure

```
egitimyildizi/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React bileşenleri
│   │   ├── pages/          # Sayfa bileşenleri
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # React context
│   │   ├── services/       # API servisleri
│   │   ├── utils/          # Yardımcı fonksiyonlar
│   │   ├── types/          # TypeScript tipleri
│   │   ├── assets/         # Görseller, sesler
│   │   └── styles/         # CSS/SCSS dosyaları
│   └── public/             # Statik dosyalar
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # İş mantığı
│   │   ├── models/         # Veritabanı modelleri
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Yardımcı fonksiyonlar
│   │   └── types/          # TypeScript tipleri
│   └── prisma/             # Prisma schema & migrations
├── shared/                 # Paylaşılan kod
│   └── types/              # Ortak TypeScript tipleri
└── docs/                   # Dokümantasyon
```

## Lisans / License

MIT License

---

Geliştirici / Developer: [@killermasterturkey](https://github.com/killermasterturkey)
