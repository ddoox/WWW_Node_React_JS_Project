//React
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import css do bootstrapa
import 'bootstrap/dist/css/bootstrap.min.css';
//Każdy komponent importuje
import Zwielkiej from './komponent/Zwielkiej';
import JeszczeInna from './komponent/JeszczeInna';
import PrzekierowanieNaInna from './komponent/PrzekierowanieNaInna';


function App() {
  return (



    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/JeszczeInnalink">About</Link>
          </li>
          <li>
            <Link to="/Drugilink">Users</Link>
          </li>
        </ul>
      </nav>

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
    </div>
  </Router>



























 
    
  );
}

export default App;
