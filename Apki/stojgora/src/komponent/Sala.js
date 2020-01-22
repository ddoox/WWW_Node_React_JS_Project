// Na razie tylko placeholder
import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import scena from '../dodatki/scena.jpg';

import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



export default function Sala(props) {

    const {id_wydarzenie,id_sala} = props.match.params

    const [loading, setLoading] = useState(true)

    const [wybraneMiejsce, setWybraneMiejsce] = useState(
        {
            numer_miejsca: 0
        }
    )

    const [sala, setSala] = useState(
        {
            liczba_miejsc: "" 
        }
    )

    const[zajeteMiejsca, setZajeteMiejsca] = useState([
        {
            numer_miejsca: "",
        }
    ])

    const czytajLiczba = () => {
        fetch('http://localhost:3001/select/sala/liczba/' + id_sala)
        .then(res => {
            return res.json()
        })
        .then(json => {
            setSala(json)
        })
        .catch(err => console.error(err) )
    }
    useEffect(() => {
        czytajLiczba()
        czytajRezerwacja()
    },[])

    const czytajRezerwacja = () => {
        fetch('http://localhost:3001/select/rezerwacja/' + id_wydarzenie)
        .then(res => {
            return res.json()
        })
        .then(json => {
            setZajeteMiejsca(json)
            setLoading(false)
        })
        .catch(err => console.error(err) )
    }

    useEffect(() => {
        czytajLiczba()
        czytajRezerwacja()
    },[])

        
    const handleClick = (event) => {
        event.preventDefault()
        setWybraneMiejsce({
            ...wybraneMiejsce,
            [event.target.name]: event.target.value
        })
    }

    const handleSend = (event) => {
        event.preventDefault()

        if(wybraneMiejsce.numer_miejsca != 0){

            const append = id_wydarzenie + "/" + wybraneMiejsce.numer_miejsca
            const url = "http://localhost:3001/insert/rezerwacja/" + append

            fetch(url, {
                method: 'post'
            }).then(res => {
                return res.json()
            })
            .then(json => {

                if(json.id_rezerwacja != undefined){

                    alert("Numer Rezerwacji: " + json.id_rezerwacja)
                    setWybraneMiejsce({
                        numer_miejsca: 0
                    })
                    czytajRezerwacja()
                }else{

                    setWybraneMiejsce({
                        numer_miejsca: 0
                    })
                    alert("Rezerwacja nieudana")
                    czytajRezerwacja()
                }
            })
            .catch(err => console.error(err) )
        }

    }
    

    const funkcjaKrzesla = () => {

        let results = []

        let getZajeteMiejsca = zajeteMiejsca.map(function(miejsce){
            return miejsce['numer_miejsca']
        })

        let zajeteMiejscaIntArray = getZajeteMiejsca.splice(',').map(function(item){
            return parseInt(item,10)
        })

        let z = 1
        for(let i = 1; i<= sala.liczba_miejsc/10; i++){
            
            results.push(<div>Rząd {i}</div>)           
            
            for(let k = 1; k<= 10; k++){

                if (zajeteMiejscaIntArray.includes(z)){
                    results.push((
                    <Button variant="danger" name = "numer_miejsca" disabled value = {z} key = {z} style={{width: '50px', height: '60px'}} onClick = {handleClick}>{z}</Button>                                            
                   ))
                   z++
                }else{
                    results.push((
                        <Button variant="primary" name = "numer_miejsca" value = {z} key = {z} style={{width: '50px', height: '60px'}} onClick = {handleClick}>{z}</Button>                    
                    ))
                    z++
                }
            }
        }

        results.push(<div> Potwierdź wybór</div>)
        for(let h = 1; h<= sala.liczba_miejsc%10; h++){


            if (zajeteMiejscaIntArray.includes(z)){
                results.push((
                <Button variant="danger" name = "numer_miejsca" disabled value = {z} key = {z} style={{width: '50px', height: '60px'}} onClick = {handleClick}>{z}</Button>                                            
               ))
               z++
            }else{
                results.push((
                    <Button variant="primary" name = "numer_miejsca" value = {z} key = {z} style={{width: '50px', height: '60px'}} onClick = {handleClick}>{z}</Button>                    
                ))
                z++
            }


        }
        return results

    }

    const saladisplay =  
    (
	    <div style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto', paddingBottom: '40px'}}>   			
		    <img src={scena} />	
	    </div>
    )

    const datadisplay = loading ? (
        <Spinner animation="border" />
    ) : (
        <div>           
        {funkcjaKrzesla()}
        </div>
    )




    return (
    <>
    	<div>
            <div style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto'}} >
                {saladisplay}
                {datadisplay}
                <Button onClick = {handleSend}> Rezerwuj</Button>
            </div>
       	</div>

    </>
    )
}