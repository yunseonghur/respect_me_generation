import React from 'react';
import "./Home.css";
import Quote from '../components/Quote';
import HomeResourceEntry from '../components/HomeResourceEntry';
import MiniBoard from '../components/MiniBoard';

/**
 * This route is the first page users see.
 * 
 * Houses 3 main component parts: 
 * - Quote
 * - MiniBoard
 * - HomeResourceEntry(s)
 */
class Home extends React.Component{
    
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
                    <HomeResourceEntry tag="study" eventKey="0" />
                    <HomeResourceEntry tag="health" eventKey="1" />
                    <HomeResourceEntry tag="relationship" eventKey="2" />
                </div>
            </div>
        );
    }
}

export default Home;