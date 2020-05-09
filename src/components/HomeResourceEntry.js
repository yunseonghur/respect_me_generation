import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card'


class HomeResourceEntry extends React.Component{

    render(){
        console.log(this.props.image)
        return (
            <div>
                <h3><b>#{this.props.tagName}</b></h3>
                <Jumbotron fluid>
                    <CardDeck>
                        {/* <Card>
                            <Card.Img variant="top" src={this.props.image} />
                            <Card.Text>
                                {this.props.title}
                            </Card.Text>
                        </Card> */}
                        <div className="entry">
                            <img src={this.props.image} alt={this.props.title} />
                            <p>{this.props.title}</p>
                        </div>
                        <Link to='/resources' className="btn btn-link">></Link>
                    </CardDeck>
                </Jumbotron>
            </div>
        )
    }

}

export default HomeResourceEntry;