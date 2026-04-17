Sporterica – Full Stack Platforma za Sportska Natjecanja
=================================================
Live pregled apliakcije:
https://sporterica.ordonovus.com/
=================================================

Ovo je full-stack web aplikacija za upravljanje i prikaz sportskih natjecanja. Koristi:

- Django (backend REST API)
- Express (posrednički/proxy server)
- React (frontend SPA – Single Page Application)
- Tailwind CSS + Redux + React Router + Bootstrap

Sve je unaprijed pripremljeno. Potrebno je samo instalirati ovisnosti i pokrenuti projekt.

--------------------------------------------------
Licenca
--------------------------------------------------

Ovaj projekt je objavljen pod MIT licencom (pogledaj datoteku LICENSE).

--------------------------------------------------
Struktura Projekta
--------------------------------------------------

Sporterica:
├── LICENSE
├── README.txt
├── README_hr.txt
├── backend
│   ├── LICENSE
│   ├── manage.py
│   ├── requirements.txt
│   ├── auth_site
│   ├── media
│   ├── reservations
│   ├── static
│   ├── trader
│   └── users
├── frontend-server
│   ├── .env
│   ├── index.js
│   ├── LICENSE
│   ├── package-lock.json
│   ├── package.json
│   ├── frontend
│   ├── public
│   └── src
└── routes
    ├── index.js
    ├── auth
    └── data

--------------------------------------------------
Brzi Start
--------------------------------------------------

1. Kloniraj repozitorij

    git clone https://github.com/doiminus/HACKATON.git
    cd Sporterica

2. Postavljanje Django backenda

    cd backend
    python -m venv venv
    source venv/bin/activate       (na Windowsu: venv\Scripts\activate)
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver

Django API će biti dostupan na: http://localhost:8000

3. Postavljanje Express + React frontenda

    cd ../frontend-server
    npm install
    cd frontend
    npm install
    cd ..
    npm run dev

Frontend će biti dostupan na: http://localhost:5555

--------------------------------------------------
Konfiguracija .env datoteka
--------------------------------------------------

frontend-server/.env
---------------------
PORT=5555
API_URL=http://localhost:8000
NODE_ENV=development

frontend-server/frontend/.env
-----------------------------
REACT_APP_API_URL=http://localhost:5555/api

--------------------------------------------------
Admin Sučelje
--------------------------------------------------

Nakon kreiranja superuser-a, pristupi:

    http://localhost:8000/admin

--------------------------------------------------
Značajke
--------------------------------------------------

- Vremenska traka s kalendarom za odabir datuma
- Lista utakmica s filtrima
- Prikaz lokacija na karti (Leaflet ili Google Maps)
- Role korisnika: javni vs. admin
- Autentikacija putem JWT tokena
- Arhitektura: React + Express (proxy) + Django backend
- Tailwind CSS + Bootstrap za dizajn
- Redux za upravljanje stanjem aplikacije

--------------------------------------------------
Tehnologije
--------------------------------------------------

Backend      : Django, Django REST Framework  
Frontend     : React, Redux, React Router  
Middleware   : Express, http-proxy-middleware  
Stilovi      : Tailwind CSS, Bootstrap  
Autentikacija: JWT (djangorestframework-simplejwt)  
Baza podataka: MySQL

--------------------------------------------------
Napomene za razvoj
--------------------------------------------------

- Sve potrebne ovisnosti već su definirane u requirements.txt i package.json datotekama
- Nema potrebe za ručnim kreiranjem mapa ili datoteka
- Backend i frontend rade zajedno pomoću Express proxy sloja

--------------------------------------------------
Doprinos
--------------------------------------------------

Slobodno forkaj repozitorij, prijavi issue ili pošalji pull request.

--------------------------------------------------
Autor
--------------------------------------------------

Izradio: Danijel Jurić – 2025.
