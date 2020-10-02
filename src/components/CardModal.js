import React from 'react';
import ARTICLES from '../components/ResourceArticles';
import MyCard from '../components/MyCard';
import { Container, Row, Button, Modal } from 'react-bootstrap';
import "./CardModal.css";

/**
 * A modal that is displayed when a card is created, and suggests relevant resources.
 * Called in CreateCard.js file.
 * 
 * @param {function} onHide what should happen when modal is closed.
 * @param {boolean} show indicates whether this modal is currently showing.
 * @param {string} imgsrc chosen image for card
 * @param {string} text input for card
 * @param {string} tag chosen for card
 */
class CardModal extends React.Component {

    render() {
        return (
            <Modal
            className="card-modal"
            size="md"
            onHide={this.props.onHide}
            show={this.props.show}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered="true">
                <Modal.Header className="card-modal__header" closeButton>
                    <Modal.Title className="card-modal__header--title">Your Card</Modal.Title>
                </Modal.Header>
                <Modal.Body className="card-modal__body">
                    <Container className="card-modal__body--container">
                        <Row className="card-modal__body--row--card">
                            <MyCard background={this.props.imgsrc} text={this.props.text} />
                        </Row>
                        <Row className="card-modal__body--row--text" >
                            <div id="tagResource">
                            { this.props.tag !== "all" ? <div>You selected #{this.props.tag}. Check out these articles!</div> : null}
                                {
                                    ARTICLES.map(ARTICLE => {
                                        if (ARTICLE.tag === this.props.tag){
                                            return (
                                                <div key={ARTICLE.id}>
                                                    <br />
                                                    <a href={ARTICLE.link} target="blank">{ARTICLE.title}</a>
                                                </div>
                                            );
                                        }
                                        return null
                                    })
                                }
                            </div>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="card-modal__footer" centered="true">
                    <Button className="card-modal__footer--btn" href="#communityBoard">Go to Community Board</Button>
                </Modal.Footer>
        </Modal>
        )
    }
};

export default CardModal;