import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';


class HomeResourceEntry extends React.Component{

    render(){
        return (
            <div>
                <h3><b>#{this.props.tagName}</b></h3>
                <Jumbotron fluid>
                    <Link to='/resources' className="btn btn-link">></Link>
                </Jumbotron>
            </div>
        )
    }

}

export default HomeResourceEntry;