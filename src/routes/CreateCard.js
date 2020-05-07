import React from 'react';
import fire from '../fire';
import MyCard from '../components/MyCard';
import "../routes/CreateCard.css";
import { Container, Nav, Row, Col, Tab, CardDeck, Card, Button, Modal } from 'react-bootstrap';
import ARTICLES from '../components/ResourceArticles';

class CreateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgOption: '1',
            text: '',
            createdCard: false,
            imgSrc: '',
            logInModal: false,
            tag: ''
        };
        this.db = fire.database();
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleTxtChange = this.handleTxtChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    // imgOption state is set when an image is selected
    handleImgChange(event) {
        this.setState({
            imgOption: event.target.value
        })
    }
    
    // text state is set when user enters a text
    handleTxtChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTagChange(event) {
        this.setState({
            tag: event.target.name
        })
    }

    // saves card information to firebase
    writeCardInfo(imgSrc, currentUser) {
        var key = this.db.ref().child('Card').push().key;
        this.db.ref("Card/" + key).set({
            imgOption: imgSrc,
            text: this.state.text,
            tag: this.state.tag
        });
        this.db.ref("User/" + currentUser.uid).child('cards/' + key).set({
            imgOption: imgSrc,
            text: this.state.text,
            tag: this.state.tag
        });
    }

    showModal() {
        return (
            <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Your Card</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <MyCard id="1" background={this.state.imgSrc} text={this.state.text} />
                                </Row>
                                <Row id="text-row">
                                   <div id="tagResource">
                                       {
                                           ARTICLES.map(ARTICLE => {
                                               if (ARTICLE.id === this.state.tag){
                                                    return (
                                                        <div key={ARTICLE.id}>
                                                            {ARTICLE.description}
                                                            <br />
                                                            {ARTICLE.link}
                                                        </div>
                                                    );
                                                }
                                           })
                                       }
                                   </div>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Container>
                                <Row>
                                    <Col>
                                        <Button className="modal-btn" href="#cards">Go to Community Board</Button>
                                    </Col>
                                    <Col>
                                        <Button className="modal-btn" variant="secondary" onClick={
                                            ()=> {
                                                this.setState({ createdCard: false });
                                            }
                                        }>Close</Button>
                                    </Col>   
                                </Row>
                            </Container>
                        </Modal.Footer>
                    </Modal.Dialog>
        )    
    }

    // finds src of the image selected by user
    handleSubmit(event) {
        event.preventDefault();
        var currentUser = fire.auth().currentUser;

        if (currentUser != null) {
            var imgRef = this.db.ref('Image');
            var imgSource = '';
            imgRef.on('value', snap => {
                const imgInfo = snap.val();
                imgSource = imgInfo[this.state.imgOption]
                this.setState({ imgSrc: imgInfo[this.state.imgOption]});
                this.writeCardInfo(imgSource, currentUser);
            })
            this.setState({createdCard:true});
            this.showResource();
        } else {
            this.setState({logInModal:true});
        }
    }

    render() {
        return (
            <div className="container">
                { this.state.logInModal ? 
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Please Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Please log in before you create a card.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={
                                ()=> {
                                    this.setState({ logInModal: false });
                                }
                            }>Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    :
                    null
                }
                <form onSubmit={this.handleSubmit}>
                    <div id='selectImg'>
                        <p className="instruction">1. Select Image</p>
                        <div className='jumbotron'>
                            <CardDeck>
                                <div className='container'>
                                    <label>
                                        <div className="imgOption">
                                            <Card>
                                                <Card.Img className="cardImage" src={"https://i.pinimg.com/564x/aa/b8/49/aab84958979e408935c1b472deacda43.jpg"}/>
                                            </Card>
                                            <input type="radio" value="1" checked={this.state.imgOption === "1"} onChange={this.handleImgChange} />
                                        </div>
                                    </label>
                                    <label>
                                        <div className="imgOption">
                                            <Card>
                                                <Card.Img className="cardImage" src={"https://i.pinimg.com/564x/73/96/bd/7396bd1cbf9e8ef8c73be0476290fd95.jpg"}/>
                                            </Card>
                                            <input type="radio" value="2" checked={this.state.imgOption === "2"} onChange={this.handleImgChange} />
                                        </div>
                                    </label>
                                    <label>
                                        <div className="imgOption">
                                            <Card>
                                                <Card.Img className="cardImage" src={"https://i.pinimg.com/564x/40/39/5c/40395c9d7cd4263ce1eb1d9eae47b920.jpg"}/>
                                            </Card>
                                            <input type="radio" value="3" checked={this.state.imgOption === "3"} onChange={this.handleImgChange} />
                                        </div>
                                    </label>
                                </div>
                            </CardDeck>
                        </div>
                    </div>
                    <div id="enterText">
                        <p className="instruction">2. Enter Text</p>
                        <div id="textField" className='jumbotron'>
                            <textarea name='text' onChange={this.handleTxtChange} />
                        </div>
                    </div>
                    <div id="selectTag">
                        <p className="instruction">3. Select a Tag</p>
                        <div className="jumbotron">
                            <Tab.Container id="center-tab">
                                <Row id="tag-row">
                                    <Nav variant="pills" className="flex-row">
                                        <Col>
                                            <Nav.Item>
                                                <Nav.Link eventKey="study" name="study" onClick={this.handleTagChange}>Study</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        <Col>
                                            <Nav.Item>
                                                <Nav.Link eventKey="relationship" name="relationship" onClick={this.handleTagChange}>Relationship</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        <Col>
                                            <Nav.Item>
                                                <Nav.Link eventKey="health" name="health" onClick={this.handleTagChange}>Health</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                    </Nav>
                                </Row>
                            </Tab.Container>
                        </div>
                        
                    </div>
                    <div className='container'>
                        <Button onClick={this.handleSubmit} size="lg" block>Create!</Button>
                    </div>
                </form>
                { this.state.createdCard ? this.showModal() : null}
            </div>
            
        )
    }
}

export default CreateCard;
