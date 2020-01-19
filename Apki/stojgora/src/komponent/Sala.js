// Na razie tylko placeholder
import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import scena from '../dodatki/scena.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function Sala(props) {
    const { atrybut } = props;

    // const {wydarzenie_id} = props.location.state

    // console.log(wydarzenie_id) // "bar"
    // const {foo} = props.match.params.handle
//   const test =  this.props.location.state.wydarzenie_id
    // const {test} =  this.props.location.pathname  
    // this.state = {
    //     recipe: props.location.state.recipe
    //   };
    //   console.log("id wydarzenia "+this.state) // "bar"
    // console.log(this.props)
    // const okokok = this.props.id
    const id_wydarzenia = window.location.href.substring(27,28); 
    console.log(id_wydarzenia); 
    // console.log(atrybut)
    const id_sali_z_linka = window.location.href.substring(28);

    const [sala, setSala] = useState([
        {
            id_sala: null,
            liczba_miejsc: null,
        }
    ])

    const czytajSale = () => {
        console.log('test');
        //łapię jsona z url
        fetch('http://localhost:3001/select/sale')
            .then(res => {
                return res.json()
            })
            .then(json => {
                setSala(json)
                
            })
            .catch(err => console.error(err) )
    }

    // function krzesla(){
    // 	for(var i=0; i<3;i++){
    // 		<Row style={{width: '40rem', marginLeft: 'auto', marginRight: 'auto'}}>>
    // 		for(var j=0; j<10 ;j++){
    // 			<Col>
    // 				<Button variant="primary"></Button>
    // 			</Col>
    // 		}
    // 		</Row>
    // 	}
    // }

    const saladisplay =  
    (
	    <div>
	    	<Row style={{width: '35rem', marginLeft: 'auto', marginRight: 'auto'}}>
		    	<Col >
		    		<img src={scena} />
		    	</Col>
	    	</Row>
	    	<Row>
	    		<Col>
	    		id wydarzenia: {id_wydarzenia}
	    		id_sali: {id_sali_z_linka}
	    		</Col>
	    	</Row>
	    </div>
    )


    return (
    	<div>
    		{saladisplay}
    	</div>
    )
}