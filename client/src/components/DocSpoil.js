import React from 'react';
import { Card, Button } from 'react-bootstrap';

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';// Import the main component
import '@react-pdf-viewer/core/lib/styles/index.css';// Import the styles
import '@react-pdf-viewer/toolbar/lib/styles/index.css';// Import styles
import { pageThumbnailPlugin } from './pageThumbnailPlugin';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';// Import styles
import { Link } from 'react-router-dom';


const DocSpoil = (props) => {


    const thumbnailPluginInstance = thumbnailPlugin();
    const { Cover } = thumbnailPluginInstance;

    const pageThumbnailPluginInstance = pageThumbnailPlugin({
        PageThumbnail: <Cover getPageIndex={() => 0} />,
    });



    const link = "/document/?id="+props.id

   

    return (
        <>
            <Card className="m-3" style={{ width: '18rem' }}>
                <Card.Header style={{ width: '18rem', overflowX:"hidden" }}>{props.macroarea}</Card.Header>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                        
                        <div
                            style={{
                                height: '150px',
                                backgroundColor:'#623FF0'
                            }}
                        >
                            {
                                props.url?
                                <Viewer fileUrl={props.url} plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}/>
                                :
                                ""
                            }
                        </div>
                    </Worker>
                <Card.Body>
                    <Card.Title style={{overflowY:"hidden", height:"3.5rem"}}>
                        {props.titolo}
                    </Card.Title>
                    <Card.Text className='doc-descrizione' style={{overflowY:"hidden", height:"6rem"}}>
                        {props.descrizione}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Link to={link}>
                        <Button variant="outline-primary" className='me-3 mb-2'>Visualizza</Button>
                    </Link>
                    {
                        props.approval?<span className="text-secondary doc-descrizione" bg="primary">Piace al {props.approval.toFixed()}%</span>:""
                    }
                </Card.Body>
            </Card>
        </>
    );
};

export default DocSpoil;