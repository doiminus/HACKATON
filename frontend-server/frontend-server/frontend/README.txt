Sporterica – Full Stack Sports Competition Platform
=================================================
Live app:

Test user: 'nogomet@liga.hr'
Test Pass: 'Programinglife123'

https://sporterica.ordonovus.com/
=================================================

This is a full-stack web application for managing and displaying sports competitions. It includes:

- Django (Backend REST API)
- Express (Proxy Middleware Server)
- React (Frontend Single Page Application)
- Tailwind CSS + Redux + React Router + Bootstrap

Everything is pre-configured. You only need to install dependencies and run the project.

--------------------------------------------------
License
--------------------------------------------------

This project is licensed under the MIT License.

--------------------------------------------------
Project Structure
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
Quick Start
--------------------------------------------------

1. Clone the Repository

    git clone https://github.com/yourusername/Sporterica.git
    cd Sporterica

2. Setup Django Backend

    cd backend
    python -m venv venv
    source venv/bin/activate       (on Windows: venv\Scripts\activate)
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver

Django API will be available at: http://localhost:8000

3. Setup Express + React Frontend

    cd ../frontend-server
    npm install
    cd frontend
    npm install
    cd ..
    npm run dev

Frontend will be available at: http://localhost:5555

--------------------------------------------------
Environment Variables
--------------------------------------------------

Make sure these .env files exist:

frontend-server/.env
---------------------
PORT=5555
API_URL=http://localhost:8000
NODE_ENV=development

frontend-server/frontend/.env
-----------------------------
REACT_APP_API_URL=http://localhost:5555/api

--------------------------------------------------
Admin Panel
--------------------------------------------------

After creating the superuser, visit:

    http://localhost:8000/admin

--------------------------------------------------
Features
--------------------------------------------------

- Match schedule with scrollable date picker
- Filterable match list
- Map view of venues (Leaflet or Google Maps)
- Admin vs Public roles
- JWT Authentication
- React-Express-Django full-stack proxy architecture
- Tailwind CSS + Bootstrap + Mobile-first design
- Redux for state management

--------------------------------------------------
Technology Stack
--------------------------------------------------

Backend      : Django, Django REST Framework
Frontend     : React, Redux, React Router
Middleware   : Express, http-proxy-middleware
Styling      : Tailwind CSS, Bootstrap
Auth         : JWT via djangorestframework-simplejwt
Database     : MySQL

--------------------------------------------------
Developer Notes
--------------------------------------------------

- All dependencies are already defined in requirements.txt and package.json files
- No need to create folders or files manually
- Backend and frontend are decoupled but work together via the Express proxy

--------------------------------------------------
Contributing
--------------------------------------------------

Feel free to fork the repo, create issues, or submit pull requests.

--------------------------------------------------
Author
--------------------------------------------------

Created by Danijel Jurić – 2025
