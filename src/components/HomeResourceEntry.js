import React from 'react';
import Image from 'react-bootstrap/Image';
import '../components/HomeResourceEntry.css';
import ARTICLES from '../components/ResourceArticles';
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom';

/**
 * Represent an entry consist of an image and a caption for each article
 * @param {*} props 
 */
export const ResourceImage = (props) => {
    return (
        <div className="entry">
            <a className="resourceTitle" href={props.link} target="blank">
                <Image src={props.image} alt={props.title} rounded />
                <p style={{textAlign: "left",  marginTop: "10px"}}>{props.title}</p>
            </a>
        </div>
    )
}

/**
 * @param {string} tag the resource entry category (e.g. "study")
 * @param {int} eventKey the number indicating which accordion section is current open 
 *                       (see React-Boostrap Accordion)
 */
class HomeResourceEntry extends React.Component{
    state = {
        entries: []
    };

    componentWillMount() {
        // this.setState({ entries: this.props.resourcesEntries })
        this.getResourceEntry();
    }

    getResourceEntry() {
        // Grabbing all content from ARTICLES
        let resources = [];

        ARTICLES.map(ARTICLE => {
            resources.push({
                id: ARTICLE.id,
                title: ARTICLE.title,
                image: ARTICLE.image,
                tag: ARTICLE.tag,
                link: ARTICLE.link
            });
            return null; 
        })

        // Filtering: gets the resource article with a particular tag
        let articleEntries = [];

        for (let entry in resources) {
            if (resources[entry].tag === this.props.tag){
                articleEntries.push(resources[entry]);
            } else {
                console.log("no such tag found in articles.");
            }
        }

        // set the state of this component to match tag
        this.setState({ entries: articleEntries});

    }

    toResource = (event) => {
        let categoryClicked = this.props.eventKey;

        this.props.history.push({
            pathname: "/resources",
            state: {detail: categoryClicked}
        });
    }

    render(){
        return (
            <div>
                {this.state.entries.map((entry)=> 

                    <div className="resourceEntryWrapper">
                        <h1 className="tagTitle">#{this.props.tag}</h1>
                        <button name={this.props.eventKey} className="moreButton" onClick={this.toResource}>
                            <FontAwesomeIcon className="navItem" icon={faArrowCircleRight} />
                        </button>

                        <ResourceImage 
                            key={entry.id} 
                            title={entry.title} 
                            image={entry.image}
                            link={entry.link} />
                    </div>

                )}
            </div>
        )
    }
}

export default withRouter(HomeResourceEntry);