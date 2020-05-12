import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardDeck from 'react-bootstrap/CardDeck';


// Represent an entry consist of an image and a caption for each article
const ResourceEntry = (props) => {
    console.log(props.link);
    return (
        <div className="entry">
            <img src={props.image} alt={props.title} />
            <p><a href={props.link}>{props.title}</a></p>
        </div>
    )
}

class HomeResourceEntry extends React.Component{
    state = {
        entries: []
    };
    componentDidMount(){
        this.setState({ entries: this.props.resourcesEntries })
    }
    render(){
        return (
            <div>
                <h3><b>#{this.props.tagName}</b></h3>
                <Jumbotron fluid>
                    <CardDeck>
                        {(this.state.entries.map((entry)=> 
                            <ResourceEntry 
                                key={entry.id} 
                                title={entry.title} 
                                image={entry.image}
                                link={entry.link} />
                        ))}
                        <Link to='/resources' className="btn btn-link">></Link>
                    </CardDeck>
                </Jumbotron>
            </div>
        )
    }
}

export default HomeResourceEntry;