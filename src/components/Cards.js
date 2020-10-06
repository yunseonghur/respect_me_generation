import React from "react";
import MyCard from "./MyCard";
import { CardDeck } from "react-bootstrap";
import AddComment from "./AddComment";
import fire from "../fire";
import loading from "../images/loading.gif";
import "./Cards.css";
const dbRef = fire.database().ref();

/**
 * A layout displaying cards from all users.
 * Called in Board.js and MiniBoard.js
 */
class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardSelected: "",
      isLoading: true,
      showCards: true,
      visible: false,
      cards: [],
      tag: "",
    };
  }

  /**
   * Grabs all users' cards from firebase
   * @param {firebaseUser} users
   */
  getCards(users) {
    let cardCollected = [];
    for (let user in users) {
      let cards = users[user].cards;

      for (let card in cards) {
        cardCollected.push({
          id: card,
          background: cards[card].imgOption,
          text: cards[card].text,
          comments: cards[card].comments,
          timestamp: cards[card].timestamp,
        });
      }
    }
    this.setState({
      cards: cardCollected,
      isLoading: false,
    });
  }

  componentDidMount() {
    dbRef.child("User").on("value", (snap) => {
      const users = snap.val();
      this.getCards(users);
    });
  }

  static getDerivedStateFromProps(props, state) {
    return { tag: props.tag };
  }

  /**
   * Visible state setter when card is clicked
   */
  cardClicked = () => {
    this.setState({ visible: true });
  };

  /**
   * Visible state setter when card is closed
   */
  hideModal = () => {
    this.setState({ visible: false });
  };

  /**
   * Returns the Google UID of card owner
   */
  getCardOwner = () => {
    let cardOwnerUID;
    dbRef.child("User").on("value", (snap) => {
      const users = snap.val();
      for (let user in users) {
        let cards = users[user].cards;
        for (let card in cards) {
          if (card === this.state.cardSelected) {
            cardOwnerUID = user;
          }
        }
      }
    });
    return cardOwnerUID;
  };

  /**
   * counts the number of comments a user has.
   * @param {Comment} cardCommentObj a card comment object stored in user
   */
  countComments = (cardCommentObj) => {
    // count comments under each card
    let cardComment = cardCommentObj;
    let commentNumber = 0;
    if (cardComment != null) {
      // count and increment commentNumber
      for (let count in cardComment) {
        commentNumber++;
      }
    }
    return commentNumber;
  };

  /**
   * Sorts cards by tag
   */
  sortByTag() {
    var users;
    dbRef.child("User").on("value", (snap) => {
      users = snap.val();
    });
    let cardCollected = [];
    for (let user in users) {
      let cards = users[user].cards;

      if (this.state.tag !== "all") {
        for (let card in cards) {
          let commentNumber = this.countComments(cards[card].comments);

          if (cards[card].tag === this.state.tag) {
            cardCollected.push({
              id: card,
              background: cards[card].imgOption,
              text: cards[card].text,
              comments: cards[card].comments,
              numComments: commentNumber,
              timestamp: cards[card].timestamp,
              upvote: this.countUpvotes(cards[card].upvote),
              downvote: this.countDownvotes(cards[card].downvote),
            });
          }
        }
      } else if (this.props.tag === "all") {
        for (let card in cards) {
          let commentNumber = this.countComments(cards[card].comments);

          cardCollected.push({
            id: card,
            background: cards[card].imgOption,
            text: cards[card].text,
            comments: cards[card].comments,
            numComments: commentNumber,
            timestamp: cards[card].timestamp,
            upvote: this.countUpvotes(cards[card].upvote),
            downvote: this.countDownvotes(cards[card].downvote),
          });
        }
      }
    }
    this.sortByTimestamp(cardCollected);
    return cardCollected;
  }

  /**
   * Sorts cards from users by timestamp
   * @param {array} cardCollected a list of all cards from iterating through all users
   */
  sortByTimestamp(cardCollected) {
    cardCollected.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });
    return cardCollected;
  }

  /**
   * Return count of upVote
   * @param {int} upVotes
   * */
  countUpvotes = (upVotes) => {
    if (upVotes != null) {
      return upVotes;
    }
    return "0";
  };

  /**
   * Return count of downVote
   * @param {int} downVotes
   */
  countDownvotes = (downVotes) => {
    if (downVotes != null) {
      return downVotes;
    }
    return "0";
  };

  render() {
    return (
      <div className="cards">
        {this.state.isLoading ? (
          <div className="cards__loader">
            <span className="cards__loader--text">
              <br />
              <br />
              <br />
              <img src={loading} alt="loading" />
            </span>
          </div>
        ) : this.state.showCards ? (
          <CardDeck className="cards__card-deck row">
            {Array.from(this.sortByTag()).map((card) => (
              <div key={card.id}>
                <MyCard
                  key={card.id}
                  id={card.id}
                  background={card.background}
                  text={card.text}
                  commentCount={card.numComments}
                  upvoteCount={card.upvote}
                  downvoteCount={card.downvote}
                  onClick={() => {
                    this.setState({ visible: true, cardSelected: card.id });
                  }}
                />{" "}
              </div>
            ))}
            {this.state.visible ? (
              <AddComment
                show={this.state.visible}
                cardOwnerUID={this.getCardOwner()}
                cardID={this.state.cardSelected}
                onHide={() => this.setState({ visible: false })}
              />
            ) : null}
          </CardDeck>
        ) : (
          <div className="cards__loader">
            <span className="cards__loader--text">Not Visible</span>
          </div>
        )}
      </div>
    );
  }
}

export default Cards;

//assets https://loading.io/
