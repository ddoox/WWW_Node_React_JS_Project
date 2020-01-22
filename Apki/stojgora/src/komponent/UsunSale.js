import React, {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import CuteAlert from './CuteAlert';
import { render } from '@testing-library/react';


export default function UsunSale(props) {
const [loading, setLoading] = useState(true)
const [formData, setFormData] = useState(
        {
            id_sala: ""
        }
    )
const [sala, setSala] = useState([
        {
            id_sala: null,
            liczba_miejsc: null,
        }
    ])

const czytaj = () => {
        fetch('http://localhost:3001/select/sala')
            .then(res => {
                return res.json()
            })
            .then(json => {
                setSala(json)
                setLoading(false)
            })
            .catch(err => console.error(err) )
    }

    useEffect(() => {
        czytaj()
    },[])

const handleSubmit = (event) => {
        
        event.preventDefault()

            const append = formData.id_sala
            const url = "http://localhost:3001/delete/sala/" + append
       
            fetch(url, {
                method: 'post'
            })

            render((
                <CuteAlert tekstglowny = "Akcja zakończona pomyślnie" tekstpomocniczy ={"Usunięto salę"} />                
            ))
            czytaj()
        }

         const onchange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const formDisplay = loading ? (
        <Spinner animation="border" />
    ) : (

        <Form id = "delete-form" onSubmit = {handleSubmit}>
            <Card bg ="light" border="primary" style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto'}} >
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#second">
                      <Nav.Item>
                       <Nav.Link href="/DodajSale">Dodaj sale</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#second">Usuń sale</Nav.Link>
                      </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                <Card.Title>Usuń sale</Card.Title>
                    <Card.Text>
                        <Form.Group controlId="formDeleteId">
                        <Form.Label>Wybierz sale do usunięcia </Form.Label>
                            <Form.Control as="select" name = "id_sala" value = {formData.id_sala} onChange={onchange} required>
                                <option value="" disabled>Sala do usunięcia</option>
                                {sala.map(sala => (
                                <option key = {sala.id_sala} value = {sala.id_sala}>Id = "{sala.id_sala}" Nazwa = "{sala.liczba_miejsc}"</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Card.Text>
     
                    <Button variant="primary" type="submit" >Usuń</Button>
                </Card.Body>
            </Card>
        </Form>
    )


    return (

        <div>
            {formDisplay}
        </div>
    )
}
