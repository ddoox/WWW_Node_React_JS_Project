// Na razie tylko placeholder
import React, {useState} from 'react'

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
    const ddd = window.location.href.substring(27); 
    console.log(ddd); 
    // console.log(atrybut)

    return (

        <div>
            <h2> {ddd} </h2>
        </div>

    )
}