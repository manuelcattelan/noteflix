import React from 'react';
import DocSpoil from '../components/DocSpoil';

const Risultati = (props) => {
    return (
        <>
            {
                props.documenti ? 
                props.documenti.map((item) => 
                    <DocSpoil 
                        titolo={item.title}
                        descrizione={item.description}
                        url={item.url}
                        macroarea={item.area}
                        autore={item.author}
                        id={item._id}
                        approval={item.approval}
                    /> 
                ) 
                : 
                ""
            }
        </>
    );
};

export default Risultati;