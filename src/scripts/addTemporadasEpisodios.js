const database = require('../services/database')
const Filme = require('../models/filme')
const Temporada = require('../models/temporada')
const Episodio = require('../models/episodio')
const filmesJson = require('../data/filme.json')

const addTemporadasEpisodios = async () => {
    try {
        const series = await Filme.find({ tipo: 'serie' }).select('_id')
        for (let serie of series) {
            console.log(`FILME ${serie} -------`)
            const numTemporadas = Math.floor(Math.random() * 5 + 1)
            for (let i = 1; i <= numTemporadas; i++) {
                console.log(`INSERINDO TEMPORADA ${i} de ${numTemporadas}`)
                const temporada = await Temporada.create({
                    filme_id: serie,
                    titulo: `Temporada ${i}`
                })
                const numEpisodios = Math.floor(Math.random() * 5 + 1)
                for (let x = 1; x <= numEpisodios; x++) {
                    console.log(`INSERINDO EPISODIOS ${x} de ${numEpisodios}`)
                    await Episodio.create({
                        temporada_id: temporada._id,
                        titulo: `Episodio ${x}`,
                        numero: x,
                        descricao:
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took.',
                        capa: 'https://picsum.photos/300/200',

                    })
                }
            }
        }
        console.log('Final do Script')
    } catch (err) {
        console.log(err.message)
    }
}
addTemporadasEpisodios()