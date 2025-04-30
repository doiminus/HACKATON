const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

require('dotenv').config();
const loginRoute = require('./routes/auth/login');
const registerRoute = require('./routes/auth/register');
const logoutRoute = require('./routes/auth/logout');
const me = require('./routes/auth/me');
const refresh = require('./routes/auth/refresh');

const getAllEvents = require('./routes/data/getAllEvents');
const getSingleEvent = require('./routes/data/getSingleEvent');
const postEvent = require('./routes/data/postEvent');

const getOrganization = require('./routes/data/getOrganization');
const getSports = require('./routes/data/getSports');
const getTeams = require('./routes/data/getTeams');
const getVenues = require('./routes/data/getVenues');

//Omogućava const (nekakav middleware) { first_name, last_name, email, password } = req.body; iz register JS
app.use(express.json());
app.use(express.static('frontend/build'));
app.use(cookieParser());

app.use(loginRoute);
app.use(registerRoute);
app.use(logoutRoute);
app.use(me);
app.use(refresh);
app.use(getAllEvents);
app.use(getSingleEvent);
app.use(postEvent);

app.use(getOrganization);
app.use(getSports);
app.use(getTeams);
app.use(getVenues);


//Route handler
app.get('*', (req, res) => {

    //__dirname je absolute path (specijalna node varijabla)
    const myPath = path.resolve(__dirname, 'client', 'build', 'index.html');
    //console.log('__dirname: ', __dirname);
    //console.log('MY path: ', myPath);


    //Šalje index iz  frontend/client/build index.html
    return res.sendFile(myPath);
});

const PORT = 5005;
//const PORT = 80;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

//Ovo sera  production folder