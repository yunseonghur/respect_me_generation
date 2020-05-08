import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardDeck from 'react-bootstrap/CardDeck';


class HomeResourceEntry extends React.Component{

    render(){
        return (
            <div>
                <h3><b>#{this.props.tagName}</b></h3>
                <Jumbotron fluid>
                    <CardDeck>
                        <img src="https://via.placeholder.com/200x100" alt="img" />
                        <img src="https://via.placeholder.com/200x100" alt="img" />
                        <img src="https://via.placeholder.com/200x100" alt="img" />
                        <img src="https://via.placeholder.com/200x100" alt="img" />
                        <Link to='/resources' className="btn btn-link">></Link>
                    </CardDeck>
                </Jumbotron>
            </div>
        )
    }

}

export default HomeResourceEntry;