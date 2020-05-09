import React, {Component} from 'react';
import '../components/MiniBoard.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Cards from './Cards';
import VideoDisplay from "./VideoDisplay";

/**
 * A minified version of the community board
 * which doesn't show all videos.
 */
class MiniBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {isCardVisible: true, isCollapsed: true};
        this.toggleExpandHandler =this.toggleExpandHandler.bind(this);
        this.divStyle = {
          maxHeight: "400px"
        }  
      }

    // state = {
    //     isCardVisible: true  // false when video tab selected   
    // }
    
    // sets the maxHeight in 
    toggleExpandHandler = () => {
        if (this.state.isCollapsed === true) {
            this.setState({isCollapsed: false })
            this.divStyle = {
                maxHeight: "2000px"
            }
        } else {
            this.setState({isCollapsed: true })
            this.divStyle = {
                maxHeight: "400px"
            }
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
                    
                    <button onClick={this.toggleExpandHandler} className="show">toggle show</button> 

                    <div style={this.divStyle} className="visibleBoard">
                    { this.state.isCardVisible ? <Cards></Cards> : <VideoDisplay></VideoDisplay> }
                    </div>
                    <div className="fade" style={{opacity: "1"}}></div>
                </div>
            </div>
        )
    }

}

export default MiniBoard;