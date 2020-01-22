// Placeholder

const router = require('express').Router()
const client = require('./Polaczenie')



router.post('/:id_wydarzenie/:numer_miejsca', async (req, res) => {
    const {id_wydarzenie,numer_miejsca} = req.params
  
    try{
        let queryInsertText = 'INSERT INTO rezerwacja(id_wydarzenie, numer_miejsca) VALUES ($1, $2)'
        let queryParams = [id_wydarzenie,numer_miejsca]
        await client.query(queryInsertText, queryParams)

        let querySelectText = 'SELECT id_rezerwacja FROM rezerwacja where id_wydarzenie = $1 AND numer_miejsca = $2'
        // let queryParams2 = [id_wydarzenie,numer_miejsca]

        await client.query(querySelectText, queryParams)
        .then(result => {
            res.status(201).json(
                result.rows[0]
            )
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({err})
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({err})
    }   
})


module.exports = router