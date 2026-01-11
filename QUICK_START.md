# Quick Start Guide - Het Spectrum Sollicitaties App

## 🚀 In 5 minuten aan de slag

### 1. Installeer dependencies
```bash
npm install
```

### 2. Configureer environment variabelen
De applicatie werkt out-of-the-box met Turso Cloud database (al geconfigureerd).

**Optioneel**: Als je eigen database wilt gebruiken, kopieer `.env.example` naar `.env`:
```bash
cp .env.example .env
```

En pas de waardes aan in `.env`.

### 3. Start de applicatie
```bash
npm run dev
```

De applicatie is nu beschikbaar op: **http://localhost:3000**

### 4. Login met testgebruikers

De database bevat al testgebruikers:

| Rol | Email | Wachtwoord |
|-----|-------|-----------|
| Admin | admin@hetspectrum.be | Welcome123! |
| Directie | directie@hetspectrum.be | Welcome123! |
| Staf | staf@hetspectrum.be | Welcome123! |
| Psycholoog | psycholoog@hetspectrum.be | Welcome123! |

### 5. Verken de applicatie

De database bevat al sample data:
- ✅ 2 vacatures (Leraar Wiskunde, Leraar Nederlands)
- ✅ 3 kandidaten met sollicitaties
- ✅ 1 evaluatie als voorbeeld
- ✅ 1 notificatie als voorbeeld

---

## 📁 Belangrijke bestanden

| Bestand | Beschrijving |
|---------|--------------|
| [ROADMAP.md](ROADMAP.md) | Complete roadmap met implementatiestatus |
| [TESTING_GUIDE.md](TESTING_GUIDE.md) | Uitgebreide testinstructies |
| [SETUP.md](SETUP.md) | Technische setup documentatie |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment naar Vercel |
| [DONE_LIST.MD](DONE_LIST.MD) | Overzicht geïmplementeerde features |

---

## 🎯 Wat kan je doen?

### Als Admin:
- ✅ Vacatures beheren (aanmaken, bewerken, verwijderen)
- ✅ Sollicitaties registreren
- ✅ CV's en motivatiebrieven uploaden
- ✅ Kandidaten beheren
- ✅ Mail templates voorbereiden

### Als Directie:
- ✅ Alles wat Admin kan
- ✅ Evaluaties invullen
- ✅ Selectie-overzicht bekijken en aftekenen
- ✅ Mails goedkeuren en verzenden

### Als Staf:
- ✅ Evaluaties invullen
- ✅ Selectie-overzicht bekijken
- ✅ Kandidaten bekijken

### Als Psycholoog:
- ✅ Evaluaties invullen
- ✅ Selectie-overzicht bekijken en aftekenen
- ✅ Kandidaten bekijken

---

## 📚 Meer informatie nodig?

### Technische setup
Zie [SETUP.md](SETUP.md) voor gedetailleerde technische documentatie.

### Testen
Zie [TESTING_GUIDE.md](TESTING_GUIDE.md) voor complete test scenarios.

### Deployment
Zie [DEPLOYMENT.md](DEPLOYMENT.md) voor deployment instructies naar Vercel.

---

## 🆘 Problemen oplossen

### De database is leeg
Run het migratie script:
```bash
npm run migrate
```

Dit maakt alle tabellen aan en vult ze met testdata.

### De server start niet
Check of:
- Node.js is geïnstalleerd (versie 18 of hoger)
- Alle dependencies zijn geïnstalleerd (`npm install`)
- Poort 3000 is niet in gebruik

### Ik zie geen data in de applicatie
- Check of je bent ingelogd
- Run `npm run migrate` om testdata toe te voegen
- Check de console voor error messages

---

## 🎉 Success!

Je bent nu klaar om de applicatie te gebruiken!

**Volgende stappen:**
1. Verken de verschillende pagina's via de sidebar navigatie
2. Test het aanmaken van een nieuwe vacature
3. Registreer een nieuwe sollicitatie
4. Vul een evaluatie in
5. Bekijk het selectie-overzicht

Voor uitgebreide test scenarios, zie [TESTING_GUIDE.md](TESTING_GUIDE.md).
