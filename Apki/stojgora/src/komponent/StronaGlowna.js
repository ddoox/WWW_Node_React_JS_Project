import React, {useState,useEffect} from 'react'
//import elementów z Bootstrapa
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sala from './Sala';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function StronaGlowna(props) {


    const [wydarzenie, setWydarzenie] = useState([
        {
            id_wydarzenie: null,
            id_sala: null,
            data: "0",
            nazwa: "",
            link_obrazek: "",
        }
    ])

    const [loading, setLoading] = useState(true)


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



    const datadisplay = loading ? (
        <Spinner animation="border" />
    ) : (
        <div>
            {wydarzenie.map((wydarzenie,index) => (
                <Row className="justify-content-md-center p-2" key = {index} >
                    <Col xs={12} md={10} lg={8}>
                        <Card >
                        <Card.Img variant="top" src={wydarzenie.link_obrazek}/>
                            <Card.Body>
                                <Row>
                                    <Col xs={6} sm={7} md={8}>
                                        <Card.Title>{wydarzenie.id_wydarzenie}: {wydarzenie.nazwa}</Card.Title>
                                        <Card.Text>{wydarzenie.data}</Card.Text>
                                    </Col>
                                    <Col>                                          
                                        <Link to={ "/Sala/" + wydarzenie.id_wydarzenie +"/" + wydarzenie.id_sala} className="btn btn-primary">
                                            Rezerwuj 
                                        </Link> 
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
        </div>
    )

    return (

      <div>
          {datadisplay}
      </div>

    )
}