const express = require('express')
const router = express.Router()
const _ = require('underscore')
const Filme = require('../models/filme')
const Temporada = require('../models/temporada')

router.get('/home', async (req, res) => {
    try {
        //Recuperando todos os filmes
        let filmes = await Filme.find();
        let finalFilmes = []

        //recuperando temporadas
        for(let filme of filmes){
            const temporadas = await Temporada.find({
                filme_id: filme._id,
            })
            const newFilme = { ...filme._doc, temporadas}
            finalFilmes.push(newFilme)
        }
        
        //misturar resultados aleatoriamente
        finalFilmes = _.shuffle(finalFilmes);

        //filme principal
        const principal = finalFilmes[0]

        //separar em seções
        const secoes = _.chunk(finalFilmes,5)

        res.json({ error: false, principal, secoes })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.json({ error: false, filmes })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const filmes = await Filme.findById(id);
        res.json({ error: false, filmes })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.post('/', async (req, res) => {
    try {

        const body = req.body;
        const response = await Filme.create(body)
        res.json({ error: false, filme: response })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const novo_filme = req.body;
        const filme = await Filme.findByIdAndUpdate(id, novo_filme);
        res.json({ error: false, filme })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }

})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id
        await Filme.findByIdAndDelete(id);
        res.json({ error:false })
    }catch(err){
        res.json({ error: true , message:  err.message })
    }
})

module.exports = router;
