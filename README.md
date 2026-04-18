# Jotform Frontend Challenge Project

## User Information
Please fill in your information after forking this repository:

- **Name**: Erkim Berk Ünsal

## Project Description
**Missing Podo: The Ankara Case** is an Investigation Dashboard built for the 3-hour Jotform Frontend Challenge. 

The objective of this project is to track down Jotform's missing mascot, Podo, by consolidating scattered data from various API endpoints (Checkins, Messages, Sightings, Personal Notes, and Anonymous Tips). The application normalizes these disparate data structures and presents them in a unified, chronological flow. 

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
```bash
cd jotform-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment Setup:**
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Fill in the Jotform API credentials and Form IDs in `.env`

4. **Start the development server:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
jotform-frontend/
├── src/
│   ├── services/api.jsx          # Jotform API client
│   ├── hooks/useFetchSubmissions.jsx  # Data fetching hook
│   ├── components/               # React components
│   └── App.jsx                   # Main app
├── .env                          # API credentials
└── package.json
```

# 🚀 Challenge Duyurusu

## 📅 Tarih ve Saat
Cumartesi günü başlama saatinden itibaren üç saattir.

## 🎯 Challenge Konsepti
Bu challenge'da, size özel hazırlanmış bir senaryo üzerine web uygulaması geliştirmeniz istenecektir. Challenge başlangıcında senaryo detayları paylaşılacaktır.Katılımcılar, verilen GitHub reposunu fork ederek kendi geliştirme ortamlarını oluşturacaklardır.

## 📦 GitHub Reposu
Challenge için kullanılacak repo: https://github.com/cemjotform/2026-frontend-challenge-ankara

## 🛠️ Hazırlık Süreci
1. GitHub reposunu fork edin
2. Tercih ettiğiniz framework ile geliştirme ortamınızı hazırlayın
3. Hazırladığınız setup'ı fork ettiğiniz repoya gönderin

## 💡 Önemli Notlar
- Katılımcılar kendi tercih ettikleri framework'leri kullanabilirler
