import React, { useEffect, useState } from 'react';
import DocPage from './DocPage';
import Main from './Main';




const Homepage = (props) => {

    const [page, setPage] = useState(<Main theme={props.theme} setTheme={props.setTheme}/>)

    const fetchToken = () => {
        const url = "http://localhost:3001/api/v1/token/?token="+props.token
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            if(data.success == true){
                setPage(<DocPage theme={props.theme} setTheme={props.setTheme}/>)
            }
        })
    }


    useEffect(() => fetchToken, []);

    return(
        page
    )

};

export default Homepage;