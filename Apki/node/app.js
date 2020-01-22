//node + express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3001
//cors - do nagłówka http - jest i działa. Jak nie ma to nie działa
const cors = require('cors')
const WszystkieWydarzenia = require('./zapytania/SelectAllWydarzenia')
const WszystkieSale = require('./zapytania/SelectAllSala')
const InsertWydarzenie = require('./zapytania/InsertWydarzenie')
const InsertRezerwacja = require('./zapytania/InsertRezerwacja')
const UsunWydarzenie = require('./zapytania/DeleteWydarzenie')
const SelectWydarzenie = require('./zapytania/SelectWydarzenie')
const UpdateWydarzenie = require('./zapytania/UpdateWydarzenie')
const SelectSalaLiczba = require('./zapytania/SelectSalaLiczba')
const SelectRezerwacja = require('./zapytania/SelectRezerwacja')
const InsertSala = require('./zapytania/InsertSala')


app.use(cors())
//dekodowanie - musi byc bo nie dziala json
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
//Otrzymuję jsona z localhost
//Jak chcę pobrać z innego miejsca to '/innemiejsce' - url
app.get('/', (req, res) => res.json({msg: 'Hello wanderer!'}))

app.use('/select/wszystkiewydarzenia', WszystkieWydarzenia)
app.use('/select/sala', WszystkieSale)
app.use('/insert/wydarzenie', InsertWydarzenie)
app.use('/insert/rezerwacja', InsertRezerwacja)
app.use('/delete/wydarzenie', UsunWydarzenie)
app.use('/select/wydarzenie', SelectWydarzenie)
app.use('/update/wydarzenie', UpdateWydarzenie)
app.use('/select/sala/liczba', SelectSalaLiczba)
app.use('/select/rezerwacja', SelectRezerwacja)
app.use('/insert/sala', InsertSala)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
