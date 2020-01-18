import React, {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export default function UsunWydarzenie(props) {

    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState([
        {
            id_wydarzenie: null
        }
    ])
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
        // console.log('test');
        //łapię jsona z url
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


    const onclick = (event) => {
        event.preventDefault()

        const append = formData.id_wydarzenie
        const url = "http://localhost:3001/delete/wydarzenie/" + append
   
        fetch(url, {
            method: 'post'
        })

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

        <Form id = "delete-form">
            <Form.Group controlId="formDeleteId">
                <Form.Label>Wybierz wydarzenie do usunięcia </Form.Label>
                <Form.Control as="select" name = "id_wydarzenie" defaultValue = "" onChange={onchange}>
                    <option value="" selected disabled>Wydarzenie do usunięcia</option>
                    {wydarzenie.map(wydarzenie => (
                    <option value = {wydarzenie.id_wydarzenie}>Id = "{wydarzenie.id_wydarzenie}" Nazwa = "{wydarzenie.nazwa}"</option>
                    ))}
                </Form.Control>
            </Form.Group>
     
            <Button variant="primary" type="submit" onClick = {onclick}>Usuń</Button>
        </Form>
    )


    return (

        <div>
            {formDisplay}
        </div>
    )
}
