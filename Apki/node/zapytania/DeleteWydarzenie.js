const router = require('express').Router()
const client = require('./Polaczenie')





// To może się jeszcze przydać

//   router.post('/', (req, res) => {
//     const {zmienna} = req.params
//     console.log('tutaj dopisz stringa', req.body)
//     client.query('SELECT * FROM wydarzenie WHERE id_wydarzenie = $1', [zmienna])
//         .then(result => {
//             res.status(201).json(
//                 result.rows
//             )
//             console.log(result.rows[0].id_wydarzenie)
//         })
//         .catch(err => {
//             console.error(err)
//             res.status(500).json({err})
//         })
// })



router.post('/:id', (req, res) => {
    const {id} = req.params

    try{

        client.query('DELETE FROM wydarzenie WHERE id_wydarzenie= $1', [id])
    }
    catch{

        (err => {
            console.error(err)
            res.status(500).json({err})
        })
    }
})


module.exports = router
