const router = require('express').Router()
const client = require('./Polaczenie')


router.post('/:id', (req, res) => {
    const {id} = req.params
    try{
        client.query('SELECT FROM wydarzenie WHERE id_wydarzenie= $1', [id])
    }
    catch{
        (err => {
            console.error(err)
            res.status(500).json({err})
        })
    }
})


module.exports = router
