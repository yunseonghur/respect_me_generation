import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


/**
 * Represent an entry consist of an image and a caption for each article
 * @param {*} props 
 */
export const ResourceImage = (props) => {
    return (
        <div className="entry">
            <Image src={props.image} alt={props.title} rounded />
            <p><a href={props.link} target="blank">{props.title}</a></p>
        </div>
    )
}

class HomeResourceEntry extends React.Component{
    state = {
        entries: []
    };
    componentWillMount(){
        this.setState({ entries: this.props.resourcesEntries })
    }
    render(){
        return (
            <div>
                <Jumbotron fluid>
                    <Row>
                        <Col>
                        {(this.state.entries.map((entry)=> 

                            <ResourceImage 
                                key={entry.id} 
                                title={entry.title} 
                                image={entry.image}
                                link={entry.link} />
                        ))}
                        </Col>
                    </Row>
                </Jumbotron>
            </div>
        )
    }
}

export default HomeResourceEntry;