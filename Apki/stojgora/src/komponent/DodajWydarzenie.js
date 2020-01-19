import React, {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';


export default function DodajWydarzenie(props) {
 
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState([
        {
            id_sala: null,
            data: "",
            nazwa: "",
            link_obrazek: "",
        }
    ])
    const [sala, setSala] = useState([
        {
            id_sala: null,
            liczba_miejsc: null,
        }
    ])

    const czytaj = () => {
        console.log('test');
        //łapię jsona z url
        fetch('http://localhost:3001/select/sale')
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


    const onchange = (event) => {
        setFormData({
            //3 kropki uzywaja danych, ktore juz sa w formData(rozlozenie obiektu)
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const onclick = (event) => {
        event.preventDefault()

        const test = formData.link_obrazek.replace(/\./g,"TuBylaKropkaNieMaToJakSwietnyKod").replace(/\:/g,"ToSieNazywaDlugiUrl").replace(/\//g,"CzasNaSlashe")
            .replace(/\_/g,"JeszczePodkresleniaDzialaAle").replace(/\,/g,"JakbyCosToNiePisalemTegoFragmentu")
        // console.log(test)

        const append = formData.nazwa + "/" + formData.id_sala + "/" + formData.data + "/" + test
        const url = "http://localhost:3001/insert/wydarzenie/" + append
        console.log(url)

        fetch(url, {
            method: 'post'
        });

//TODO: Reset wartosci, alert

    }


    const formDisplay = loading ? (
        <Spinner animation="border" />
    ) : (

//TODO: Trzeba dodać walidacje, na razie nie wiem jak
        <Form id = "input-form">
            <Card bg ="light" border="primary" style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto'}} >
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#first">
                      <Nav.Item>
                        <Nav.Link href="#first">Dodaj wydarzenie</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/UsunWydarzenie">Usuń wydarzenie</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="/ZmodyfikujWydarzenie">Zmodyfikuj wydarzenie</Nav.Link>
                      </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Dodaj wydarzenie</Card.Title>
                    <Card.Text>

                        <Form.Group controlId="formNazwaWydarzenia">
                            <Form.Label>Nazwa Wydarzenia</Form.Label>
                            <Form.Control type="text" name="nazwa" onChange={onchange} required/>
                        </Form.Group>

                        <Form.Group controlId="formIloscMiejsc">
                            <Form.Label>Ilość miejsc</Form.Label>
                            <Form.Control as="select" name = "id_sala" defaultValue = "" onChange={onchange}>
                                <option value="" selected disabled>Wybierz ilość miejsc</option>
                                {sala.map(sala => (
                                    <option value = {sala.id_sala}>{sala.liczba_miejsc}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId="formData">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" name="data" onChange={onchange} required/>
                        </Form.Group>

                        <Form.Group controlId="formLink">
                            <Form.Label>Link do obrazka</Form.Label>
                            <Form.Control type="url" name="link_obrazek" onChange={onchange} required/>
                        </Form.Group>
                    </Card.Text>

                    <Button variant="primary" type="submit" onClick = {onclick}>Dodaj</Button>

                    <Button variant="secondary" type="reset">Reset</Button>
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
