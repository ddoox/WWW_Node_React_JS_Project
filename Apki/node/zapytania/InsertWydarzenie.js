const router = require('express').Router()
const client = require('./Polaczenie')



router.post('/:nazwa/:id_sala/:data/:link', (req, res) => {
    const {nazwa,id_sala,data,link} = req.params
    const odszyfrowanyLink = link.replace(/TuBylaKropkaNieMaToJakSwietnyKod/g,".").replace(/ToSieNazywaDlugiUrl/g,":").replace(/CzasNaSlashe/g,"/")
        .replace(/JeszczePodkresleniaDzialaAle/g,"_").replace(/JakbyCosToNiePisalemTegoFragmentu/g,",")
  
    try{
        let queryText = 'INSERT INTO wydarzenie(id_sala, data, nazwa, link_obrazek) VALUES ($1, $2, $3, $4)'
        let queryParams = [id_sala, data, nazwa, odszyfrowanyLink]
        client.query(queryText, queryParams)
    }
    catch(err){
        console.error(err)
        res.status(500).json({err})
    }
})



module.exports = router