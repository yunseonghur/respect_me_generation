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

    state = {
        isCardVisible: true  // false when video tab selected
    }

    render() {
        return (
            <div>
                <ButtonGroup> 
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
                <div className="visibleBoard">
                { this.state.isCardVisible ? <Cards></Cards> : <VideoDisplay></VideoDisplay> }
                </div>
            </div>
        )
    }

}

export default MiniBoard;