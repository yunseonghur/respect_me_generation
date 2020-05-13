import React from 'react';
import "./Home.css";
import Quote from '../components/Quote';
import HomeResourceEntry from '../components/HomeResourceEntry';
import ARTICLES from '../components/ResourceArticles';
import MiniBoard from '../components/MiniBoard';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { Row, Col, Jumbotron } from 'react-bootstrap';

class Home extends React.Component{

    state = { 
        studyResources: [],
        healthResources: [],
        relationshipResources: []
    };

    // Route to resources page with the selected category to display relavant contents
    toCommBoard= (event) => {
        let categoryClicked = event.target.name
        this.props.history.push({
            pathname: "/resources",
            state: {detail: categoryClicked}
        });
    }

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
                <h3>#study</h3>
                <Jumbotron>
                    <Button name="0" onClick={this.toCommBoard} variant="link">></Button>{' '}
                    <HomeResourceEntry key="study" tagName="study" resourcesEntries={studyEntries} /> 
                </Jumbotron>
                <h3>#health</h3>
                <Jumbotron>
                    <Button name="1" onClick={this.toCommBoard} variant="link">></Button>{' '}
                    <HomeResourceEntry key="health" tagName="health" resourcesEntries={healthEntries} /> 
                </Jumbotron>
                <h3>#relationship</h3>
                <Jumbotron>
                    <Button name="2" onClick={this.toCommBoard} variant="link">></Button>{' '}
                    <HomeResourceEntry key="relationship" tagName="relationship" resourcesEntries={relationshipEntries} />
                </Jumbotron>
            </div>
        );
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
                    {this.getResourceEntries()}
                </div>
            </div>
        );
    }
}

export default withRouter(Home);