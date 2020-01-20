import React, {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';


export default function DodajWydarzenie(props) {
 
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState(
        {
            id_sala: "",
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

    const czytaj = () => {
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
            ...formData,
            [event.target.name]: event.target.value
        })
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

    const handleSubmit = (event) => {
        event.preventDefault()

        // if(formData.nazwa != null && formData.link_obrazek != null && formData.id_sala != null && formData.data != null){

            // Ultra dobry sposob na przekazanie linku w linku
            const test = formData.link_obrazek.replace(/\./g,"TuBylaKropkaNieMaToJakSwietnyKod").replace(/\:/g,"ToSieNazywaDlugiUrl").replace(/\//g,"CzasNaSlashe")
                .replace(/\_/g,"JeszczePodkresleniaDzialaAle").replace(/\,/g,"JakbyCosToNiePisalemTegoFragmentu")

            const append = formData.nazwa + "/" + formData.id_sala + "/" + formData.data + "/" + test
            const url = "http://localhost:3001/insert/wydarzenie/" + append

            fetch(url, {
                method: 'post'
            });

            alert("Dodano wydarzenie " + formData.nazwa);
            // window.location.reload();
        // }else{
        //     alert("Uzupelnij wszystkie pola!!")
        // }

    }


    const formDisplay = loading ? (
        <Spinner animation="border" />
    ) : (

        <Form id = "input-form" onSubmit = {handleSubmit}>
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
                            <Form.Control type="text" name="nazwa" value={formData.nazwa} onChange={onchange} required/>
                        </Form.Group>

                        <Form.Group controlId="formIloscMiejsc">
                            <Form.Label>Ilość miejsc</Form.Label>
                            <Form.Control as="select" name = "id_sala" value={formData.id_sala} onChange={onchange} required>
                                <option value="" selected disabled>Wybierz ilość miejsc</option>
                                {sala.map(sala => (
                                    <option value = {sala.id_sala}>{sala.liczba_miejsc}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId="formData">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" name="data" value={formData.data} onChange={onchange} required/>
                        </Form.Group>

                        <Form.Group controlId="formLink">
                            <Form.Label>Link do obrazka</Form.Label>
                            <Form.Control type="url" name="link_obrazek" value={formData.link_obrazek} onChange={onchange} required/>
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
            {formDisplay}
        </div>

    )
}
