# Folder Structure - Het Spectrum Sollicitaties App

```
het-spectrum-sollicitaties-app/
│
├── server/                          # Backend (Node.js + Express)
│   ├── db/                          # Database gerelateerd
│   │   ├── client.js                # Turso database client
│   │   ├── schema.sql               # Database schema (DDL)
│   │   ├── seed.js                  # Seed data (test users + vacatures)
│   │   └── migrations/
│   │       └── run.js               # Migration runner script
│   │
│   ├── auth/                        # Authentication & authorization
│   │   ├── password.js              # Bcrypt password hashing
│   │   └── session.js               # Session middleware + role checks
│   │
│   ├── routes-api/                  # API endpoints
│   │   ├── auth.js                  # Login/logout/me
│   │   ├── jobs.js                  # Vacatures CRUD
│   │   ├── candidates.js            # Kandidaten CRUD
│   │   ├── applications.js          # Sollicitaties CRUD + uploads
│   │   ├── evaluations.js           # Evaluaties + signoffs
│   │   ├── notifications.js         # In-app notificaties
│   │   └── mail.js                  # Mail drafts & verzenden
│   │
│   ├── services/                    # Business logic & database queries
│   │   ├── jobsService.js           # Vacature queries
│   │   ├── candidatesService.js     # Kandidaat queries
│   │   ├── applicationsService.js   # Sollicitatie queries
│   │   ├── evaluationsService.js    # Evaluatie queries
│   │   ├── notificationsService.js  # Notificatie logica
│   │   └── mailService.js           # Mail templates & queries
│   │
│   ├── storage/                     # File handling
│   │   ├── upload.js                # Multer configuratie
│   │   └── files.js                 # File path helpers
│   │
│   └── server.js                    # Express app + SSR setup
│
├── src/                             # Frontend (React)
│   ├── components/                  # React componenten (Atomic Design)
│   │   ├── atoms/                   # Basis componenten
│   │   │   ├── Button.jsx           # Button component
│   │   │   ├── Input.jsx            # Input field
│   │   │   ├── Select.jsx           # Dropdown
│   │   │   ├── Textarea.jsx         # Text area
│   │   │   ├── Label.jsx            # Form label
│   │   │   └── Badge.jsx            # Status badge
│   │   │
│   │   ├── molecules/               # Samengestelde componenten
│   │   │   ├── FormRow.jsx          # Label + input + error
│   │   │   ├── Card.jsx             # Container met header
│   │   │   ├── Table.jsx            # Data tabel
│   │   │   ├── Modal.jsx            # Popup modal
│   │   │   └── Notification.jsx     # Notificatie item
│   │   │
│   │   ├── organisms/               # Complexe componenten
│   │   │   ├── JobForm.jsx          # Vacature formulier
│   │   │   ├── ApplicationForm.jsx  # Sollicitatie formulier
│   │   │   ├── EvaluationTable.jsx  # Evaluatie tabel met edit
│   │   │   └── MailPreview.jsx      # Mail preview + edit
│   │   │
│   │   └── layouts/
│   │       └── AppLayout.jsx        # Sidebar + topbar layout
│   │
│   ├── pages/                       # Route componenten
│   │   ├── LoginPage.jsx            # Login scherm
│   │   ├── DashboardPage.jsx        # Dashboard (/)
│   │   ├── JobsListPage.jsx         # Vacatures lijst
│   │   ├── JobDetailPage.jsx        # Vacature detail
│   │   ├── JobFormPage.jsx          # Vacature aanmaken/bewerken
│   │   ├── SelectionOverviewPage.jsx # Selectiegesprekken overzicht
│   │   ├── ApplicationsListPage.jsx  # Sollicitaties lijst
│   │   ├── ApplicationFormPage.jsx   # Sollicitatie aanmaken
│   │   ├── ApplicationDetailPage.jsx # Sollicitatie detail
│   │   ├── CandidatesListPage.jsx    # Kandidaten lijst
│   │   ├── OutboxPage.jsx            # Mail outbox
│   │   └── MailDetailPage.jsx        # Mail detail
│   │
│   ├── lib/                         # Utilities
│   │   ├── apiClient.js             # Fetch wrapper voor API calls
│   │   └── format.js                # Date/time formatters
│   │
│   ├── styles/                      # CSS bestanden
│   │   ├── tokens.css               # Design tokens (colors, spacing)
│   │   ├── base.css                 # Reset + base styles
│   │   ├── components.css           # Component styles
│   │   └── layout.css               # Layout & page styles
│   │
│   ├── App.jsx                      # Root component + routing
│   ├── entry-client.jsx             # Client-side hydration
│   └── entry-server.jsx             # Server-side rendering
│
├── shared/                          # Gedeelde code (client + server)
│   ├── constants.js                 # Rollen, statuses, labels
│   └── validators.js                # Input validatie functies
│
├── uploads/                         # Geüploade bestanden (gitignored)
│
├── dist/                            # Build output (gitignored)
│   ├── client/                      # Client bundle
│   └── server/                      # SSR bundle
│
├── index.html                       # HTML template voor SSR
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite configuratie
├── vercel.json                      # Vercel deployment config
├── .env.example                     # Environment variabelen template
├── .gitignore                       # Git ignore rules
├── README.md                        # Projectdocumentatie
├── ROADMAP.md                       # 8-weken planning
├── SETUP.md                         # Project requirements
├── GETTING_STARTED.md               # Setup instructies
└── FOLDER_STRUCTURE.md              # Dit bestand

```

## 📝 Uitleg per folder

### `/server`
Backend Node.js code. Alle server-side logica, API endpoints, database interactie en authenticatie.

**Key files:**
- `server.js` - Express app entry point
- `routes-api/*.js` - REST API endpoints
- `services/*.js` - Database queries & business logic

### `/src`
Frontend React code. Alle UI componenten, pages en client-side logica.

**Key files:**
- `App.jsx` - Root component met routing
- `entry-client.jsx` - Client-side hydration
- `entry-server.jsx` - Server-side rendering

### `/src/components`
Atomic Design Pattern:
- **Atoms**: Kleinste building blocks (Button, Input)
- **Molecules**: Combinatie van atoms (FormRow = Label + Input + Error)
- **Organisms**: Complexe componenten (JobForm met meerdere FormRows)
- **Layouts**: Page layouts (Sidebar + Topbar)

### `/shared`
Code die zowel client als server gebruiken:
- Constants (rollen, statuses)
- Validators (email, telefoon)

### `/uploads`
Tijdelijke folder voor geüploade bestanden. In productie gebruik je een cloud storage service.

## 🔄 Data flow

```
User interactie
    ↓
React Component (src/pages/*.jsx)
    ↓
API Client (src/lib/apiClient.js)
    ↓
Express API Route (server/routes-api/*.js)
    ↓
Service Layer (server/services/*.js)
    ↓
Database (Turso via @libsql/client)
```

## 🎨 Component Hierarchy (voorbeeld)

```
<App>
  <AppLayout>
    <DashboardPage>
      <Card>
        <Table>
          {data.map(row => <tr>...</tr>)}
        </Table>
      </Card>
    </DashboardPage>
  </AppLayout>
</App>
```

## 📦 Key Dependencies

### Backend
- `express` - Web framework
- `@libsql/client` - Turso database client
- `bcrypt` - Password hashing
- `express-session` - Session management
- `multer` - File uploads

### Frontend
- `react` - UI library
- `react-router-dom` - Client-side routing
- `@phosphor-icons/react` - Icon library

### Build
- `vite` - Build tool & dev server
- `@vitejs/plugin-react` - React support voor Vite

## 🗂️ Naming Conventions

- **Folders**: lowercase met hyphens (`routes-api`)
- **JS/JSX files**: camelCase (`jobsService.js`)
- **React components**: PascalCase (`JobForm.jsx`)
- **CSS classes**: kebab-case (`button--primary`)
- **Database tables**: snake_case (`application_jobs`)

## 🔍 Waar vind ik...

| Wat | Waar |
|-----|------|
| API endpoint toevoegen | `server/routes-api/` |
| Database query schrijven | `server/services/` |
| Nieuwe pagina maken | `src/pages/` + route in `App.jsx` |
| Component stylen | `src/styles/components.css` |
| Constanten toevoegen | `shared/constants.js` |
| Database schema aanpassen | `server/db/schema.sql` + run migrations |
| Environment variabele | `.env` + `server.js` |

## 📚 Meer info

- **API docs**: Zie README.md sectie "API Endpoints"
- **Database schema**: Check `server/db/schema.sql`
- **Roadmap**: Zie ROADMAP.md voor planning
- **Setup**: Volg GETTING_STARTED.md
