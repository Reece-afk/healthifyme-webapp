# HealthifyMe – Fullstack WebApp

## Projektübersicht

HealthifyMe ist eine moderne Webanwendung zur Artikelverwaltung mit Nutzerregistrierung, Authentifizierung und Artikelveröffentlichung.

Technologien:

- **Frontend:** React, Redux, Redux Saga, Material UI
- **Backend:** Node.js, Express, MongoDB
- **Sonstiges:** JWT, Cookies, Vercel (CI/CD)

---

## Funktionsumfang

- Nutzerregistrierung & Login
- Artikel erstellen, laden (öffentlich), und schreiben (eingeloggt)
- Navigation zwischen Seiten (Home, Kontakt, Über uns, Login/Register)
- Responsives UI mit Material UI
- (Demo) Artikelanzeige & Formulare

---

## .env-Datei (nur bei lokaler Ausführung notwendig)

Für den Betrieb des Backends wird eine `.env`-Datei im Ordner `/backend` benötigt. Beispielinhalt:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthifyme
JWT_SECRET=dein_geheimer_key

> Diese Datei ist in `.gitignore` eingetragen und wird **nicht** im Repository angezeigt.
> Beim ZIP-Export ist sie enthalten.

## CI/CD Deployment

### CI/CD mit Vercel

- Das Frontend wird bei jedem Commit auf `main` automatisch gebaut und deployed.
- Tool: [Vercel](https://vercel.com)
- Repository: [`reece-afk/healthifyme-webapp`](https://github.com/reece-afk/healthifyme-webapp)
- Verknüpfung über GitHub
- Framework-Preset: Create React App
- Build-Command: `npm run build`
- Output: `/build`
- Root Directory: `/frontend`

### Deployment-URL (Frontend)

[https://healthifyme-webapp.vercel.app](https://healthifyme-webapp.vercel.app)

Hinweis: Das Backend wurde **nicht deployed**, sondern lokal betrieben.
Daher ist die Webapp **nicht voll funktionsfähig** (Login & Artikelanzeige sind ohne Server nicht möglich).

---

## Unit-Tests

Ein Unit-Test für den Login wurde erfolgreich erstellt (Jest + React Testing Library).  
Dabei wird überprüft, ob beim Absenden des Formulars die `loginStart`-Action korrekt aufgerufen wird.

- Getestete Datei: `Login.test.jsx` im Verzeichnis `src/pages/`
- Test läuft erfolgreich (`npm test`)
- Hinweis: Zur Kompatibilität wurde `react-router-dom` auf **Version 6** gesetzt.
