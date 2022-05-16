const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const FormData = require('./models/FormData');
const { calcular } = require('./controllers/script');

let iteraciones;
app.locals.iteraciones = iteraciones;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index', {
        iteraciones: iteraciones
    });
});

app.post('/', (req, res) => {
    const formData = new FormData(
        req.body.x0,
        req.body.x1,
        req.body.Ea
    );
    let solution = calcular(formData.x0, formData.x1, formData.Ea);
    if(Array.isArray(solution)){
        iteraciones = solution
    }else{
        iteraciones = solution.error
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log('Server on ' + `http://localhost:3000/`);
});