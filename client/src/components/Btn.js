import React from 'react';
import { Button } from 'react-bootstrap';

const Btn = (props) => {

    const button={
        height: "48px",
        width: "180px",
        borderRadius: "10px"
    }


    return (
        <div>
            <Button className='btn-primary' style={button}>{props.text}</Button>
        </div>
    );
};

export default Btn;