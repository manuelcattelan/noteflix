import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Navigation from '../components/Navigation';


    
const Upload = (props) => {

  
    /*
        Funzione che al caricamento del file controlla (lato client) che il formato
        sia supportato (.pdf) e la size del file non superi i 16MB (16 milioni di byte).
        Se i parametri non sono rispettati restituisce hint visivi per gli utenti.    
    */
    const handleFileChange = (inputFile) => {
        const size = inputFile.target.files[0].size;
        const type = inputFile.target.files[0].type;
        const maxSize = 16000000; //in bytes
        const correctType = "application/pdf";
        var fileWrapper = document.getElementById("file-wrapper");

        size < maxSize && type === correctType
        ?
        fileWrapper.setAttribute("class", "form-control is-valid")
        :
        fileWrapper.setAttribute("class", "form-control is-invalid")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = {
            titolo: e.target[0].value,
            descrizione: e.target[1].value,
            macroarea: e.target[2].value,
            tag: e.target[3].value,
            file: e.target[4].value,
        };  
        fetch("http://localhost:3000/api/v1/documents",{
            method: 'POST',
            body: formData
        })
        .then()
    };



    return (
        <>
            <Container>
                <Navigation theme={props.theme} setTheme={props.setTheme}/>
                <Container className='d-flex justify-content-center mt-5'>
                    <div>
                        <p className="titolo text-center my-5">Carica una <span className='text-primary'>nuova</span> dispesa.</p>
                        <p className="testo text-center my-5">Compila il form per pubblicare un nuovo contenuto. Assicurati che rispetti le <br/>nostre linee guida per non compromettere la tua reputazione come mentore.</p>
                        
                        <Form className="mt-5" onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control id="titolo" type="text" placeholder="Inserisci un titolo" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea">
                                <Form.Label>Inserisci una breve descrizione del contenuto</Form.Label>
                                <Form.Control id="descrizione" as="textarea" rows={3} required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Scegli in che macroarea apparirà il tuo file</Form.Label>
                                <Form.Select id="macroarea" >
                                    <option>Ingegneria Informatica - Informatica</option>
                                    <option>Lettere e Filosofia</option>
                                    <option>Economia e Gestione Aziendale</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label required >Tag</Form.Label>
                                <Form.Control id="tag" type="text" placeholder="Parole chiave separate da spazio" />
                            </Form.Group>



                            <Form.Group hasValidation className="mb-3">
                                <Form.Label>Inserisci il file</Form.Label>
                                <Form.Control id="file-wrapper" type="file" onChange={handleFileChange} required/>
                                <Form.Control.Feedback type="invalid">
                                    Il file selezionato supera i 16MB o non è un pdf.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    Il file selezionato è supportato e non supera i 16MB.
                                </Form.Control.Feedback>
                            </Form.Group>



                            <Form.Group controlId="formFile" className="mb-3">
                                <Button variant="primary" type="submit">
                                    Pubblica
                                </Button>
                                <Form.Text className="text-muted ms-3">
                                    Il file sarà revisionato prima di essere reso pubblico.
                                </Form.Text>
                            </Form.Group>
                            
                        </Form>
                    </div>
                </Container>
            </Container>
            
        </>
    );
};

export default Upload;