class UserController{
    async index(req, res){}

    async create(req, res){
        var {email, name, password} = req.body;
        
        if (email == undefined) {
            res.statusCode = 400;
            res.json({err: "This email is invalid"})
        }
        
        if (name == undefined) {
            res.statusCode = 400;
            res.json({err: "This name is invalid"})
        }

        if (password == undefined) {
            res.statusCode = 400;
            res.json({err: "This email is empty"})
        }


        res.statusCode = 200;
        res.send("Tudo ok")
    }
}

module.exports = new UserController();