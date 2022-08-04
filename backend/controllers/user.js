const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Bcrypt permettant de hash le mdp

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, nex) => {
    User.findOne({email: req.body.email})
    .then(user => {
        // Si l'utilisateur n'existe pas dans la base de donnée
        if (user === null){
            res.Status(401).json({message : 'Email ou mdp incorrect'})
        }
        // Si l'utilisateur existe, on compare les hash
        else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                // Si mdp incorrect
                if (!valid) {
                    res.Status(401).json({message : 'Email ou mdp incorrect'})
                }
                else {
                    res.status(200).json({
                        userId: user._id,
                        //Le plugin Jwt avec la fonction sign
                        //permet de créer un token d'authentification
                        token: jwt.sign(
                            {userId: user._id},
                            'TOKENALEATOIRE',
                            {expiresIn: '24h'}
                        )
                    })
                }
            })
            .catch(error => res.statut(500).json({error}))
        }
    })
    .catch(error => res.statut(500).json({error}))
};