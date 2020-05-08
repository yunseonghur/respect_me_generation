import React from 'react';
import './CommunityBoard.css';
import Cards from '../components/Cards';
import VideoDisplay from '../components/VideoDisplay';
import Tag from '../components/Tag';
import Board from '../components/Board';
import { CardDeck, Container, Button, Link } from 'react-floating-action-button';
import { Tab, Row, Nav, ButtonGroup } from 'react-bootstrap';


class CommunityBoard extends React.Component{
    state = {
        cards: [],
        videos: [],
        isLoading: true, // true if the server is still loading cards data
        visible: true,  // true if cards are visible & false if videos are visible
        show: false
    };
    render() {

        return (
            <div>
                <Board></Board>

                <Container>
                    <Link tooltip="Upload a video"><Button onClick={this.uploadHandler} ><img src="https://img.icons8.com/material-outlined/24/000000/camcorder-pro.png"/></Button></Link>
                    <Link href='#createCard' tooltip="Add a card"><img src="https://img.icons8.com/android/24/000000/note.png"/></Link>
                    <Button rotate={true}><img src="https://img.icons8.com/android/24/000000/plus.png"/></Button>
                </Container>
            </div>
        )}
}

export default CommunityBoard;