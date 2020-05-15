import React from 'react';
import "./Home.css";
import Quote from '../components/Quote';
import HomeResourceEntry from '../components/HomeResourceEntry';
import ARTICLES from '../components/ResourceArticles';
import MiniBoard from '../components/MiniBoard';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Home extends React.Component{

    state = { 
        studyResources: [],
        healthResources: [],
        relationshipResources: []
    };

    // Route to resources page with the selected category to display relevant contents
    toResource = (event) => {
        let categoryClicked = event.target.name
        this.props.history.push({
            pathname: "/resources",
            state: {detail: categoryClicked}
        });
    }

    /**
     * Gets resource entry based on tag.
     * @param {the type of post} tag 
     */
    getResourceEntry(tag) {
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

        let entries = [];

        for (let entry in resources) {
            if (resources[entry].tag === tag){
                entries.push(resources[entry]);
            } else {
                console.log("Cannot find the tag");
            }
        }

        return (
            <div className="resourceEntryWrapper">
                <h1 className="tagTitle">#{tag}</h1>
                <Button className="moreButton" name="0" onClick={this.toResource} variant="link"><FontAwesomeIcon className="navItem" icon={faArrowCircleRight} /></Button>
                <HomeResourceEntry key={tag} tagName={tag} resourcesEntries={entries} /> 
            </div>
        )
    }
    
    render(){
        return (
            <div className="wrapper">
                <Quote />
                <div className="card-section">
                    <h2>COMMUNITY BOARD</h2>
                    <p id="prompt">What is your community talking about today?</p>
                    <MiniBoard />
                </div>

                <div className="resource-section">
                    {this.getResourceEntry("study")}
                    {this.getResourceEntry("health")}
                    {this.getResourceEntry("relationship")}
                </div>
            </div>
        );
    }
}

export default withRouter(Home);


// // Read resource entries from the given article list to display by tag
    // getResourceEntries(){
    //     var resources = []
    //     ARTICLES.map(ARTICLE => {
    //         resources.push({
    //             id: ARTICLE.id,
    //             title: ARTICLE.title,
    //             image: ARTICLE.image,
    //             tag: ARTICLE.tag,
    //             link: ARTICLE.link
    //         });
    //         return null; 
    //     })

    //     let studyEntries = []
    //     let healthEntries = []
    //     let relationshipEntries = []
    //     for (let entry in resources){
    //         if (resources[entry].tag === "study"){
    //             studyEntries.push(resources[entry])
    //         } else if (resources[entry].tag === "health"){
    //             healthEntries.push(resources[entry])
    //         } else if (resources[entry].tag === "relationship"){
    //             relationshipEntries.push(resources[entry])
    //         } else {
    //             console.log("Cannot find the tag")
    //         }
    //     }
    //     return ( 
    //         <div>
    //             <h3>#study</h3>
                
    //                 <Button name="0" onClick={this.toResource} variant="link">></Button>{' '}
    //                 <HomeResourceEntry key="study" tagName="study" resourcesEntries={studyEntries} /> 
            
    //             <h3>#health</h3>
                
    //                 <Button name="1" onClick={this.toResource} variant="link">></Button>{' '}
    //                 <HomeResourceEntry key="health" tagName="health" resourcesEntries={healthEntries} /> 
                
    //             <h3>#relationship</h3>
                
    //                 <Button name="2" onClick={this.toResource} variant="link">></Button>{' '}
    //                 <HomeResourceEntry key="relationship" tagName="relationship" resourcesEntries={relationshipEntries} />
            
    //         </div>
    //     );
    // }