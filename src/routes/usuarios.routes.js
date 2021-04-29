const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')

router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        const usuario = await Usuario.findOne(body)
        if(usuario){
            res.json({ error: false, usuario })
        }else{
            res.json({ error: true, message: 'nenhum usuario encontrado' })
        }
        
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})

module.exports = router;
