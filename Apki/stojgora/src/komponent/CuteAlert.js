import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react'


export default function BootstrapAlert(props) {

    const {tekstglowny, tekstpomocniczy} = props
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
  
    return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{tekstglowny}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{tekstpomocniczy}</Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                   Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
  }