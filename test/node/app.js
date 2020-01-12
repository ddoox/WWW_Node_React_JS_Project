//node + express
const express = require('express')
const app = express()
const port = 3001
//cors - do nagłówka http - jest i działa. Jak nie ma to nie działa
const cors = require('cors')

app.use(cors())
//Otrzymuję jsona z localhost
//Jak chcę pobrać z innego miejsca to '/innemiejsce' - url
app.get('/', (req, res) => res.json({msg: 'Hello World!'}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))