import React from 'react';
import "./Home.css";
import Quote from '../components/Quote';
import HomeResourceEntry from '../components/HomeResourceEntry';
import ARTICLES from '../components/ResourceArticles';
import MiniBoard from '../components/MiniBoard';

class Home extends React.Component{

    state = { 
        studyResources: [],
        healthResources: [],
        relationshipResources: []
    };

    // Read resource entries from the given article list to display by tag
    getResourceEntries(){
        var resources = []
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
        let studyEntries = []
        let healthEntries = []
        let relationshipEntries = []
        for (let entry in resources){
            console.log(resources[entry])
            if (resources[entry].tag === "study"){
                studyEntries.push(resources[entry])
            } else if (resources[entry].tag === "health"){
                healthEntries.push(resources[entry])
            } else if (resources[entry].tag === "relationship"){
                relationshipEntries.push(resources[entry])
            } else {
                console.log("Cannot find the tag")
            }
        }
        return ( 
            <div>
                <HomeResourceEntry key="study" tagName="study" resourcesEntries={studyEntries} /> 
                <HomeResourceEntry key="health" tagName="health" resourcesEntries={healthEntries} /> 
                <HomeResourceEntry key="relationship" tagName="relationship" resourcesEntries={relationshipEntries} /> 
            </div>
        );
    }
    
    render(){
        return (
            <div className="wrapper">
                <Quote />

                <div className="card-section">
                    <h2>COMMUNITY BOARD</h2>
                    <p>What is your community talking about today?</p>
                    <MiniBoard />
                </div>

                <div className="resource-section">
                    {this.getResourceEntries()}
                </div>
            </div>
        );
    }
}

export default Home;