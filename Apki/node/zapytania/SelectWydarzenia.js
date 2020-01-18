const router = require('express').Router()


const {Pool} = require('pg')

const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ella_wyszukiwaczo',
    password: '1234',
    port: 5432,
  })

router.get('/', (req, res) => {
  client.query('SELECT * FROM wydarzenia')
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