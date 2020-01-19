import React, {useState,useEffect} from 'react'
//import elementów z Bootstrapa
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';





import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
  import DodajWydarzenie from './DodajWydarzenie';







//komponent
export default function StronaGlowna(props) {
    //wczytuję argument(props) i przypisuję do zmiennych
    const { gowno,gowno2 } = props;
    //to nizej funkcja do odczytywania jsona - tak jak pola kompnentu w klasie
    //useState ustawia wartosc domyslna. useState(wartosc domyslna)
  //   const [ data, setdata] = useState([
  //     {
  //         id_sali: null,
  //         nr_miejsca: "",
  //         stan: 0,
  //         cena: 0,
  //         imie: "",
  //         nazwisko: ""
  //     }
  // ])

  // TODO: Mniejsze obrazki ;)

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

    /*funkcja*/
    const czytaj = () => {
        console.log('test');
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

    function onclick(props){
        const {iddoprzkazania} = props;

        // <Switch>
        // <Route exact path="/DodajWydarzenie">
        //     <DodajWydarzenie />
        // </Route>
        // </Switch>
        console.log(props)

    }
    const datadisplay = loading ? (
        <Spinner animation="border" />
    ) : (
        <div>
            {wydarzenie.map(wydarzenie => (
                <Row className="justify-content-md-center">
                    <Col xs={12} md={10} lg={8}>
                        <Card >
                        <Card.Img variant="top" src={wydarzenie.link_obrazek}/>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title> {wydarzenie.nazwa}</Card.Title>
                                        <Card.Text>{wydarzenie.data}</Card.Text>
                                    </Col>
                                    <Col>


                                        <Button variant="primary" iddoprzkazania = {wydarzenie.id_wydarzenie}>
                                            

                                            Rozkminiam przekierowania



                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
        </div>
    )


    //Rzeczy do wyświetlenia przez komponent
    return (

      <div>
          {datadisplay}
      </div>

    )
}