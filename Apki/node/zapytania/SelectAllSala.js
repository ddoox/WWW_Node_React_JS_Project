const router = require('express').Router()
const client = require('./Polaczenie')



//kurła tylko nie usuń bo chyba Cię zabiję :* - tak się robi posta z body i parametrami z urla i parametrami w selectcie - ultra przydatne

//   router.post('/:zmienna', (req, res) => {
//     const {zmienna} = req.params
//     console.log('tutaj dopisz stringa', req.body)
//     client.query('SELECT * FROM sale WHERE id_sali = $1', [zmienna])
//         .then(result => {
//             res.status(201).json(
//                 result.rows
//             )
//             console.log(result.rows[0].id_sali)
//         })
//         .catch(err => {
//             console.error(err)
//             res.status(500).json({err})
//         })
// })

router.get('/', (req, res) => {
    client.query('SELECT * FROM sala')
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
    .catch(err => {
        console.error(err)
        res.status(500).json({err})
    })
})

  module.exports = router

