var jwt = require("jsonwebtoken")
var secret = "jierji034i0rt09549854jgbji0t4ji0tgjefu9hrfi0j?;v,rpkl";

module.exports = function(req, res, next){
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1]

        try {            
            var decoded = jwt.verify(token, secret);
            if (decoded.role) {
                next()                
            }else{
                res.status(403)
                res.send("Você não tem permissão")
                return;
            }
        } catch (error) {
            res.status(403)
            res.send("Você não está codificado")
            return
        }

    } else {
        res.status(403)
        res.send("Você não está autenticado")
        return
    }
}

