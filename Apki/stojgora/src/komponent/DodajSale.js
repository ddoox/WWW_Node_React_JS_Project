import React, {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import CuteAlert from './CuteAlert';
import { render } from '@testing-library/react';

export default function DodajSale(props) {
	 const [sala, setSala] = useState([
        {
            liczba_miejsc: "",
        }
    ])

	 const onchange = (event) => {
        setSala({
            ...sala,
            [event.target.name]: event.target.value
        })
    }

    const handleReset = () =>{

    	setSala(
        {
         	liczba_miejsc: "",
        }) 
    }

    const handleSubmit = (event) => {
        event.preventDefault()       

        const append = sala.liczba_miejsc
        const url = "http://localhost:3001/insert/sala/" + append

        fetch(url, {
            method: 'post'
        });

        render((
            <CuteAlert tekstglowny = "Akcja zakończona pomyślnie" tekstpomocniczy ={"Dodano salę"} />                
        ))
        
    }

    const salaDisplay =  
    (
        <Form id = "input-form" onSubmit = {handleSubmit}>
            <Card bg ="light" border="primary" style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto'}} >
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link href="#first">Dodaj sale</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/UsunSale">Usuń sale</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Dodaj Sale</Card.Title>
                    <Card.Text>

                        <Form.Group controlId="formIloscMiejsc">
                            <Form.Label>Ilosc miejsc na sali:</Form.Label>
                            <Form.Control type="number" name="liczba_miejsc" value={sala.liczba_miejsc} onChange={onchange} required/>
                        </Form.Group>
                    </Card.Text>

                    <Button variant="primary" type="submit" >Dodaj</Button>

                    <Button variant="secondary" type="reset" onClick = {handleReset}>Reset</Button>
                </Card.Body>
            </Card>
        </Form>
    )

    return (
        <div>
            {salaDisplay}
        </div>
    )
	
}