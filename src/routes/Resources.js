import React, { Component} from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
import ResourceEntry from "../components/ResourceEntry";
import ARTICLES from '../components/ResourceArticles';
import { withRouter } from 'react-router-dom';


class Resources  extends Component{

    state = { 
        studyResources: [],
        healthResources: [],
        relationshipResources: []
    };

    getContentClicked(){
        if (this.props.location != null) {
            if (this.props.location.state != null){
                let categoryClicked = this.props.location.state.detail
                return categoryClicked
            } 
        } else {
            console.log("no default key passed in")
            return "0"
        }
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
                <ResourceEntry key="0" title="study" contents={studyEntries} eventKey="0" defaultActiveKey={this.state.categoryClicked} /> 
                <ResourceEntry key="1" title="health" contents={healthEntries} eventKey="1" defaultActiveKey={this.state.categoryClicked} /> 
                <ResourceEntry key="2" title="relationship" contents={relationshipEntries} eventKey="2" defaultActiveKey={this.state.categoryClicked} /> 
            </div>
        );
    }

    render() {
        return (
                <div className="base">
                    <h1>RESOURCES</h1>

                    <Accordion className="accordion" defaultActiveKey={this.getContentClicked()}>
                        {this.getResourceEntries()}
                    </Accordion>
                </div>
        );
    }
}


export default withRouter(Resources);
