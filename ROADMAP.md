# ROADMAP – Sollicitatie-app Het Spectrum

Dit document is het **officiële naslagwerk en de planning** voor de ontwikkeling van de sollicitatie-app voor **Het Spectrum**. Het dient als leidraad voor de volledige klas, met duidelijke fasering, deadlines en taakverdeling.

---

## 1. Projectdoel

Een interne webapplicatie waarmee:

* **Admin** sollicitaties kan registreren (op basis van e-mails + bijlagen)
* **Directie en staf** kandidaten kunnen evalueren en rangschikken
* **Selectiebeslissingen** gestructureerd worden vastgelegd
* **Antwoordmails** semi-automatisch kunnen worden voorbereid

De applicatie vervangt het huidige Word/PDF-gedreven proces ("Overzicht selectiegesprekken").

---

## 2. Randvoorwaarden

* **Deadline:** 8 weken
* **Lesmoment:** 3 uur per week (thuiswerk toegestaan)
* **Team:** 6 leerlingen
* **Focus:** werkende MVP > perfecte afwerking

---

## 3. Tech stack (vastgelegd)

* **Frontend:** React (JavaScript, geen TypeScript)
* **Rendering:** Server Side Rendering (SSR)
* **Backend:** Node.js + Express
* **Build tool:** Vite
* **Database:** Turso (SQLite in de cloud)
* **Styling:** Reguliere CSS + CSS variables
* **Icons:** Phosphor Icons
* **Hosting:** Vercel (deploy spike voorzien)

---

## 4. Rollen en rechten (simpel gehouden)

| Rol               | Rechten                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| Admin             | Vacatures beheren, sollicitaties invoeren, bijlagen uploaden, mails voorbereiden |
| Directie          | Alles bekijken, evalueren, rangschikken, keuze maken, mails goedkeuren/verzenden |
| Staf / Psycholoog | Evaluaties invullen, selectie-overzicht bekijken                                 |

---

## 5. Functionele scope

### MVP (verplicht)

1. Login + rollen
2. Vacatures aanmaken/bewerken
3. Kandidaten + sollicitaties beheren
4. Sollicitaties koppelen aan meerdere vacatures
5. CV en sollicitatiebrief uploaden
6. Evaluatie per kandidaat per vacature
7. Digitaal "Overzicht selectiegesprekken"
8. In-app notificaties bij nieuwe sollicitatie
9. Mail-templates genereren (draft/approved/sent)

### Stretch goals (alleen indien tijd)

* Automatische data-extractie uit PDF/DOCX
* E-mail inbox koppeling
* Export naar PDF

---

## 6. Roadmap per week

### Week 1 – Setup & fundament

**Doel:** project kan draaien, inloggen werkt

* Repository opzetten
* Express + Vite SSR skeleton
* Turso connectie
* Database schema v1
* Login + sessies

**Deliverable:** dashboardpagina zichtbaar na login

---

### Week 2 – Vacatures

**Doel:** vacatures volledig beheersbaar

* Jobs API (CRUD)
* Vacature-overzicht + detail + formulier
* Basis CSS layout

**Deliverable:** admin/directie kan vacatures beheren

---

### Week 3 – Kandidaten & sollicitaties

**Doel:** sollicitaties registreren en koppelen

* Candidates API
* Applications API
* Koppeling sollicitatie ↔ vacatures (many-to-many)
* Formulier "nieuwe sollicitatie"

**Deliverable:** admin kan sollicitatie toevoegen en linken

---

### Week 4 – Bijlagen & detailpagina

**Doel:** dossiers raadpleegbaar maken

* Upload CV/brief (multer)
* Opslag en download
* Sollicitatie-detailpagina

**Deliverable:** directie kan dossiers volledig inkijken

---

### Week 5 – Evaluaties & selectie-overzicht

**Doel:** kern van het project

* Evaluations API
* Evaluatieformulier per kandidaat per vacature
* Rangschikking + verdict (geschikt/minder/niet)
* Digitaal "Overzicht selectiegesprekken"
* Aftekenen door directie/psycholoog

**Deliverable:** selectieproces volledig digitaal

---

### Week 6 – Mails, notificaties & deploy spike

**Doel:** end-to-end flow + online test

* In-app notificaties bij nieuwe sollicitatie
* Mail draft genereren op basis van evaluatie
* Preview + goedkeuring
* **Deploy spike op Vercel** (haalbaarheid check)

**Deliverable:** volledige flow + online versie

---

### Week 7 – Stabilisatie & UX

**Doel:** app robuust en gebruiksvriendelijk

* Validatie + foutafhandeling
* Filters (vacature, verdict, status)
* Rechten afdwingen per rol
* UI polish

**Deliverable:** app klaar voor echte testdata

---

### Week 8 – Test, bugfix & demo

**Doel:** afronden en presenteren

* Testscenario’s uitschrijven
* Bugs oplossen
* Demo-flow voorbereiden
* Screenshots / printbare selectie-overzicht

**Deliverable:** finale oplevering + demo

---

## 7. Taakverdeling (richtlijn)

### Aline

* CSS tokens & layout
* Tabellayout selectie-overzicht
* SQL schema & testdata

### Suhail

* Database queries & services
* Turso integratie
* Filters & joins

### Emre

* API routes
* Validatie & edge cases
* Attachments security

### Artun

* CSS implementatie van componenten
* Layout (sidebar/topbar)
* Finale UI cleanup

### Noa

* SSR & routing
* Auth & rollen
* Notificaties + mail flow
* Deploy spike leiden

### Noah

* Formulieren (JobForm, ApplicationForm)
* DOM-interactie
* Testscenario’s & demo-voorbereiding

---

## 8. Definition of Done (voor elke feature)

Een feature is **af** als:

* Ze werkt end-to-end
* Rechten correct worden afgedwongen
* Validatie en foutmeldingen aanwezig zijn
* Data correct wordt opgeslagen in Turso
* Er minstens één testscenario is beschreven

---

**Dit document is leidend.**
Afwijken mag enkel na overleg en met behoud van een werkende MVP.
