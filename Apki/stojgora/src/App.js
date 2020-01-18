//React
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

//import css do bootstrapa
import 'bootstrap/dist/css/bootstrap.min.css';
//Każdy komponent importuje
import Zwielkiej from './komponent/Zwielkiej';
import JeszczeInna from './komponent/JeszczeInna';
import PrzekierowanieNaInna from './komponent/PrzekierowanieNaInna';
import logo from './dodatki/logo1.jpg'


function App() {
  return (



    <Router>
    <body background="https://uwalls.pl/gallery/119/25979_thumb_b1000.jpg">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/"> <img src={logo}/> </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/JeszczeInnalink">JeszczeInna</Nav.Link>
          <Nav.Link href="/Drugilink">Drugilink</Nav.Link>
        </Nav>
        <Button variant="outline-info">Dodaj wydarzenie</Button>
      </Navbar>
      

    {/*w ten sposob wyswietlane na kazdej stronie*/}



      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}


      {/*Na stronie jest to co wyzej, switch zmienia strone(jako komponenty)  */}

      <Switch>
        <Route exact path="/">
		{/* Tak się używa komponentów */}
		      <Zwielkiej gowno="gowno" gowno2 = "  gowno ok2"/>
        </Route>
        <Route exact path="/JeszczeInnalink">
          <JeszczeInna />
        </Route>
        <Route exact path="/Drugilink">
          <PrzekierowanieNaInna />
        </Route>
      </Switch>
    
    </body>
  </Router>


    );
}

export default App;