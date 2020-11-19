import React, { Component } from 'react';
import "../routes/Resources.css";
import AdminUploadResource from "../components/AdminUploadResource";
import { withRouter } from 'react-router-dom';
import ResourceImage from '../components/ResourceImage';
import Cards from "../components/Cards";
import fire from '../fire.js';

const dbRef = fire.database().ref();

/**
 * The resource page is a React-Bootstrap accordion Component.
 * Each accordion 'fold' is its own component: ResourceEntry.
 */
class Resources extends Component{

    state = { 
        entries: []
    };

    componentDidMount() {
        // may need to flatten database
        this.getResources('study');
        this.getResources('health');
        this.getResources('relationships');
    }

    /**
     * Grab resources from database.
     */
    getResources = (tag) => {
        // read all resources from db
        dbRef.child('Resources').child(tag).once('value').then(function(snap) {
            const result = snap.val();
            // console.log(result);

            return result;
        })
            .then((res) => {
                this.parseResource(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    /**
   * Parse the objects from firebase into entries.
   * 
   * @param {Object}  
   * @param {String} resourceType the tag prop
   */
  parseResource(resourceObj) {
    const parsed = Object.keys(resourceObj).map((key) => {
        return resourceObj[key];
    })

    this.setState({entries: [...this.state.entries, ...parsed]});
    console.log(this.state.entries);
  }

    /**
     * Event handler for tag selection.
     */
    handleTag = (event) => {
        event.preventDefault();
        this.setState({
        tag: event.target.name,
        });
    };

    render() {
        return (
                <div className="resources_wrapper">
                    <h2>RESOURCES</h2>

                
                    <AdminUploadResource/>
                </div>
        );
    }
}


export default withRouter(Resources);

/* <Accordion className="resources_accordion" defaultActiveKey={this.getContentClicked()}>
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
                    </Accordion> */


/**
     * If this route is being accessed via the Home (via clicking the resource arrow),
     * the corresponding section that was clicked on is opened by default.
     */
    // getContentClicked(){
    //     if (this.props.location != null) {
    //         if (this.props.location.state != null){
    //             let categoryClicked = this.props.location.state.detail
    //             return categoryClicked
    //         } 
    //     } else {
    //         console.log("no default key passed in") // do not open any section
    //         return "0"
    //     }
    // }