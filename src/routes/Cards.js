import React from 'react';
import Button from 'react-bootstrap/Button';
import CreateCard from '../routes/CreateCard';
import { Link } from 'react-router-dom';
// import "./Cards.css";

class Cards extends React.Component{
    render() {
        return (
            <div>
                <Link to='createCard' className="btn btn-primary">Create Card</Link>
            </div>
        );
    }

}


export default Cards;