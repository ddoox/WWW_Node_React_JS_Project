import React, {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import CuteAlert from './CuteAlert';
import { render } from '@testing-library/react';


export default function UsunWydarzenie(props) {

    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState(
        {
            id_wydarzenie: ""
        }
    )
    const [wydarzenie, setWydarzenie] = useState([
        {
            id_wydarzenie: null,
            id_sala: null,
            data: "",
            nazwa: "",
            link_obrazek: "",
        }
    ])

    const czytaj = () => {
        fetch('http://localhost:3001/select/wszystkiewydarzenia')
            .then(res => {
                return res.json()
            })
            .then(json => {
                setWydarzenie(json)
                setLoading(false)
            })
            .catch(err => console.error(err) )
    }

    useEffect(() => {
        czytaj()
    },[])


    const handleSubmit = (event) => {
        
        event.preventDefault()

            const append = formData.id_wydarzenie
            const url = "http://localhost:3001/delete/wydarzenie/" + append
       
            fetch(url, {
                method: 'post'
            })

            render((
                <CuteAlert tekstglowny = "Akcja zakończona pomyślnie" tekstpomocniczy ={"Usunięto wydarzenie"} />                
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
                       <Nav.Link href="/DodajWydarzenie">Dodaj wydarzenie</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#second">Usuń wydarzenie</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/ZmodyfikujWydarzenie">Zmodyfikuj wydarzenie</Nav.Link>
                      </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                <Card.Title>Usuń wydarzenie</Card.Title>
                    <Card.Text>
                        <Form.Group controlId="formDeleteId">
                        <Form.Label>Wybierz wydarzenie do usunięcia </Form.Label>
                            <Form.Control as="select" name = "id_wydarzenie" value = {formData.id_wydarzenie} onChange={onchange} required>
                                <option value="" disabled>Wydarzenie do usunięcia</option>
                                {wydarzenie.map(wydarzenie => (
                                <option value = {wydarzenie.id_wydarzenie}>Id = "{wydarzenie.id_wydarzenie}" Nazwa = "{wydarzenie.nazwa}"</option>
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
