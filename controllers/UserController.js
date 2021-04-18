var User = require("../models/User")
var PasswordToken = require("../models/PasswordToken")

class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users)
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id)
        if (user == undefined) {
            res.statusCode = 404;
            res.json({})
        } else {
            res.statusCode = 200;
            res.json(user)
        }
    }

    async create(req, res){
        var {email, name, password} = req.body;
        
        if (email == undefined) {
            res.statusCode = 400;
            res.json({err: "This email is invalid"})
            return;
        }
        
        if (name == undefined) {
            res.statusCode = 400;
            res.json({err: "This name is invalid"})
            return;
        }

        if (password == undefined) {
            res.statusCode = 400;
            res.json({err: "This email is empty"})
            return;
        }

        var emailExists = await User.findEmail(email)

        if (emailExists) {
            res.statusCode = 406;
            res.json({err: "Email já cadastrado"})
            return;
        }

        await User.new(email, password, name)

        res.statusCode = 200;
        res.send("Tudo ok")
    }

    async edit(req, res){
        var {id, name, role, email} = req.body;
        var result = await User.update(id, email, name, role)
        if (result != undefined) {
            if (result.status) {
                res.status(200)
                res.send("Tudo ok");
            } else {
                res.statusCode = 406;
                res.send(result.err)
            }
        }else{
            res.status(406)
            res.send("Ocorreu um erro no servidor")
        }
    }

    async remmove(req, res){
        var id = req.params.id;

        var result = await User.delete(id)
        if (result.status) {
            res.statusCode = 200;
            res.send("Tudo ok")
        } else {
            res.statusCode = 406;
            res.send(result.err)
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if (result.status) {
            res.status(200);
            res.send("" +result.token)
        }else{
            res.status(406)
            res.send(result.err)
        }
    }
}

module.exports = new UserController();