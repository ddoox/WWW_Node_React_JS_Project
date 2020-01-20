const router = require('express').Router()
const client = require('./Polaczenie')


router.get('/:id', (req, res) => {
    const {id} = req.params
    client.query('SELECT numer_miejsca FROM rezerwacja WHERE id_wydarzenie= $1', [id])
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