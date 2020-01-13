//React
import React from 'react';
//import css do bootstrapa
import 'bootstrap/dist/css/bootstrap.min.css';
//Każdy komponent importuje
import Zwielkiej from './komponent/Zwielkiej';


function App() {
  return (

    <div className="App">
		{/* Tak się używa komponentów */}
		<Zwielkiej gowno="gowno" gowno2 = "  gowno ok2"/>
    </div>
    
  );
}

export default App;
