import React, {useState} from 'react'
import Form from "react-bootstrap/Form"
export default function JeszczeInna(props) {
 

    
    const[formData, setFormData] = useState({
        nr_miejsca: "",
        stan: 0,
        cena: 0,
        imie: "",
        nazwisko: ""
    })

    const onchange = (event) => {
        setFormData({
            //3 kropki uzywaja danych, ktore juz sa w formData(rozlozenie obiektu)
            ...formData,
            //kolejnosc jest wazna. Przypisuje wartosci z elementu formularza do zmiennej
            [event.target.name]: event.target.value
        })
      }
    
    // const onclick = (event) => {
    //     event.preventDefault()
    //     //tu juz leci fetchowanie
    // }



    //Rzeczy do wyświetlenia przez komponent
    return (

        <div>
            <p>{formData.nr_miejsca}</p>

            <Form.Control size="lg" name="nr_miejsca" type="text" placeholder="Large text" onChange={onchange} />

            {/* Guzik onClick zrobic fetcha, ktory da  */}
        </div>

    )
}
