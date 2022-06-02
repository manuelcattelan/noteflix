import React, {useState, useEffect} from 'react';
import { Container, Form, Row, Col, Spinner } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as Arrows, EffectCoverflow } from "swiper";


// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import DocSpoil from '../components/DocSpoil';
import Footer from '../components/Footer';

const Platform = (props) => {

    const token = JSON.parse(window.localStorage.getItem("token"))
    const [docArray, setDocArray] = useState()
    const [popolariArray, setPopolariArray] = useState()
 

    //esegue il fetch al caricamento dell'app e al cambiamento di token
    useEffect(() => {

        fetch("../api/v2/documents/?token="+token, {method: 'GET'})
        .then((resp) => resp.json())
        .then(data => setDocArray(data.documents))
        .catch(error => console.log('error', error)); // Transform the data into json

        fetch("../api/v2/documents/mostLiked?token="+token, {method: 'GET'})
        .then((resp) => resp.json())
        .then(data => setPopolariArray(data.documents))
        .catch(error => console.log('error', error)); // Transform the data into json

    },[]);




    return (
        <>    
            <Navigation navbar={props.navbar} token={token}/>

            <div className="d-none d-lg-block" >     
            {
                popolariArray
                ?
                <>
                    <p className="text-center titoletti">I preferiti dai nostri utenti</p>
                    <Container>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={3}
                            navigation={true}
                            effect={"coverflow"}
                            grabCursor={true}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                              }}
                            modules={[Arrows, EffectCoverflow]}
                            
                        >
                            {
                                popolariArray.map((item) =>
                                    <SwiperSlide className='d-flex justify-content-center'>
                                        <DocSpoil 
                                            titolo={item.title}
                                            descrizione={item.description}
                                            url={item.url}
                                            macroarea={item.area}
                                            id={item._id}
                                            approval={item.approval}
                                        />
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                    </Container>
                </>
                :
                ""
            }
            </div>  

            {
                docArray
                ? 
                <>
                    <p className="text-center titoletti">Tutti i documenti</p>
                    <Container className="d-flex justify-content-center flex-wrap">
                    {
                        docArray.map((item) => 
                            <DocSpoil 
                                titolo={item.title}
                                descrizione={item.description}
                                url={item.url}
                                macroarea={item.area}
                                id={item._id}
                                approval={item.approval}
                            /> 
                        )
                    }
                    </Container>
                </>
                : 
                <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:"80vh"}}>
                    <Spinner animation="border" variant="primary" className='text-center'/>
                    <p className="mt-2 text-center">Stiamo caricando i file, tieniti forte.</p>
                </Container>
            }
            <Footer/>
        </>
    );
};

export default Platform;