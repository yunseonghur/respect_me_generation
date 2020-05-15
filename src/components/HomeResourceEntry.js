import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import '../components/HomeResourceEntry.css';


/**
 * Represent an entry consist of an image and a caption for each article
 * @param {*} props 
 */
export const ResourceImage = (props) => {
    return (
        <div className="entry">
            <Image src={props.image} alt={props.title} rounded />
            <p style={{textAlign: "left"}}><a className="resourceTitle" href={props.link} target="blank">{props.title}</a></p>
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
                {(this.state.entries.map((entry)=> 
                    <ResourceImage 
                        key={entry.id} 
                        title={entry.title} 
                        image={entry.image}
                        link={entry.link} />
                ))}
            </div>
        )
    }
}

export default HomeResourceEntry;