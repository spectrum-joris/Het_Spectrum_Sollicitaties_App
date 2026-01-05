# Getting Started - Het Spectrum Sollicitaties App

Deze gids helpt je om de applicatie van scratch op te zetten.

## 📋 Stap 1: Vereisten controleren

Zorg dat je het volgende geïnstalleerd hebt:

```bash
# Check Node.js versie (moet 18+ zijn)
node --version

# Check npm
npm --version
```

Als Node.js niet geïnstalleerd is, download het van [nodejs.org](https://nodejs.org/)

## 🗄️ Stap 2: Turso Database opzetten

1. **Maak een Turso account aan:**
   - Ga naar [turso.tech](https://turso.tech)
   - Meld je aan met GitHub

2. **Installeer Turso CLI:**
```bash
# macOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash

# Windows (via Scoop)
scoop install turso
```

3. **Login met Turso:**
```bash
turso auth login
```

4. **Maak een database aan:**
```bash
# Maak database
turso db create het-spectrum-sollicitaties

# Haal database URL op
turso db show het-spectrum-sollicitaties --url

# Genereer auth token
turso db tokens create het-spectrum-sollicitaties
```

5. **Noteer de volgende gegevens:**
   - Database URL (bijv. `libsql://het-spectrum-sollicitaties-xxx.turso.io`)
   - Auth token (lange string met letters en cijfers)

## ⚙️ Stap 3: Project configureren

1. **Installeer dependencies:**
```bash
npm install
```

2. **Maak .env bestand aan:**
```bash
cp .env.example .env
```

3. **Bewerk .env met je Turso gegevens:**
```
TURSO_DATABASE_URL=libsql://het-spectrum-sollicitaties-xxx.turso.io
TURSO_AUTH_TOKEN=jouw-auth-token-hier
SESSION_SECRET=verander-dit-naar-een-willekeurige-string
PORT=3000
NODE_ENV=development
```

**Belangrijk:** De `SESSION_SECRET` moet een lange, willekeurige string zijn. Genereer er een met:
```bash
# macOS/Linux
openssl rand -base64 32

# Of gebruik een website zoals:
# https://www.uuidgenerator.net/
```

## 🗃️ Stap 4: Database initialiseren

1. **Run de migrations:**
```bash
npm run migrate
```

Dit commando:
- Maakt alle tabellen aan
- Voegt testgebruikers toe
- Voegt voorbeeldvacatures toe

2. **Controleer of het gelukt is:**

Je zou moeten zien:
```
✓ Migrations completed
✓ Created user: admin@hetspectrum.be
✓ Created user: directie@hetspectrum.be
✓ Created user: staf@hetspectrum.be
✓ Created user: psycholoog@hetspectrum.be
✓ Database seeded successfully
```

## 🚀 Stap 5: Applicatie starten

1. **Start development server:**
```bash
npm run dev
```

2. **Open browser:**
   - Ga naar [http://localhost:3000](http://localhost:3000)
   - Je zou de login pagina moeten zien

3. **Log in met testgebruiker:**
   - Email: `admin@hetspectrum.be`
   - Wachtwoord: `Welcome123!`

## ✅ Stap 6: Verificatie

Test de volgende functionaliteit:

### 1. Vacatures
- Ga naar "Vacatures" in het menu
- Je zou 2 voorbeeldvacatures moeten zien
- Klik op "Nieuwe vacature" en maak een vacature aan

### 2. Sollicitaties
- Ga naar "Sollicitaties"
- Klik op "Nieuwe sollicitatie"
- Maak een nieuwe kandidaat aan
- Link de sollicitatie aan een vacature

### 3. Bijlagen uploaden
- Open een sollicitatie
- Upload een testbestand als CV
- Controleer of het verschijnt in de lijst

### 4. Evaluaties
- Ga naar een vacature detail
- Klik op "Selectie-overzicht"
- Vul evaluatiegegevens in en sla op

### 5. Notificaties
- Log in als directie gebruiker
- Check of je een notificatie ziet van de nieuwe sollicitatie

## 🐛 Troubleshooting

### Database connection error

**Probleem:** `Error: TURSO_DATABASE_URL is not defined`

**Oplossing:**
1. Controleer of `.env` bestand bestaat
2. Controleer of `TURSO_DATABASE_URL` correct is ingevuld
3. Herstart de server

### Port already in use

**Probleem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Oplossing:**
```bash
# Stop alle Node processen
pkill -f node

# Of gebruik een andere port
PORT=3001 npm run dev
```

### Migrations fail

**Probleem:** Migrations geven errors

**Oplossing:**
1. Reset de database:
```bash
turso db destroy het-spectrum-sollicitaties
turso db create het-spectrum-sollicitaties
```

2. Haal nieuwe credentials op en update `.env`
3. Run migrations opnieuw

### Cannot find module errors

**Probleem:** `Error: Cannot find module '@libsql/client'`

**Oplossing:**
```bash
# Verwijder node_modules en installeer opnieuw
rm -rf node_modules package-lock.json
npm install
```

### File upload errors

**Probleem:** Files kunnen niet worden geüpload

**Oplossing:**
1. Controleer of `uploads` folder bestaat:
```bash
mkdir -p uploads
```

2. Controleer permissies:
```bash
chmod 755 uploads
```

## 📚 Volgende stappen

Nu de app draait, kun je:

1. **De code verkennen:**
   - Start met [App.jsx](src/App.jsx) voor routing
   - Bekijk [server.js](server/server.js) voor de backend
   - Check de [API routes](server/routes-api) voor endpoints

2. **Features toevoegen:**
   - Volg de [ROADMAP.md](ROADMAP.md) voor de planning
   - Werk samen volgens de taakverdeling

3. **Deployment voorbereiden:**
   - Lees [Deployment section in README](README.md#-deployment)
   - Test lokaal met `npm run build && npm run preview`

## 🆘 Hulp nodig?

- **Documentatie:** Lees de [README.md](README.md)
- **API endpoints:** Zie API sectie in README
- **Database schema:** Check [schema.sql](server/db/schema.sql)
- **Git issues:** Maak een issue aan in de repository

## 👥 Team Taakverdeling

Verdeel de taken volgens de ROADMAP:
- **Week 1-2:** Setup + Vacatures
- **Week 3-4:** Sollicitaties + Bijlagen
- **Week 5-6:** Evaluaties + Mails
- **Week 7-8:** Polish + Testing

Veel succes! 🚀
