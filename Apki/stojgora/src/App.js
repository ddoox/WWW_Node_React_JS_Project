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
import StronaGlowna from './komponent/StronaGlowna';
import DodajWydarzenie from './komponent/DodajWydarzenie';
import UsunWydarzenie from './komponent/UsunWydarzenie';
import ZmodyfikujWydarzenie from './komponent/ZmodyfikujWydarzenie';
import Sala from './komponent/Sala';
import DodajSale from './komponent/DodajSale';

import logo from './dodatki/logo1.jpg'


function App() {
    return (



        <Router>
            <Navbar bg="dark" variant="dark" style={{marginBottom: '3rem'}}>
                <Navbar.Brand href="/"> <img src={logo}/> </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Strona Główna</Nav.Link>
                </Nav>
                <Button variant="outline-info" href="/DodajWydarzenie">Zarządzaj wydarzeniami</Button>
            </Navbar>
        

        {/*w ten sposob wyswietlane na kazdej stronie*/}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {/*Na stronie jest to co wyzej, switch zmienia strone(jako komponenty)  */}

            <Switch>
                <Route exact path="/">
                    {/* Tak się używa komponentów */}
                    <StronaGlowna/>
                </Route>
                <Route  path="/Sala/:id_wydarzenie/:id_sala" component={Sala}>
                </Route>
                <Route exact path="/DodajWydarzenie">
                    <DodajWydarzenie />
                </Route>
                    <Route exact path="/UsunWydarzenie">
                        <UsunWydarzenie />
                </Route>
                <Route exact path="/ZmodyfikujWydarzenie">
                        <ZmodyfikujWydarzenie />
                </Route>
                <Route exact path="/DodajSale">
                        <DodajSale />
                </Route>

            </Switch>
        </Router>
    );
}

export default App;