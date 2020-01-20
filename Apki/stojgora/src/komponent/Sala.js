// Na razie tylko placeholder
import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import scena from '../dodatki/scena.jpg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



export default function Sala(props) {

    const {id_wydarzenie,id_sala} = props.match.params

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
        })
        .catch(err => console.error(err) )
    }

    useEffect(() => {
        czytajLiczba()
        czytajRezerwacja()
    },[])

    const wyswietlZajete = () => {

        zajeteMiejsca.map((numer) => 
            <li>{numer}</li>
        )

    }


    const funkcjaKrzesla = () => {

        console.log(zajeteMiejsca)

        let results = []
        let z = 1
        for(let i = 1; i<= sala.liczba_miejsc/10; i++){
            
            results.push(<div><ButtonGroup></ButtonGroup></div>)

            for(let k = 1; k<= 10; k++){
                results.push((
                     <Button variant="primary" disabled value = {z} key = {z} style={{width: '50px', height: '60px'}}>{z}</Button>                    
                ))
                z++
            }
        }

        results.push(<div><ButtonGroup></ButtonGroup></div>)
        for(let h = 1; h<= sala.liczba_miejsc%10; h++){


            results.push((
                <Button variant="secondary" value = {z} key = {z} style={{width: '50px', height: '60px'}}> {z} </Button>
           ))
           z++
        }
        return results

    }

    const saladisplay =  
    (
	    <div style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto', paddingBottom: '40px'}}>
	    	
		
		    		<img src={scena} />
		
	    </div>
    )

 

    return (
    <>
    	<div>
    		{saladisplay}
            <h2> Ilość miejsc - {sala.liczba_miejsc}</h2>
            <h2> Ilość miejsc - {zajeteMiejsca[0].numer_miejsca}</h2>
            {/* <h2> Ilość miejsc - {zajeteMiejsca[].numer_miejsca}</h2> */}
            <div style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto'}} >
                {funkcjaKrzesla()}
            </div>
       	</div>

    </>
    )
}