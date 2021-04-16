class UserController{
    async index(req, res){}

    async create(req, res){
        console.log(req.body)
        res.send("Pegando  ocorpo da requisição")
    }
}

module.exports = new UserController();