import React, { Component } from 'react';
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
                    <HomeResourceEntry tag="study" eventKey="0" />
                    <HomeResourceEntry tag="health" eventKey="1" />
                    <HomeResourceEntry tag="relationship" eventKey="2" />
                </div>
            </div>
        );
    }
}

export default Home;