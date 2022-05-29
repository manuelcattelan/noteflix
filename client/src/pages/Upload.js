import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { useNavigate} from 'react-router-dom';
import macroaree from '../data/macroaree.json'
    
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

        if(size < maxSize && type === correctType)
        {
            fileWrapper.setAttribute("class", "form-control is-valid")
            setDocumento(inputFile.target.files[0])
        }else{
            fileWrapper.setAttribute("class", "form-control is-invalid")
        }
        
    };


    /*
        Stati per le variabili del form e funzione per gestire il submit 
        raccogliendo i dati del form e creando una fetch POST    
    */
    const [titolo, setTitolo] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [macroarea, setMacroarea] = useState(macroaree[0].nome);
    const [tag, setTag] = useState("");
    const [documento, setDocumento] = useState();




    //navigate nel caso il form venga compilato correttamente
    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        var formdata = new FormData();
        formdata.append("title", titolo);
        formdata.append("description", descrizione);
        formdata.append("area", macroarea);
        formdata.append("tag", tag); 
        formdata.append("url", documento); 


        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        const url='http://localhost:3001/api/v1/documents/?token='+props.token
        fetch(url, requestOptions)
        .then( res => console.log(res))
        .then(navigate('/'))
    };
    


    return (
        <>
            <Navigation navbar={props.navbar} token={props.token}/>
            <Container>
                <Container className='d-flex justify-content-center mt-5'>
                    <div>
                        <p className="titolo text-center">Carica una <span className='text-primary'>nuova</span> dispesa.</p>
                        <p className="testo text-center my-5">Compila il form per pubblicare un nuovo contenuto. Assicurati che rispetti le <br/>nostre linee guida per non compromettere la tua reputazione come mentore.</p>
                        
                        <Form className="mt-5" onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control maxlength="35" id="titolo" type="text" placeholder="Inserisci un titolo" required onChange={(e)=>{setTitolo(e.target.value)}}/>
                                <Form.Text className="text-muted">
                                    Tip: evita di scrivere nel titolo "Dispensa di ..." o "Appunti di ..."
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea">
                                <Form.Label>Inserisci una breve descrizione del contenuto</Form.Label>
                                <Form.Control id="descrizione" as="textarea"  maxlength="166" rows={3} required  onChange={(e)=>{setDescrizione(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Scegli in che macroarea apparirà il tuo file</Form.Label>
                                <Form.Select id="macroarea"  onChange={(e)=>{setMacroarea(e.target.value)}} maxlength="160" required>
                                    <option disabled selected value>-</option>
                                    {
                                        macroaree.map((item) => 
                                            <option value={item.nome}>{item.nome}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label required >Tag</Form.Label>
                                <Form.Control id="tag" type="text" placeholder="Parole chiave separate da spazio"  onChange={(e)=>{setTag(e.target.value)}} required/>
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
