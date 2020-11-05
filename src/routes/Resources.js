import React, { Component} from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
import ResourceEntry from "../components/ResourceEntry";
import { withRouter } from 'react-router-dom';

/**
 * The resource page is a React-Bootstrap accordion Component.
 * Each accordion 'fold' is its own component: ResourceEntry.
 */
class Resources extends Component{

    state = { 
        studyResources: [],
        healthResources: [],
        relationshipResources: []
    };

    /**
     * If this route is being accessed via the Home (via clicking the resource arrow),
     * the corresponding section that was clicked on is opened by default.
     */
    getContentClicked(){
        if (this.props.location != null) {
            if (this.props.location.state != null){
                let categoryClicked = this.props.location.state.detail
                return categoryClicked
            } 
        } else {
            console.log("no default key passed in") // do not open any section
            return "0"
        }
    }

    render() {
        return (
                <div className="resources_wrapper">
                    <h2>RESOURCES</h2>

                    <Accordion className="resources_accordion" defaultActiveKey={this.getContentClicked()}>
                        <ResourceEntry 
                            tag="study" 
                            eventKey="0" 
                            defaultActiveKey={this.state.categoryClicked} 
                        /> 
                        <ResourceEntry 
                            tag="health" 
                            eventKey="1" 
                            defaultActiveKey={this.state.categoryClicked} 
                        /> 
                        <ResourceEntry 
                            tag="relationships" 
                            eventKey="2" 
                            defaultActiveKey={this.state.categoryClicked} 
                        /> 
                    </Accordion>
                </div>
        );
    }
}


export default withRouter(Resources);