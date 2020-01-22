const router = require('express').Router()
const client = require('./Polaczenie')


router.get('/', (req, res) => {
    client.query('SELECT * FROM wydarzenie ORDER BY data')
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