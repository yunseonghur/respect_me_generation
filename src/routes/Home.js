import React, { Component } from 'react';
import "./Home.css";
import Quote from '../components/Quote';
import ResourceEntry from '../components/ResourceEntry';
import MiniBoard from '../components/MiniBoard';


/**
 * This route is the first page users see.
 * 
 * Houses 3 main component parts: 
 * - Quote
 * - MiniBoard
 * - HomeResourceEntry(s)
 */
class Home extends Component{
    
    render(){
        return (
            <div className="home_wrapper">
                <Quote />
                <div className="home_card-section">
                    <h2 className="home_board--title">COMMUNITY BOARD</h2>
                    <p className="home_card-section--prompt">What is your community talking about today?</p>
                    <MiniBoard />
                </div>

                <div className="home_resource-section"> 
                    <ResourceEntry 
                        isPreview="true"
                        tag="study" 
                        eventKey="0" 
                            
                    /> 
                    <ResourceEntry 
                        isPreview="true"
                        tag="health" 
                        eventKey="1"  
                    /> 
                    <ResourceEntry 
                        isPreview="true"
                        tag="relationships" 
                        eventKey="2" 
                    /> 
                </div>
            </div>
        );
    }
}

export default Home;