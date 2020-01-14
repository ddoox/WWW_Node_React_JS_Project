import React, {useState,useEffect} from 'react'
//import elementów z Bootstrapa
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

//komponent
export default function Zwielkiej(props) {
    //wczytuję argument(props) i przypisuję do zmiennych
    const { gowno,gowno2 } = props;
    //to nizej funkcja do odczytywania jsona - tak jak pola kompnentu w klasie
    //useState ustawia wartosc domyslna. useState(wartosc domyslna)
    const [ data, setdata] = useState([
      {
          id_sali: null,
          nr_miejsca: "",
          stan: 0,
          cena: 0,
          imie: "",
          nazwisko: ""
      }
  ])

  const [loading, setLoading] = useState(true)

    /*funkcja*/
    const czytaj = () => {
        console.log('test');
        //łapię jsona z url
        fetch('http://localhost:3001/testowyurl')
            .then(res => {
                return res.json()
            })
            .then(json => {
                setdata(json)
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
        {data.map(sala => (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://www.kt.agh.edu.pl/pl/system/files/styles/medium/private/pictures/picture-149-1350469786.jpg?itok=wbEcsOVy" />
          <Card.Body>
        <Card.Title>{sala.imie}</Card.Title>
            <Card.Text>
              Data wydarzenia
            </Card.Text>
            <Button variant="primary">Zajmij miejsce</Button>
          </Card.Body>
        </Card>
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
