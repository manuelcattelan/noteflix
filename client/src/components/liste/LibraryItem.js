import React, {useState} from 'react';
import { ListGroup, Button, Form, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const LibraryItem = ({descrizione, url, macroarea, titolo, approval, id}) => {


    return (
            <Accordion.Item eventKey={id}>
                <Accordion.Header>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-center w-100"
                        style={{border:"none"}}
                    >
                        <div className="fw-bold ms-2 me-auto">{titolo}</div>
                        {/* <span className="fw-bold text-primary me-3">Scrivi all'autore</span> */}
                        <ListGroup className="me-3" horizontal>
                            <ListGroup.Item>{macroarea}</ListGroup.Item>
                            <ListGroup.Item>
                                {
                                    approval?<span className="text-secondary doc-descrizione" bg="primary">Piace al {approval.toFixed()}%</span>:""
                                }
                            </ListGroup.Item>
                        </ListGroup>
                        <Link to={"/document/?id="+id}>
                            <Button variant="outline-primary">Visualizza</Button>
                        </Link>
                    </ListGroup.Item>
                </Accordion.Header>
                <Accordion.Body>
                    {descrizione}
                </Accordion.Body>
            </Accordion.Item>

    );
};

export default LibraryItem;