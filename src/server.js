//Get the express and https modules
const express = require("express");
const https = require('https');

//instantiate the app
const app = express();
//with a static server for static files in the public directory
app.use(express.static("public"));

//set the template engine to pug
app.set("view engine", "pug");

//json parser
app.use(express.json());
//
app.use(express.urlencoded({
    extended: true
}));

//Get the key and certification for https
const fs = require('fs');
const key = fs.readFileSync('server.key');
const cert = fs.readFileSync('server.cert');


app.get('/', sendAbout);
function sendAbout(req, res){
    res.render("index.pug");
}


app.get('/portfolio', sendPortfolio);

//Purpose: Respond to a request for "/portfolio" with either a JSON of my list of project or the HTML page
function sendPortfolio(req, res){
    res.format(
        {
            "application/json" : function(){
                let data = require("../JSON/projects.json")
                res.status(200).send(data);
            },

            "text/html" : function(){
                res.render("portfolio.pug");
            }
        }
    );
}

app.get("/contactme", sendContactForm);
function sendContactForm(req, res){
    res.render("contactme.pug");
}


app.post("/contactme", getMessage)

function getMessage(req, res){
    const message = `
        <h2>You've been contacted!</h2>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h4>Subject: ${req.body.subject}</h4>
        <p>Message: ${req.body.message}</p>
    `;

    //node mailer to recieve the emails
    const mailJS = require("./mailer.js");
    mailJS.main(message);
    res.render("received.pug");
}

//start the server listening
const server = https.createServer({key: key, cert: cert }, app);
server.listen(3001, () => { console.log('listening on 3001') });;
