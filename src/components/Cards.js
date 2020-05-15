import React from 'react';
import MyCard from './MyCard';
import {CardDeck, Container} from 'react-bootstrap';
import AddComment from './AddComment';
import fire from '../fire'
import loading from '../images/loading.gif';
const dbRef = fire.database().ref();

/**
 * A layout displaying cards from all users.
 */
class Cards extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            cardSelected: "",
            isLoading: true,
            showCards: true, 
            visible: false,
            cards: [],
            tag: ""
        }
    }

    getCards(users){
        let cardCollected = [];
        for (let user in users){
            let cards = users[user].cards

            for (let card in cards){
                cardCollected.push({
                    id: card,
                    background: cards[card].imgOption,
                    text: cards[card].text,
                    comments: cards[card].comments,
                    timestamp: cards[card].timestamp
                });
            }
        }
        
        this.setState({ 
            cards: cardCollected,
            isLoading: false
        })
    }

    componentDidMount(){
        dbRef.child('User').on('value', snap => {
            const users = snap.val();
            this.getCards(users);
        });
    }

    // componentWillUnmount(){
    //     this.mounted = false;
    // }

    cardClicked = () => {
        this.setState({visible: true})
      };
    
    hideModal = () => {
        this.setState({visible: false})
    }

    static getDerivedStateFromProps(props, state) {
        return {tag: props.tag}
    }

    getCardOwner = () => {
        let cardOwnerUID;
        dbRef.child('User').on('value', snap => {
            const users = snap.val();
            for (let user in users){
                let cards = users[user].cards
                for (let card in cards){
                    if(card === this.state.cardSelected){
                        cardOwnerUID = user
                    }
                }
            }
        });
        return cardOwnerUID
      };

    /**
     * counts the number of 
     * cardCommentObj: a card comment object stored in user
     */
    countComments = (cardCommentObj) => {
        // count comments under each card
        let cardComment = cardCommentObj;
        let commentNumber = 0;
        if (cardComment != null) {
            // count and increment commentNumber
            commentNumber++;

        }

        return commentNumber;
    }
    
    // sorts cards by tag
    sortByTag() {
        var users;
        dbRef.child('User').on('value', snap => {
            users = snap.val();
        });
        let cardCollected = [];
        for (let user in users){
            
            let cards = users[user].cards

            if (this.state.tag !== "all") {
                for (let card in cards){
                    let commentNumber = this.countComments(cards[card].comments)

                    if (cards[card].tag === this.state.tag) {
                        cardCollected.push({
                            id: card,
                            background: cards[card].imgOption,
                            text: cards[card].text,
                            comments: cards[card].comments,
                            numComments: commentNumber,
                            timestamp: cards[card].timestamp,
                            upvote: this.countUpvotes(cards[card].upvote),
                            downvote: this.countDownvotes(cards[card].downvote)
                        });
                    } 
                }
            } else if (this.props.tag === "all") {
                for (let card in cards){

                    let commentNumber = this.countComments(cards[card].comments)

                    cardCollected.push({
                        id: card,
                        background: cards[card].imgOption,
                        text: cards[card].text,
                        comments: cards[card].comments,
                        numComments: commentNumber,
                        timestamp: cards[card].timestamp,
                        upvote: this.countUpvotes(cards[card].upvote),
                        downvote: this.countDownvotes(cards[card].downvote)
                    });
                }
            }

        }
        this.sortByTimestamp(cardCollected);
        return cardCollected;
    }

    // cards collected are sorted by timestamp after cars are sorted by tag
    sortByTimestamp(cardCollected){
        cardCollected.sort(function (a, b){
            return b.timestamp - a.timestamp;
        })
        return cardCollected;
    }

    countUpvotes = (upvoteObj) => {
        if (upvoteObj != null) {
            return upvoteObj;
        }
        return "0";
    }

    countDownvotes = (downvoteObj) => {
        if (downvoteObj != null) {
            return downvoteObj;
        }
        return "0";
    }

    render() {
        return (
            <div>
                {this.state.isLoading ? (
                    <div className="loader">
                    <span className="loader__text"><br/><br/><br/><img src={loading} alt="loading"/></span>
                    </div>
                ) : this.state.showCards ?
                    (
                    <Container>
                        <CardDeck className="row row-cols-sm-2 row-cols-md-3">
                        {Array.from(this.sortByTag()).map((card)=> 
                            <div key={card.id}>
                            <MyCard
                                key={card.id} 
                                id={card.id} 
                                background={card.background} 
                                text={card.text} 
                                commentCount={card.numComments}
                                upvoteCount={card.upvote}
                                downvoteCount={card.downvote}
                                onClick={()=>{
                                    this.setState({ visible: true, cardSelected: card.id });
                                }}
                            /> </div>)}
                            {this.state.visible ?
                            <AddComment show={this.state.visible} cardOwnerUID={this.getCardOwner()} cardID={this.state.cardSelected} onHide={() => this.setState({visible: false})}/>
                            : null}
                        </CardDeck>
                    </Container>
                    ) : (
                        <div className="loader">
                        <span className="loader__text">Not Visible</span>
                        </div>
                    )}
            </div>
        )
    }
}

export default Cards;

//assets https://loading.io/