# Testing Guide - Het Spectrum Sollicitaties App

## 🎯 Doel van dit document
Dit document beschrijft **hoe je de applicatie end-to-end test** om te verifiëren dat alle features werken zoals verwacht.

---

## 📋 Voorbereiding

### 1. Start de applicatie
```bash
npm run dev
```

### 2. Open de applicatie
Navigeer naar: http://localhost:3000

### 3. Test credentials
- **Admin**: admin@hetspectrum.be / Welcome123!
- **Directie**: directie@hetspectrum.be / Welcome123!
- **Staf**: staf@hetspectrum.be / Welcome123!
- **Psycholoog**: psycholoog@hetspectrum.be / Welcome123!

---

## 🧪 Test Scenarios

### Test 1: Authenticatie & Login
**Doel**: Verifiëren dat login werkt voor alle rollen

**Steps**:
1. Open http://localhost:3000
2. Login met admin@hetspectrum.be / Welcome123!
3. Verifieer dat je doorgestuurd wordt naar het dashboard
4. Check dat je naam en rol zichtbaar zijn in de header
5. Klik op "Uitloggen"
6. Verifieer dat je teruggestuurd wordt naar de login pagina

**Verwacht resultaat**: ✅ Login werkt, dashboard wordt getoond, uitloggen werkt

---

### Test 2: Dashboard Overview
**Doel**: Verifiëren dat dashboard statistieken correct toont

**Steps**:
1. Login als admin
2. Bekijk het dashboard
3. Check dat de statistiek kaarten tonen:
   - Aantal vacatures
   - Aantal sollicitaties
   - Aantal kandidaten
4. Check dat "Recente sollicitaties" lijst correct toont
5. Check dat "Open vacatures" lijst correct toont

**Verwacht resultaat**: ✅ Dashboard toont correcte data en statistieken

---

### Test 3: Vacature Beheer (CRUD)
**Doel**: Verifiëren dat vacatures kunnen worden aangemaakt, bekeken, bewerkt en verwijderd

#### 3.1 Vacature aanmaken
**Steps**:
1. Login als admin of directie
2. Navigeer naar "Vacatures" in de sidebar
3. Klik op "Nieuwe vacature" knop
4. Vul het formulier in:
   - Titel: "Leraar Frans"
   - Vak: "Frans"
   - Leerjaar: "3e graad"
   - Uren: "20"
   - Periode: "Schooljaar 2025-2026"
   - Startdatum: Kies een datum
   - Vereisten: "Masterdiploma Frans, onderwijservaring"
5. Klik op "Opslaan"

**Verwacht resultaat**: ✅ Vacature wordt aangemaakt en verschijnt in de lijst

#### 3.2 Vacature bekijken
**Steps**:
1. Klik op de aangemaakte vacature in de lijst
2. Verifieer dat alle informatie correct wordt getoond

**Verwacht resultaat**: ✅ Vacature detail pagina toont correcte informatie

#### 3.3 Vacature bewerken
**Steps**:
1. Klik op "Bewerken" knop op de vacature detail pagina
2. Wijzig het aantal uren naar "24"
3. Klik op "Opslaan"
4. Verifieer dat de wijziging zichtbaar is

**Verwacht resultaat**: ✅ Vacature wordt bijgewerkt

---

### Test 4: Kandidaat & Sollicitatie Beheer
**Doel**: Verifiëren dat kandidaten en sollicitaties kunnen worden beheerd

#### 4.1 Kandidaat aanmaken via sollicitatie
**Steps**:
1. Login als admin
2. Navigeer naar "Sollicitaties"
3. Klik op "Nieuwe sollicitatie"
4. Vul kandidaatgegevens in:
   - Voornaam: "Marie"
   - Achternaam: "Janssens"
   - Email: "marie.janssens@example.com"
   - Telefoon: "0471234567"
5. Selecteer een of meerdere vacatures (bv. "Leraar Frans")
6. Vul sollicitatie details in:
   - Bron email onderwerp: "Sollicitatie Leraar Frans"
   - Bron email van: "marie.janssens@example.com"
   - Ontvangstdatum: Kies een datum
7. Klik op "Opslaan"

**Verwacht resultaat**: ✅ Sollicitatie wordt aangemaakt en kandidaat wordt toegevoegd aan de database

#### 4.2 Sollicitatie bekijken
**Steps**:
1. Navigeer naar de sollicitaties lijst
2. Klik op de aangemaakte sollicitatie
3. Verifieer dat alle informatie correct wordt getoond

**Verwacht resultaat**: ✅ Sollicitatie detail pagina toont kandidaat info en gekoppelde vacatures

---

### Test 5: Bestandsuploads (CV & Motivatiebrief)
**Doel**: Verifiëren dat CV's en motivatiebrieven kunnen worden geüpload

**Steps**:
1. Open een sollicitatie detail pagina
2. Scroll naar de "Bijlagen" sectie
3. Klik op "CV uploaden" of "Motivatiebrief uploaden"
4. Selecteer een PDF of Word bestand
5. Verifieer dat het bestand verschijnt in de lijst
6. Klik op het bestand om het te downloaden/openen

**Verwacht resultaat**: ✅ Bestanden worden correct geüpload en kunnen worden geopend

**Note**: In development worden bestanden lokaal opgeslagen in de `/uploads` folder.

---

### Test 6: Evaluaties & Selectie-overzicht
**Doel**: Verifiëren dat evaluaties kunnen worden ingevuld en het selectie-overzicht correct werkt

#### 6.1 Evaluatie invullen
**Steps**:
1. Login als staf of directie
2. Navigeer naar een vacature detail pagina
3. Scroll naar de "Sollicitaties" sectie
4. Klik op een sollicitatie
5. Vul evaluatie in:
   - Gespreksdatum: Kies een datum
   - Gespreks tijd: "14:00"
   - Verdict: Kies "geschikt", "minder" of "niet"
   - Ranking: Voer een nummer in (bv. 1, 2, 3)
   - Gekozen: Vink aan indien gekozen
6. Klik op "Opslaan"

**Verwacht resultaat**: ✅ Evaluatie wordt opgeslagen

#### 6.2 Selectie-overzicht bekijken
**Steps**:
1. Navigeer naar een vacature
2. Klik op "Selectie-overzicht" of "Overzicht selectiegesprekken"
3. Verifieer dat alle geëvalueerde kandidaten worden getoond
4. Check dat de tabel correct sorteerbaar en filterbaar is

**Verwacht resultaat**: ✅ Selectie-overzicht toont alle evaluaties in een overzichtelijke tabel

---

### Test 7: Sign-offs (Aftekenen door directie/psycholoog)
**Doel**: Verifiëren dat het selectie-overzicht kan worden afgetekend

**Steps**:
1. Login als directie
2. Open het selectie-overzicht van een vacature
3. Klik op "Aftekenen als directie"
4. Verifieer dat de aftekening zichtbaar is (met datum en naam)
5. Logout en login als psycholoog
6. Open hetzelfde selectie-overzicht
7. Klik op "Aftekenen als psycholoog"
8. Verifieer dat beide aftekeningen zichtbaar zijn

**Verwacht resultaat**: ✅ Sign-offs worden correct opgeslagen en getoond

---

### Test 8: Mail Templates & Outbox
**Doel**: Verifiëren dat mail templates kunnen worden gegenereerd en goedgekeurd

#### 8.1 Mail draft aanmaken
**Steps**:
1. Login als admin of directie
2. Navigeer naar een sollicitatie
3. Klik op "Mail voorbereiden"
4. Kies een template type:
   - "invite" (uitnodiging voor gesprek)
   - "reject" (afwijzing)
   - "reserve" (reservelijst)
   - "pending" (in afwachting)
5. Pas de mail aan indien nodig
6. Klik op "Opslaan als concept"

**Verwacht resultaat**: ✅ Mail draft wordt opgeslagen

#### 8.2 Mail goedkeuren
**Steps**:
1. Navigeer naar "Mail Outbox" in de sidebar
2. Klik op de aangemaakte mail draft
3. Bekijk de preview
4. Klik op "Goedkeuren"
5. Verifieer dat de status wijzigt naar "Goedgekeurd"

**Verwacht resultaat**: ✅ Mail wordt goedgekeurd en kan worden verzonden

---

### Test 9: Notificaties
**Doel**: Verifiëren dat notificaties correct werken

**Steps**:
1. Login als een gebruiker (bv. directie)
2. Laat een tweede gebruiker (bv. admin) een nieuwe sollicitatie aanmaken
3. Refresh de pagina of wacht even
4. Check of er een notificatie verschijnt in de header/topbar
5. Klik op de notificatie
6. Verifieer dat je doorgestuurd wordt naar de juiste pagina

**Verwacht resultaat**: ✅ Notificaties verschijnen en zijn klikbaar

---

### Test 10: Rol-gebaseerde toegang
**Doel**: Verifiëren dat verschillende rollen verschillende toegang hebben

**Tests per rol**:

#### Admin
- ✅ Kan vacatures aanmaken/bewerken
- ✅ Kan sollicitaties aanmaken/bewerken
- ✅ Kan kandidaten beheren
- ✅ Kan bestanden uploaden
- ✅ Kan mails voorbereiden

#### Directie
- ✅ Kan alles bekijken
- ✅ Kan evaluaties invullen
- ✅ Kan selectie-overzicht aftekenen
- ✅ Kan mails goedkeuren/verzenden

#### Staf
- ✅ Kan evaluaties invullen
- ✅ Kan selectie-overzicht bekijken
- ⛔ Kan NIET mails verzenden

#### Psycholoog
- ✅ Kan evaluaties invullen
- ✅ Kan selectie-overzicht bekijken en aftekenen
- ⛔ Kan NIET mails verzenden

**Steps**: Test deze toegangsrechten door in te loggen als verschillende gebruikers

**Verwacht resultaat**: ✅ Rol-gebaseerde toegang werkt correct

---

## 🐛 Bug Reporting

Als je een bug vindt tijdens het testen:

1. **Noteer de stappen** om de bug te reproduceren
2. **Screenshot** indien mogelijk
3. **Console errors** bekijken (F12 → Console tab)
4. **Server logs** bekijken in de terminal waar `npm run dev` draait

---

## ✅ Test Checklist

Gebruik deze checklist om te verifiëren dat alle features werken:

- [ ] Login werkt voor alle rollen
- [ ] Dashboard toont correcte statistieken
- [ ] Vacatures kunnen worden aangemaakt/bewerkt/verwijderd
- [ ] Sollicitaties kunnen worden aangemaakt
- [ ] Kandidaten worden correct opgeslagen
- [ ] CV's en motivatiebrieven kunnen worden geüpload
- [ ] Evaluaties kunnen worden ingevuld
- [ ] Selectie-overzicht toont correcte data
- [ ] Sign-offs werken (directie & psycholoog)
- [ ] Mail templates kunnen worden gegenereerd
- [ ] Mails kunnen worden goedgekeurd
- [ ] Notificaties verschijnen bij nieuwe sollicitaties
- [ ] Rol-gebaseerde toegang werkt correct
- [ ] Uitloggen werkt

---

## 🎉 Succes!

Als alle tests slagen, is de applicatie **productie-klaar** en kan deze gedeployed worden naar Vercel!
