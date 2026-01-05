1) Doel van de app (in 1 zin)

Een interne webapp voor Het Spectrum waarmee admin sollicitaties (uit e-mail + bijlagen) kan registreren en koppelen aan vacatures, waarna directie/staf sollicitanten kan beoordelen, rangschikken, een keuze kan registreren en antwoordmails kan voorbereiden en versturen.

2) Gebruikersrollen (simpel houden)

We houden het bewust beperkt tot 3 rollen.

Rollen

Admin

Vacatures aanmaken/bewerken

Sollicitanten + sollicitaties aanmaken/bewerken

Bijlagen uploaden (CV/brief)

Toewijzen sollicitatie aan 1+ vacatures

Voorstelmail genereren en klaarzetten (maar niet verplicht verzenden)

Directie

Alles bekijken

Evaluatie invullen + rangschikking + “gekozen”

Voorstelmail nakijken en “goedkeuren/verzenden”

Staf (directie-collega) / Arbeidspsycholoog

Alles bekijken

Evaluatie invullen

(optioneel) mail nakijken

Geen beheer (tenzij jullie dat willen)

In het sjabloon staat ook “Directie handtekening” en “Arbeidspsycholoog handtekening”. Dat nemen we digitaal op als “afgewerkt door” + timestamp + optionele naam. 

20150119_SJ_Sjabloon overzicht …

3) Scope: MVP vs uitbreidingen (super belangrijk voor 8 weken)
MVP (moet klaar binnen 8 weken)

A. Vacatures

Lijst + detail

Aanmaken/bewerken: titel, vereisten (tekst), graad, vak, aantal uren, periode, startdatum

B. Sollicitanten & sollicitaties

Admin kan nieuwe sollicitant + sollicitatie registreren

Upload bijlagen (CV, brief) en bewaren

Sollicitatie kan aan meerdere vacatures gekoppeld worden

C. Selectiegesprekken / evaluatie

Per vacature een “Overzicht selectiegesprekken” digitaal:

Kandidaten (naam), datum, uur

Checkbox: geschikt / minder geschikt / niet geschikt

Rangschikking (nummer)

Gekozen (ja/nee)

Aftekenen: Directie + Arbeidspsycholoog (naam + datum)

Dit volgt jullie sjabloon. 

20150119_SJ_Sjabloon overzicht …

D. Mails (semi-automatisch)

Op basis van evaluatie-status een voorstelmail-template genereren:

“Uitgenodigd”, “Reserve”, “Niet weerhouden”, “Nog in behandeling”

Mail kan nagelezen worden en dan op “Verzenden” (of minstens “Klaar om te verzenden” als echte mail te spannend is)

E. Notificaties in-app

Als Admin een nieuwe sollicitant/sollicitatie toevoegt: Directie + Staf zien “Nieuwe sollicitatie toegevoegd” in een notificatie-lijst (in de app).

Stretch goals (alleen als MVP af is)

“Auto-extract” uit PDF/Word (CV/brief) → velden voorstellen (naam, e-mail, telefoon)

E-mail inbox koppeling (IMAP/Gmail) om e-mails automatisch in te lezen

Export naar PDF van het “overzicht selectiegesprekken”

Audit log (wie wijzigde wat)

4) Schermen (routes) die jullie bouwen
Auth

/login

/logout

Dashboard

/ (dashboard)

nieuwe notificaties

recent toegevoegde sollicitaties

open vacatures

Vacatures

/jobs

/jobs/new

/jobs/:jobId

Sollicitaties (applications)

/applications

/applications/new

/applications/:applicationId

kandidaatinfo + bijlagen

gekoppelde vacatures

status + evaluaties

Kandidaten (optioneel aparte lijst)

/candidates

/candidates/:candidateId

Evaluatie per vacature (zoals het Word-sjabloon)

/jobs/:jobId/selection

tabel “Gesprek 1..n” of dynamisch per kandidaat

geschikt/minder/niet + rang + gekozen

“aftekenen” directie/arbeidspsycholoog

Mails

/mail/outbox

/mail/outbox/:mailId (preview + “markeer verzonden” of “verzend”)

5) Datamodel (Turso / SQLite) – simpel maar degelijk
Tabellen (kern)

users

id, name, email (unique), password_hash, role (admin|directie|staf|psycholoog), created_at

jobs

id, title, requirements_text, grade, subject, hours, period_text, start_date, created_by, created_at

candidates

id, first_name, last_name, email, phone, notes, created_at

applications

id, candidate_id, source_email_subject, source_email_from, received_at (optioneel), status (new|in_review|decision_made), created_by, created_at

application_jobs (many-to-many)

application_id, job_id (composite PK)

attachments

id, application_id, kind (cv|letter|other), filename, storage_path, mime_type, uploaded_at

evaluations

id, job_id, application_id,

interview_date, interview_time,

verdict (geschikt|minder|niet),

ranking_int,

chosen_bool,

evaluator_user_id,

created_at, updated_at

selection_signoffs

id, job_id, role (directie|psycholoog), signed_by_user_id, signed_at

notifications

id, user_id, type (new_application), payload_json, is_read, created_at

mail_drafts

id, application_id, job_id (nullable), template_type (invite|reject|reserve|pending),

subject, body, status (draft|approved|sent),

created_by, approved_by, sent_at

Belangrijk: evaluatie hangt eigenlijk aan (job + application), want dezelfde kandidaat kan gelinkt zijn aan meerdere vacatures en dus meerdere evaluaties hebben.

6) Tech stack (zoals jij vraagt, met SSR + Express + Turso + Vercel)
Frontend + SSR

React (JS) + SSR via Express

Vite voor dev + build (SSR build)

React Router (of eigen routing) voor pagina’s

Phosphor Icons

Reguliere CSS (liefst met een mini design system: variables + utility classes)

Backend

Express als server:

SSR render route (HTML)

API routes (/api/...) voor CRUD

Auth (cookie session)

Turso DB via @libsql/client (simpel, JS-friendly)

Hosting (Vercel)

Vercel kan SSR + API, maar Express als “klassieke server” is lastiger.

Realistische aanpak voor klasproject:

In ontwikkeling: node server.js (Express SSR)

Op Vercel: bouwen als “serverless function entry” (alles in 1 handler) of

Als dat te veel gedoe wordt: SSR behouden maar deploy op een Node-host (Render/Fly)
Je zei “Vercel sowieso”: dan zetten we in de roadmap expliciet “Deploy spike” in week 6 zodat je op tijd weet of het lukt.

7) Projectstructuur (professioneel, modulair/atomair)

/server

server.js (Express setup, SSR entry, API mounting)

/db

client.js (Turso client)

schema.sql (DDL)

migrations/

/auth

password.js (hash/verify)

session.js (cookie session helpers + middleware)

requireRole.js

/routes-api

jobs.js

candidates.js

applications.js

evaluations.js

mail.js

notifications.js

/services

jobsService.js (DB queries)

applicationsService.js

evaluationService.js

mailService.js

extractService.js (stretch: pdf/word parsing)

/storage

upload.js (multer config)

files.js (path helpers)

/src (client/SSR shared)

/pages

DashboardPage.jsx

JobsListPage.jsx

JobDetailPage.jsx

ApplicationNewPage.jsx

ApplicationDetailPage.jsx

SelectionOverviewPage.jsx

OutboxPage.jsx

/components (atomair)

/atoms (Button, Input, Badge, Icon, Label)

/molecules (FormRow, Card, Table, Modal)

/organisms (JobForm, ApplicationForm, EvaluationTable, MailPreview)

/layouts

AppLayout.jsx (sidebar/topbar)

/lib

apiClient.js (fetch wrapper)

format.js (dates)

/styles

tokens.css (colors, spacing)

base.css

components.css

/shared

constants.js (roles, statuses, template types)

validators.js (basic input checks)

8) Feature list (als backlog met prioriteit)
P0 (MVP must-have)

Login + rollen

Vacatures CRUD

Kandidaten + sollicitaties CRUD

Koppelen sollicitatie ↔ vacatures (many-to-many)

Bijlagen uploaden/bekijken/downloaden

Evaluatie invullen per vacature + kandidaat:

verdict (3 opties), ranking, gekozen, datum/uur

“Overzicht selectiegesprekken” scherm per vacature (tabel)

Notificaties (in-app) bij nieuwe sollicitatie

Mail draft genereren + preview + status (draft/approved/sent)

P1 (nice-to-have)

Zoek + filters (op vacature, verdict, status)

Export/print van selectie-overzicht

P2 (stretch)

Auto-extract uit PDF/DOCX naar voorstelvelden

Inbox koppeling (e-mail import)

9) Roadmap (8 weken × 3u les) met concrete deadlines

Ik schrijf dit alsof jullie elke week 1 “lesblok” hebben. Thuiswerk kan, maar deadlines blijven.

Week 1 — Setup & DB (deadline: einde week 1)

Repo + branching afspraken

Basisskeleton: Express + Vite SSR “Hello dashboard”

Turso connectie werkt

DB schema v1 + seed users (admin/directie/staf)

Deliverable: je kan inloggen en een lege dashboardpagina zien.

Week 2 — Vacatures (deadline: einde week 2)

Jobs API (CRUD)

Jobs pages: list + new + detail/edit

CSS basis: layout + buttons + forms

Deliverable: directie/admin kan vacatures beheren.

Week 3 — Kandidaten + Sollicitaties (deadline: einde week 3)

Candidates + Applications API

“Nieuwe sollicitatie” flow:

kandidaat selecteren of nieuw

sollicitatie opslaan

koppelen aan 1+ vacatures

Deliverable: admin kan sollicitatie registreren en linken aan vacatures.

Week 4 — Bijlagen + detailpagina (deadline: einde week 4)

Upload & storage (multer)

Application detail: bijlagenlijst + download

UI polish (cards, tabellen)

Deliverable: admin kan CV/brief uploaden, directie kan ze openen.

Week 5 — Evaluatie + Selectie-overzicht (deadline: einde week 5)

Evaluations API

Selection Overview per vacature (volgens sjabloon)

Ranking + gekozen + verdict + datum/uur

Sign-off (directie/psycholoog) als simpele knop “Afgewerkt”

Deliverable: het digitale “Overzicht selectiegesprekken” werkt. 

20150119_SJ_Sjabloon overzicht …

Week 6 — Mails + notificaties + deploy spike (deadline: einde week 6)

Notificaties: bij nieuwe sollicitatie → directie/staf krijgen item

Mail drafts:

template genereren op basis van verdict/chosen

preview + “approved”

Deploy spike Vercel: bewijzen dat SSR + API werkt op Vercel, of alternatief beslissen.

Deliverable: end-to-end flow + eerste online versie.

Week 7 — Stabiliseren & UX (deadline: einde week 7)

Validatie + error handling

Filters/zoeken (minstens op vacatures + verdict)

Rolrestricties afwerken (admin vs directie)

Deliverable: app is “gebruiksklaar” voor testdata.

Week 8 — Test, bugs, polish, demo (deadline: einde week 8)

Testscenario’s + bugfixes

Demo-script + screenshots

Backups/export (minstens CSV export van selectie-overzicht of print view)

Deliverable: finale oplevering + demo.

11) Rechten (simpel, maar correct)

Gebruik middleware:

requireAuth → iedereen moet ingelogd zijn

requireRole(['admin','directie']) etc.

Matrix (kort)

Admin: alles behalve finale keuze? (mag wel “mail draft” maken)

Directie: evaluaties + chosen + sign-off + approve mail

Staf: evaluaties + bekijken + (optioneel) approve mail

Psycholoog: evaluaties + sign-off

12) Auto-extract uit PDF/Word (realistische aanpak)

Omdat dit vaak “tijdvretend” wordt, maak het P2/stretch.

Praktisch voorstel:

MVP: admin typt gegevens over uit mail + cv.

Stretch: “Extract”-knop:

PDF: probeer tekst te lezen (als het echte tekst-PDF is, lukt dat vaak)

DOCX: tekst uitlezen

Daarna simpele regex heuristieken:

e-mail, telefoon, naam (eerste regels)

Als dit faalt: toon “extract mislukt, vul manueel aan”.

13) Definition of Done (DoD) per feature (voor jullie Git workflow)

Elke feature is pas “done” als:

Werkt in browser

Toegangsrechten kloppen

Validatie + foutmelding aanwezig

Data correct in Turso

Minstens 1 korte testcase (“hoe reproduceer ik?”)