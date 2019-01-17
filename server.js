// Żeby odpalić:  node server.js -e js,hbs lub nodemon server.js -e js,hbs
const express = require('express');
const hbs = require("hbs");
const fs = require('fs');
const port = process.env.PORT || 3000;  // pobranie portu, gdy nie znajdzie wstawi 3000
var app = express();

hbs.registerPartials(__dirname + "/views/partials"); // dodanie pliku który jest czesciami html
app.set("view engine", "hbs");


app.use((req, res, next) =>{    //middleware
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) =>{
        if(err){
            console.log("Unable to append to server log")
        }
    } );
    next();     // przechodzi do następnego requesta
});

app.use((req, res, next) =>{    //middleware
    res.render('error.hbs', {
        pageTitle: 'We works hard'
    });
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{   // odwolanie w kodzie: {{screamIt "to bedzie duze"}}
    return text.toUpperCase();              // {{funckja argument[]}}
});

app.get('/',(req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: "Hello this is node site"
    });
});

app.get('/about',(req,res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get("/bad", (req, res) =>{

    res.send({
        errorMessage: "Something goes bad"
    });
});
app.listen(port, () =>{ // port od heroku
    console.log(`Server is up on port ${port}`);
});