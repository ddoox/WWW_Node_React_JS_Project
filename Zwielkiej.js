import React, {useState} from 'react'
//import elementów z Bootstrapa
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//komponent
export default function Zwielkiej(props) {
    //wczytuję argument(props) i przypisuję do zmiennych
    const { gowno,gowno2 } = props;
    const [ data, setdata] = useState(null)

    /*funkcja*/
    const czytaj = () => {
        console.log('test');
        //łapię jsona z url
        fetch('http://localhost:3001/')
            .then(res => {
                return res.json()
            })
            .then(json => {
                setdata(json)
            })
            .catch(err => console.error(err) )
    }

    const datadisplay = data === null ? (
        <p>
            Loading...
        </p>
    ) : (
        <p>
            {data.msg}
        </p>
    )

    //Rzeczy do wyświetlenia przez komponent
    return (



        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://www.kt.agh.edu.pl/pl/system/files/styles/medium/private/pictures/picture-149-1350469786.jpg?itok=wbEcsOVy" />
          <Card.Body>
            <Card.Title>Tytuł wydarzenia</Card.Title>
            <Card.Text>
              Data wydarzenia
            </Card.Text>
            <Button variant="primary">Zajmij miejsce</Button>
          </Card.Body>
    
          <Card.Img variant="top" src="http://www.kt.agh.edu.pl/pl/system/files/styles/medium/private/pictures/picture-149-1350469786.jpg?itok=wbEcsOVy" />
          <Card.Body>
            <Card.Title>Tytuł wydarzenia</Card.Title>
            <Card.Text>
              Data wydarzenia
            </Card.Text>
            <Button variant="primary">Zajmij miejsce</Button>
          </Card.Body>
        </Card>


    )
}
