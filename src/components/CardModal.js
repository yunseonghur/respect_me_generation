import React from 'react';
import ARTICLES from '../components/ResourceArticles';
import MyCard from '../components/MyCard';
import { Container, Row, Button, Modal } from 'react-bootstrap';
import "./CardModal.css";

class CardModal extends React.Component {

    render() {
        return (
            <Modal
            size="md"
            onHide={this.props.onHide}
            show={this.props.show}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>Your Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row id="card-row">
                            <MyCard background={this.props.imgsrc} text={this.props.text} />
                        </Row>
                        <Row id="text-row">
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
                <Modal.Footer centered>
                    <Button className="modal-btn" href="#communityBoard">Go to Community Board</Button>
                </Modal.Footer>
        </Modal>
        )
    }
};

export default CardModal;