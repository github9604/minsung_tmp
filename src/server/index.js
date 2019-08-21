const express = require("express");
const path = require( 'path');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const session = require("express-session");
import api from './routes';

const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'min9604',
    password: '!zpdlxl9604',
    database: 'kt_intern',
    port: '6002'
});

connection.connect();

app.use(session({
    key: 'kt',
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    // cookie: {
    //     expires:  600000
    // },
    saveUninitialized: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static("dist"));

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', api);

// app.use('/', express.static(path.join(__dirname, './../public')));

app.get('*', function (request, response){
    response.sendFile(path.resolve('dist', 'index.html'));
});
 
app.listen(process.env.PORT || 7000, function(){
    console.log("Started listening on port", 7000);
});