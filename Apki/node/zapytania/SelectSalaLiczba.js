const router = require('express').Router()
const client = require('./Polaczenie')


router.get('/:id', (req, res) => {
    const {id} = req.params
    client.query('SELECT liczba_miejsc FROM sala where id_sala = $1',[id])
    .then(result => {
        res.status(201).json(
            result.rows[0]
        )
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({err})
    })
})

module.exports = router