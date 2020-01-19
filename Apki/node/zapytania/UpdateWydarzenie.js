const router = require('express').Router()
const client = require('./Polaczenie')



router.post('/:id_wydarzenie/:nazwa/:id_sala/:data/:link', (req, res) => {
    const {id_wydarzenie,nazwa,id_sala,data,link} = req.params
    const odszyfrowanyLink = link.replace(/TuBylaKropkaNieMaToJakSwietnyKod/g,".").replace(/ToSieNazywaDlugiUrl/g,":").replace(/CzasNaSlashe/g,"/")
        .replace(/JeszczePodkresleniaDzialaAle/g,"_").replace(/JakbyCosToNiePisalemTegoFragmentu/g,",")
   
    try 
    {

        let queryText = 'UPDATE  wydarzenie set id_sala = $1, data = $2, nazwa = $3, link_obrazek = $4 WHERE id_wydarzenie = $5'
        let queryParams = [id_sala, data, nazwa, odszyfrowanyLink,id_wydarzenie]
        client.query(queryText, queryParams)

    }
    catch(err){
        console.error(err)
        res.status(500).json({err})
    }
})


module.exports = router
