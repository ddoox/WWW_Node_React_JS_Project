import React, {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';


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
    const [selectData, setselectData] = useState([
        {
            id_wydarzenie: null,
        }
    ])
        // JSON
    // const testing = JSON.stringify({
    //     "id_wydarzenie": formData.id_wydarzenie,
    // })

    // fetch("http://localhost:3001/delete/wydarzenie/",{
    //     method:'post',
    //     body: testing          
    // })


    const czytajSale = () => {
        console.log('test');
        //łapię jsona z url
        fetch('http://localhost:3001/select/sale')
            .then(res => {
                return res.json()
            })
            .then(json => {
                setSala(json)
            })
            .catch(err => console.error(err) )
    }

    const czytajWydarzenia = () => {
        // console.log('test');
        //łapię jsona z url
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



    const onchangeSelect = (event) => {
        setselectData({
            //3 kropki uzywaja danych, ktore juz sa w formData(rozlozenie obiektu)
            ...selectData,
            [event.target.name]: event.target.value
        })
    }

    const onclickSelect = (event) => {
        event.preventDefault()
        setEdit(false)

    console.log(selectData.id_wydarzenie)
        // formDisplay()
    }

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

        const append = selectData.id_wydarzenie + "/" + formData.nazwa + "/" + formData.id_sala + "/" + formData.data + "/" + test
        const url = "http://localhost:3001/update/wydarzenie/" + append
        console.log(url)

        fetch(url, {
            method: 'post'
        })

    }
    

    const selectDisplay = edit ? (

         <Form id = "input-form">
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
                            <Form.Control as="select" name = "id_wydarzenie" defaultValue = "" onChange={onchangeSelect} required>
                                <option value="" selected disabled>Wydarzenie do modyfikacji</option>
                                {wydarzenie.map(wydarzenie => (
                                <option value = {wydarzenie.id_wydarzenie}>Id = "{wydarzenie.id_wydarzenie}" Nazwa = "{wydarzenie.nazwa}"</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        </Card.Text>
    
            <Button variant="primary" type="submit" onClick = {onclickSelect}>Modyfikuj</Button>
        </Card.Body>
            </Card>
        </Form>
    ) : (

        

        <Form id = "input-form">
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
                            <Form.Control type="text" name="nazwa" onChange={onchange} required/>
                        </Form.Group>

                        <Form.Group controlId="formIloscMiejsc">
                            <Form.Label>Ilość miejsc</Form.Label>
                            <Form.Control as="select" name = "id_sala" defaultValue = "" onChange={onchange} required>
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

                        <Button variant="primary" type="submit" onSubmit = {onclick}>Modyfikuj</Button>
                        <Button variant="secondary" type="reset">Reset</Button>
                        
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
