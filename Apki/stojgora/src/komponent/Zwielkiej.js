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

    const [wydarzenie, setWydarzenie] = useState([
      {
        data: null,
        nazwa: "",
        ilosc_wolnych_miejsc: 0,
        id_sali: 0,
        link_do_obrazka: "",
      }
    ])

  const [loading, setLoading] = useState(true)

    /*funkcja*/
    const czytaj = () => {
        console.log('test');
        //łapię jsona z url
        fetch('http://localhost:3001/wydarzenia')
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
        {wydarzenie.map(wydarzenie => (
        <Card style={{ marginRight: '5rem', marginLeft: '5rem', marginTop: '2rem' }}>
          <Card.Img variant="top" src={wydarzenie.link_do_obrazka}/>
          <Card.Body>
        <Card.Title>{wydarzenie.nazwa}</Card.Title>
            <Card.Text>
              {wydarzenie.data}
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