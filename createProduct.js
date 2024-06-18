// createProduct.js

const mongoose = require('mongoose');
const Product = require('./models/Products');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tiendaWeb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creamos una instancia del modelo Product con los datos del nuevo producto
const productsData = [
    {
      "name": "Camiseta Deportiva",
      "description": "Camiseta deportiva de alta calidad para entrenamiento y actividades al aire libre.",
      "price": 29.99,
      "category": "Ropa Deportiva"
    },
    {
      "name": "Zapatillas para Correr",
      "description": "Zapatillas cómodas y duraderas para correr en cualquier terreno.",
      "price": 79.99,
      "category": "Calzado Deportivo"
    },
    {
      "name": "Pantalones de Yoga",
      "description": "Pantalones suaves y elásticos ideales para la práctica de yoga y actividades de relajación.",
      "price": 39.99,
      "category": "Ropa Deportiva"
    },
    {
      "name": "Balón de Fútbol",
      "description": "Balón oficial de tamaño y peso estándar para jugar al fútbol.",
      "price": 24.99,
      "category": "Deportes"
    },
    {
      "name": "Raqueta de Tenis",
      "description": "Raqueta ligera y resistente ideal para jugadores de tenis de todos los niveles.",
      "price": 89.99,
      "category": "Tenis"
    },
    {
      "name": "Bicicleta de Montaña",
      "description": "Bicicleta robusta con suspensión completa para explorar senderos de montaña.",
      "price": 599.99,
      "category": "Ciclismo"
    },
    {
      "name": "Pelota de Baloncesto",
      "description": "Pelota oficial de baloncesto para jugar en canchas interiores y exteriores.",
      "price": 29.99,
      "category": "Baloncesto"
    },
    {
      "name": "Guantes de Boxeo",
      "description": "Guantes acolchados y duraderos para entrenamiento y combates de boxeo.",
      "price": 49.99,
      "category": "Boxeo"
    },
    {
      "name": "Casco de Ciclismo",
      "description": "Casco ligero y ventilado para una protección segura durante el ciclismo.",
      "price": 39.99,
      "category": "Ciclismo"
    },
    {
      "name": "Sudadera con Capucha",
      "description": "Sudadera cómoda y cálida con capucha ajustable para uso casual.",
      "price": 49.99,
      "category": "Ropa Casual"
    },
    {
      "name": "Botella de Agua Deportiva",
      "description": "Botella resistente y ergonómica para mantenerse hidratado durante el ejercicio.",
      "price": 9.99,
      "category": "Accesorios Deportivos"
    },
    {
      "name": "Mancuernas de Pesas",
      "description": "Mancuernas ajustables para entrenamiento de fuerza y desarrollo muscular.",
      "price": 39.99,
      "category": "Entrenamiento"
    },
    {
      "name": "Tabla de Surf",
      "description": "Tabla de surf de alta calidad para disfrutar de las olas en la playa.",
      "price": 299.99,
      "category": "Surf"
    },
    {
      "name": "Gorra Deportiva",
      "description": "Gorra ligera y transpirable para protección solar durante actividades al aire libre.",
      "price": 19.99,
      "category": "Accesorios Deportivos"
    },
    {
      "name": "Reloj Deportivo",
      "description": "Reloj resistente al agua con funciones de cronómetro y GPS para actividades deportivas.",
      "price": 99.99,
      "category": "Accesorios Deportivos"
    }
  ];

// Iterar sobre los datos de los productos y guardarlos en la base de datos
Product.insertMany(productsData)
  .then(savedProducts => {
    console.log('Productos guardados con éxito:', savedProducts);
  })
  .catch(error => {
    console.error('Error al guardar los productos:', error);
  });