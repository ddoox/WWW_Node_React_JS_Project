// Placeholder

const router = require('express').Router()
const client = require('./Polaczenie')



router.post('/:id_wydarzenie/:numer_miejsca', (req, res) => {
    const {id_wydarzenie,numer_miejsca} = req.params
  
    try{
        let queryText = 'INSERT INTO rezerwacja(id_wydarzenie, numer_miejsca) VALUES ($1, $2)'
        let queryParams = [id_wydarzenie,numer_miejsca]
        client.query(queryText, queryParams)
    }
    catch(err){
        console.error(err)
        res.status(500).json({err})
    }
})



module.exports = router