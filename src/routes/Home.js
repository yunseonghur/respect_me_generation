import React from 'react';
import "./Home.css";
import Quote from '../components/Quote';
import HomeResourceEntry from '../components/HomeResourceEntry';
import Board from '../components/Board';
import ARTICLES from '../components/ResourceArticles';

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
                tag: ARTICLE.tag
            });
            return null; 
        })
        let studyEntries = []
        let healthEntries = []
        let relationshipEntries = []
        for (let entry in resources){
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
                <HomeResourceEntry tagName="study" resourcesEntries={studyEntries} /> 
                <HomeResourceEntry tagName="health" resourcesEntries={healthEntries} /> 
                <HomeResourceEntry tagName="relationship" resourcesEntries={relationshipEntries} /> 
            </div>
        );
    }
    
    render(){
        return (
            <div className="wrapper">
                <Quote />

                <Board />

                <div className="resource-section">
                    {this.getResourceEntries()}
                </div>
            </div>
        );
    }
}

export default Home;