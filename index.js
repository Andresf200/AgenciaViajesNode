//const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app = express();

//Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.error(error));

//Agregar Body purset para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


//Definir port
const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req,res,next) => {
    const year = new Date()

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    return next();
});

//Definir la carpeta publica
app.use(express.static('./public'));

//Definir las rutas
app.use('/',router);

app.listen(port,() => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})