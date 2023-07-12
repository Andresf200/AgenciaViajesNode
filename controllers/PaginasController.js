import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimonal.js";

const paginaInicio = async (req, res) => {

        const promiseDB = [];

        promiseDB.push(Viaje.findAll({limit: 3}));
        promiseDB.push(Testimonial.findAll({limit: 3}));
    try {
        const resultados = await Promise.all(promiseDB);
        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultados[0],
            testimoniales: resultados[1],
        })
    } catch (error) {
        console.log(error);
    }

};

const paginaNosotros = (req, res) => {
    res.render('nosotros',{
        pagina: 'Nosotros',
    })
};

const paginaViajes = async (req, res) => {
    //Consultar BD

    const viajes =  await Viaje.findAll();
    res.render('viajes',{
        pagina: 'Proximos Viajes',
        viajes
    })
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;
    try {
       const viaje = await Viaje.findOne({where: {slug: slug}});

       res.render('viaje',{
        pagina: 'Información Viaje',
        viaje
       });
    } catch (error) {
       console.log(error); 
    }
};

const paginaTestimoniales = async (req, res) => {

    const testimoniales =  await Testimonial.findAll();
    try {
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        }) 
    } catch (error) {
       console.log(error); 
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetalleViaje,
    paginaTestimoniales
}
