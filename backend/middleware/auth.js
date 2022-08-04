const jwt = require('jsonwebtoken');

//Middleware qui permet de verifier les information d'authentification envoyé par le client. Il prendra le token envoyer par le client, en verifier la validité et permettra au différente route d'en exploiter les differente information tel que le user id
// Try Catch permet au cas ou de traiter les erreur
module.Exports = (req, res, next) => {
    try{    
        // On récupere le token grace au header, et le spliter (le token etant en deuxieme).
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'TOKENALEATOIRE');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    }
    catch(error) {
        res.status(401).json({error});
    }
}