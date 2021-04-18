var knex = require("../database/connection")
var bcrypt = require("bcrypt")

class User {

    async findAll() {
        try {
            var result = await knex.select(["id", "email", "name", "role"]).table("users")
            return result;
        } catch (error) {
            console.log(err)
            return [];
        }
    }

    async findByEmail(email){
        try {
            var result = await knex.select(["id", "name", "email", "role"]).where({email: email}).table("users");
            if (result.length > 0) {
                return result[0]
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }

    async findById(id){
        try {
            var result = await knex.select(["id", "name", "email", "role"]).where({id: id}).table("users");
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }

    async new(email, password, name){
        try {
            var hash = await bcrypt.hash(password, 12)
            await knex.insert({email, password: hash, name, role: 0}).table("users");
        } catch (error) {
            console.log(error)
        }
    }

    async findEmail(email){
        try {
            var result  = await knex.select("*").from("users").where({email: email})
            if (result.length > 0) {
                return true;
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async update(id, email, name, role){
        var user = await this.findById(id);

        if (user != undefined) {
            var editUser = {};

            if(email != undefined){
                if (email != user.email) {
                    var result = await this.findEmail(email)
                    if (result == false) {
                        editUser.email = email
                    }else{
                        return {status: false, err: "The email exists"}
                    }
                }
            }
            if (name != undefined) {
                editUser.name = name
            }
            if (role != undefined) {
                editUser.role = role;
            }

            try {
                await knex.update(editUser).where({id: id}).table("users")
                return {status: true}
            } catch (error) {
                return {status: false, error: "O usuário não existe"}
            }

        }else{
            return {status: false, err: "The user not exists"}
        }
    }

    async delete(id){
        var user = await this.findById(id)
        if (user != undefined) {
            try {
                await knex.delete().where({id: id}).table("users")
                return {status: true}
            } catch (error) {
                return {status: false, error: err}
            }
        } else {
            return {status: false, err: "The user not exists, so he dot can be deleted"}
        }
    }
}

module.exports = new User()