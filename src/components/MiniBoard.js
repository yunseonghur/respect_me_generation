import React, {Component} from 'react';
import '../components/MiniBoard.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Cards from './Cards';
import VideoDisplay from "./VideoDisplay";

import { useHistory, withRouter } from 'react-router-dom';

/**
 * A minified version of the community board
 * which doesn't show all videos.
 * 
 * isCardVisible = true if card selected, false if video
 */
class MiniBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {isCardVisible: true, isCollapsed: true, btnText: "See more"};
        this.toggleExpandHandler =this.toggleExpandHandler.bind(this);
        this.divStyle = {
          maxHeight: "200px"
        }  
      }

    toCommBoard = () => {
        this.props.history.push("/communityBoard");
    }

    // clicking once expands, another takes user to commBoard
    toggleExpandHandler = () => {
        if (this.state.isCollapsed === true) {
            this.setState({isCollapsed: false, btnText: "View Full Board" })
            this.divStyle = {
                maxHeight: "400px"
            }
        } else {
            // redirect to full community board
            this.toCommBoard();
        }
    }

    render() {
        return (
            <div>
                <div className="toggleButtons">
                <ButtonGroup className="btnGroup"> 
                    <Button variant="light" onClick={()=>{
                        this.setState({ isCardVisible: true});
                    }}>
                        Cards
                    </Button>
                    <Button variant="light" onClick={()=>{
                        this.setState({ isCardVisible: false});
                    }}>
                        Videos
                    </Button>
                </ButtonGroup>
                </div>
                
                <div className="visibleBoardWrapper">
                    <div style={this.divStyle} className="visibleBoard">
                        { this.state.isCardVisible ? <Cards></Cards> : <VideoDisplay></VideoDisplay> }
                    </div>
                    <div className="fade" style={{opacity: "1"}}></div>
                    <div className="buttonContainer">
                        <button onClick={this.toggleExpandHandler} className="show">{this.state.btnText}</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(MiniBoard);