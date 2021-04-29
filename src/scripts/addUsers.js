const database = require('../services/database')
const Usuario = require('../models/usuario')
const usuariosJson = require('../data/usuario.json')

const addUsers = async () => {
    try{
        for(let usuario of usuariosJson){
            console.log(`Inserindo ${usuario.nome}`)
            await new Usuario(usuario).save()
        }
        console.log('Final do Script')
    }catch(err){
        console.log(err.message)
    }
}
addUsers()