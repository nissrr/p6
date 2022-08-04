const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user')
 
mongoose.connect('mongodb+srv://nissr94:94700Anis@cluster0.9j3jtwx.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
      });
    
app.use(express.json());
app.use('/api/auth', userRoutes);
let port = 3000;

app.set('port', port);

module.exports = app;