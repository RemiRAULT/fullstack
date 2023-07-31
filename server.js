const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
var mysql = require("mysql");
const rateLimit = require("express-rate-limit");
const app = express();
const fs = require('fs');
require('dotenv').config();

// import library and files
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

var corsOptions = {
  origin: "http://localhost:8081"
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
  message : "Trop de tentatives",
});


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", limiter ,(req, res) => {
  res.json({ message: "Welcome to remi application." });
});


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// set port, listen for requests
const PORT = process.env.PORT || 8080;


require("./src/app/routes/user.routes.js")(app);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// GENERATION DE L'ACCESSTOKEN
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}


function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'});
}

const user = {
    id: 42,
    name: 'RAULT Remi',
    email: 'root',
    admin: true,
};


app.post('/api/login', limiter, (req, res) => {

    // TODO: fetch le user depuis la db basé sur l'email passé en paramètre
    if (req.body.email !== 'root') {
        res.status(401).send('invalid credentials');
        return ;
    }
    // TODO: check que le mot de passe du user est correct
    if (req.body.password !== 'password') {
        res.status(401).send('invalid password');
        return ;
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.send({
      refreshToken,
    });
});

app.post('/api/refreshToken', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
      // TODO : check en bdd que le user a toujours les droit et qu'il existe toujours
    delete user.iat;
    delete user.exp;
    const refreshedToken = generateAccessToken(user);
    res.send({
      accessToken: refreshedToken,
    });
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}

app.get('/api/me', authenticateToken, (req, res) => {
  res.send(req.user);
});



app.listen(3000, () => console.log('Server running on port 3000!'));