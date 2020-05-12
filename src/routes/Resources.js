import React, { Component} from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
// import fire from '../fire.js';
import ResourceEntry from "../components/ResourceEntry";
import ARTICLES from '../components/ResourceArticles';


// get reference to firebase
// const db = fire.database();

class Resources  extends Component{

    // state = {
    //     // titles: [],
    //     // content: []
    //     studyContents: [],
    //     relationshipContents: [],
    //     healthContents: []
    // }

    // getResources() {
    //     let dbTitles = [];
    //     let dbContent = [];

    //     db.ref('Resources/').once('value', snap => {

    //         snap.forEach(function(childSnapshot) {
    //             var childKey = childSnapshot.key;
    //             dbTitles.push(childKey);
    //             console.log("title: " + childKey);
    //             var childData = childSnapshot.val();
    //             dbContent.push(childData);
    //             console.log("text body: " + childData)
    //         })

    //         console.log(dbTitles);
    //         console.log(dbContent);

    //         this.setState({
    //             titles: dbTitles,
    //             content: dbContent
    //         })
    //     })
    // }

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
                <ResourceEntry key="0" title="study" contents={studyEntries} eventKey="0" /> 
                <ResourceEntry key="1" title="health" contents={healthEntries} eventKey="1" /> 
                <ResourceEntry key="2" title="relationship" contents={relationshipEntries} eventKey="2" /> 
            </div>
        );
    }

    render() {

        // const {titles, content} = this.state;

        return (
                <div className="base">
                    <h1>RESOURCES</h1>
                    
                    <Accordion className="accordion">
                        {/* {
                            titles.map((data, index) => (
                                <ResourceEntry key={index} title={data} contents={content[index]} eventKey={index} />
                            ))
                        } */}
                        {this.getResourceEntries()}
                    </Accordion>
                </div>
        );
    }
}


export default Resources;
