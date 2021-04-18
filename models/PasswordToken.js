var knex = require("../database/connection");
var User = require("./User");

class PasswordToken{
    async create(email){
        var user = await User.findByEmail(email);        
        if (user != undefined) {
            try {
                var token = Date.now();
                await knex.insert({
                    id_user: user.id,
                    used: 0,
                    token: token
                }).table("password_tokens");

                return {status: true, token: token}
            } catch (error) {
                console.log(error)
                return {status: false, err: error}
            }
            
        }else{
            return {status: false, err: "The email informed not exists bd"}
        }
    }
}

module.exports = new PasswordToken();