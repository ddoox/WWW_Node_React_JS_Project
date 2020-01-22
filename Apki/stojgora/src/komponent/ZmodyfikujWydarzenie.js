import React, {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import CuteAlert from './CuteAlert';
import { render } from '@testing-library/react';


export default function DodajWydarzenie(props) {
 
    const [edit, setEdit] = useState(true)
    const [wydarzenie, setWydarzenie] = useState([
        {
            id_wydarzenie: null,
            id_sala: null,
            data: "",
            nazwa: "",
            link_obrazek: "",
        }
    ])
    const [formData, setFormData] = useState(
        {
            id_sala: null,
            data: "",
            nazwa: "",
            link_obrazek: "",
        }
    )
    const [sala, setSala] = useState([
        {
            id_sala: null,
            liczba_miejsc: null,
        }
    ])
    const [selectData, setselectData] = useState(
        {
            id_wydarzenie: null,
        }
    )

    const czytajSale = () => {
        fetch('http://localhost:3001/select/sala')
            .then(res => {
                return res.json()
            })
            .then(json => {
                setSala(json)
            })
            .catch(err => console.error(err) )
    }

    const czytajWydarzenia = () => {
        fetch('http://localhost:3001/select/wszystkiewydarzenia')
            .then(res => {
                return res.json()
            })
            .then(json => {
                setWydarzenie(json)                   
            })
            .catch(err => console.error(err) )
    }

    useEffect(() => {
        czytajSale()
        czytajWydarzenia()
    },[])

    const handleonChangeSelect = (event) => {
        setselectData({
            ...selectData,
            [event.target.name]: event.target.value
        })
    }

    const handleClickSelect = (event) => {
        event.preventDefault()
        selectData.id_wydarzenie == null ? (
            setEdit(true)
        ) : (
            setEdit(false)
            
        )
    }

    const handleonChangeInput = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

            const test = formData.link_obrazek.replace(/\./g,"TuBylaKropkaNieMaToJakSwietnyKod").replace(/\:/g,"ToSieNazywaDlugiUrl").replace(/\//g,"CzasNaSlashe")
                .replace(/\_/g,"JeszczePodkresleniaDzialaAle").replace(/\,/g,"JakbyCosToNiePisalemTegoFragmentu")

            const append = selectData.id_wydarzenie + "/" + formData.nazwa + "/" + formData.id_sala + "/" + formData.data + "/" + test
            const url = "http://localhost:3001/update/wydarzenie/" + append

            fetch(url, {
                method: 'post'
            })

            render((
                <CuteAlert tekstglowny = "Akcja zakończona pomyślnie" tekstpomocniczy ={"Zmodyfikowano salę"} />                
            ))
    }

    const handleReset = () =>{
        setFormData(
        {
            id_sala: "",
            data: "",
            nazwa: "",
            link_obrazek: "",
        })
    }

    const selectDisplay = edit ? (

         <Form id = "select-form">
            <Card bg ="light" border="primary" style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto'}} >
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#this">
                      <Nav.Item>
                        <Nav.Link href="/DodajWydarzenie">Dodaj wydarzenie</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/UsunWydarzenie">Usuń wydarzenie</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#this">Zmodyfikuj wydarzenie</Nav.Link>
                      </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Zmodyfikuj wydarzenie</Card.Title>
                    <Card.Text>
                        <Form.Group controlId="formDeleteId">
                            <Form.Label>Wybierz wydarzenie do Zmodyfikowania </Form.Label>
                            <Form.Control as="select" name = "id_wydarzenie" defaultValue = "" onChange={handleonChangeSelect} required>
                                <option value="" selected disabled>Wydarzenie do modyfikacji</option>
                                {wydarzenie.map(wydarzenie => (
                                <option value = {wydarzenie.id_wydarzenie}>Id = "{wydarzenie.id_wydarzenie}" Nazwa = "{wydarzenie.nazwa}"</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        </Card.Text>
    
            <Button variant="primary" type="submit" onClick = {handleClickSelect}>Modyfikuj</Button>
        </Card.Body>
            </Card>
        </Form>


    ) : (
       

        <Form id = "input-form"  onSubmit= {handleSubmit}>
            <Card bg ="light" border="primary" style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto'}} >
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#this">
                      <Nav.Item>
                        <Nav.Link href="/DodajWydarzenie">Dodaj wydarzenie</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/UsunWydarzenie">Usuń wydarzenie</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#this">Zmodyfikuj wydarzenie</Nav.Link>
                      </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Wprowadz nowe parametry</Card.Title>
                    <Card.Text>
                        <Form.Group controlId="formNazwaWydarzenia">
                            <Form.Label>Nazwa Wydarzenia</Form.Label>
                            <Form.Control type="text" name="nazwa" onChange={handleonChangeInput} required/>
                        </Form.Group>

                        <Form.Group controlId="formIloscMiejsc">
                            <Form.Label>Ilość miejsc</Form.Label>
                            <Form.Control as="select" name = "id_sala" value={formData.id_wydarzenie} onChange={handleonChangeInput} required>
                                <option value="" selected disabled>Wybierz ilość miejsc</option>
                                {sala.map(sala => (
                                    <option value = {sala.id_sala}>{sala.liczba_miejsc}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    
                        <Form.Group controlId="formData">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" name="data" value={formData.data} onChange={handleonChangeInput} required/>
                        </Form.Group>

                        <Form.Group controlId="formLink">
                            <Form.Label>Link do obrazka</Form.Label>
                            <Form.Control type="url" name="link_obrazek" value={formData.link_obrazek} onChange={handleonChangeInput} required/>
                        </Form.Group>
                    </Card.Text>

                        <Button variant="primary" type="submit">Modyfikuj</Button>
                        <Button variant="secondary" type="reset" onClick = {handleReset}>Reset</Button>
                        
                </Card.Body>
            </Card>
        </Form>
    )
    
    return (

        <div>
            {selectDisplay}
        </div>

    )
}
