const router = require('express').Router()
const client = require('./Polaczenie')

router.post('/:liczba_miejsc', (req, res) => {
    const {liczba_miejsc} = req.params

    try{
        let queryText = 'INSERT INTO sala(liczba_miejsc) VALUES ($1)'
        let queryParams = [liczba_miejsc]
        client.query(queryText, queryParams)
    }
    catch(err){
        console.error(err)
        res.status(500).json({err})
    }
})

module.exports = router