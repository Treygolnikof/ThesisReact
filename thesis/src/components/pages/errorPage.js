import React from 'react';
import NotFound from './img/NotFound.jpeg';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
            <img src={NotFound} alt = ''></img>
            <Link className="text-white text-decoration-none" to="/">
                <Button
                    color="warning" 
                    block>
                    To main
                </Button>
            </Link>
        </>
    )
} 

export default ErrorPage;