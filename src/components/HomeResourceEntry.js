import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardDeck from 'react-bootstrap/CardDeck';


// Represent an entry consist of an image and a caption for each article
const ResourceEntry = (props) => {
    return (
        <div className="entry">
            <img src={props.image} alt={props.title} />
            <p>{props.title}</p>
        </div>
    )
}

class HomeResourceEntry extends React.Component{
    constructor(props) {
        super(props);

        // Sort the entries by tag: study, health, relationship
        let entries = this.props.resourcesEntries
        let studyEntries = []
        let healthEntries = []
        let relationshipEntries = []
        for (let entry in entries){
            if (entries[entry].tag === "study"){
                studyEntries.push(entries[entry])
            } else if (entries[entry].tag === "health"){
                healthEntries.push(entries[entry])
            } else if (entries[entry].tag === "relationship"){
                relationshipEntries.push(entries[entry])
            } else {
                console.log("Cannot find the tag")
            }
        }

        this.state = {
            studyResources: studyEntries,
            healthResources: healthEntries,
            relationshipResources: relationshipEntries
        };
    }
    render(){
        return (
            <div>
                <Jumbotron fluid>
                    <CardDeck>
                        {(this.state.studyResources.map((study)=> 
                            <ResourceEntry 
                                key={study.id} 
                                title={study.title} 
                                image={study.image} />
                        ))}
                        <Link to='/resources' className="btn btn-link">></Link>
                    </CardDeck>
                </Jumbotron>

                <Jumbotron fluid>
                    <CardDeck>
                        {(this.state.healthResources.map((health)=> 
                            <ResourceEntry 
                                key={health.id} 
                                title={health.title} 
                                image={health.image} />
                        ))}
                        <Link to='/resources' className="btn btn-link">></Link>
                    </CardDeck>
                </Jumbotron>

                <Jumbotron fluid>
                    <CardDeck>
                        {(this.state.relationshipResources.map((relationship)=> 
                            <ResourceEntry 
                                key={relationship.id} 
                                title={relationship.title} 
                                image={relationship.image} />
                        ))}
                        <Link to='/resources' className="btn btn-link">></Link>
                    </CardDeck>
                </Jumbotron>
            </div>
        )
    }

}

export default HomeResourceEntry;