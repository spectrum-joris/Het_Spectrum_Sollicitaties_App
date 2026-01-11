# Het Spectrum - Sollicitaties App

## 🎓 Interne webapplicatie voor sollicitatiebeheer

Een complete oplossing voor Het Spectrum om sollicitaties te registreren, evalueren en opvolgen.

---

## ✨ Features

- ✅ **Authenticatie & Autorisatie**: 4 rollen (admin, directie, staf, psycholoog)
- ✅ **Vacaturebeheer**: CRUD voor vacatures
- ✅ **Kandidaten & Sollicitaties**: Volledig beheer van kandidaten en hun sollicitaties
- ✅ **Bestandsuploads**: CV's en motivatiebrieven opslaan (lokaal + Vercel Blob)
- ✅ **Evaluaties**: Kandidaten evalueren per vacature
- ✅ **Selectie-overzicht**: Digitaal "Overzicht selectiegesprekken"
- ✅ **Sign-offs**: Directie en psycholoog kunnen selecties aftekenen
- ✅ **Notificaties**: In-app notificaties bij nieuwe sollicitaties
- ✅ **Mail Templates**: Semi-automatische mail voorbereid ing en goedkeuring
- ✅ **SSR**: Server-side rendering met Vite
- ✅ **Cloud Database**: Turso (managed SQLite)

---

## 🚀 Quick Start

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 en login met:
- **Admin**: admin@hetspectrum.be / Welcome123!
- **Directie**: directie@hetspectrum.be / Welcome123!

➡️ **Zie [QUICK_START.md](QUICK_START.md) voor meer details**

---

## 📚 Documentatie

| Document | Beschrijving |
|----------|--------------|
| [QUICK_START.md](QUICK_START.md) | ⚡ In 5 minuten aan de slag |
| [ROADMAP.md](ROADMAP.md) | 📋 Complete roadmap & implementatiestatus |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | 🧪 Uitgebreide testinstructies |
| [SETUP.md](SETUP.md) | 🔧 Technische setup & architectuur |
| [DEPLOYMENT.md](DEPLOYMENT.md) | 🚢 Deployment naar Vercel |
| [GETTING_STARTED.md](GETTING_STARTED.md) | 📖 Getting started voor developers |
| [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) | 📁 Project structuur |
| [DONE_LIST.MD](DONE_LIST.MD) | ✅ Overzicht geïmplementeerde features |

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + React Router
- **Backend**: Node.js + Express
- **Database**: Turso (libSQL / SQLite in de cloud)
- **Build**: Vite
- **Styling**: CSS Variables + Atomic Design
- **Icons**: Phosphor Icons
- **Auth**: Session-based met bcrypt
- **Storage**: Hybrid (lokaal voor dev, Vercel Blob voor productie)
- **Hosting**: Vercel

---

## 📂 Project Structuur

```
├── server/              # Backend (Express API)
│   ├── db/             # Database (schema, client, seed)
│   ├── auth/           # Authenticatie (password, session)
│   ├── routes-api/     # API routes
│   ├── services/       # Business logic
│   └── storage/        # File storage management
├── src/                # Frontend (React)
│   ├── components/     # Atomic design componenten
│   ├── pages/          # Pagina's
│   ├── lib/            # Utils & API client
│   └── styles/         # CSS
├── shared/             # Gedeelde code (constants, validators)
└── docs/               # Documentatie
```

➡️ **Zie [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) voor meer details**

---

## 🧪 Testing

De applicatie bevat uitgebreide test scenarios voor:
- ✅ Authenticatie & autorisatie
- ✅ Vacaturebeheer
- ✅ Sollicitatie registratie
- ✅ Bestandsuploads
- ✅ Evaluaties & selectie-overzicht
- ✅ Mail templates & outbox
- ✅ Notificaties
- ✅ Rol-gebaseerde toegang

➡️ **Zie [TESTING_GUIDE.md](TESTING_GUIDE.md) voor volledige test instructies**

---

## 🚢 Deployment

De applicatie is deployment-ready voor Vercel:

```bash
# Build voor productie
npm run build

# Preview productie build
npm run preview

# Deploy naar Vercel
vercel --prod
```

➡️ **Zie [DEPLOYMENT.md](DEPLOYMENT.md) voor deployment instructies**

---

## 👥 Rollen & Rechten

| Rol | Rechten |
|-----|---------|
| **Admin** | Vacatures beheren, sollicitaties invoeren, bijlagen uploaden, mails voorbereiden |
| **Directie** | Alles bekijken, evalueren, rangschikken, keuze maken, mails goedkeuren/verzenden |
| **Staf** | Evaluaties invullen, selectie-overzicht bekijken |
| **Psycholoog** | Evaluaties invullen, selectie-overzicht bekijken, aftekenen |

---

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build voor productie
npm run preview      # Preview productie build
npm run migrate      # Run database migrations & seed
```

---

## 🎯 Status: PRODUCTIE-KLAAR ✅

De applicatie is **volledig functioneel** en klaar voor:
- ✅ End-to-end testing
- ✅ Demo voor stakeholders
- ✅ Deployment naar Vercel productie

**Release checklist**: 8/8 items ✅

---

## 📄 License

Intern project voor Het Spectrum.

---

## 🤝 Support

Voor vragen of problemen, zie de documentatie of contacteer het development team.

---

**Gemaakt met ❤️ voor Het Spectrum**
