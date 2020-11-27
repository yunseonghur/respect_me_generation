import React from "react";
import MyCard from "./MyCard";
import { CardDeck } from "react-bootstrap";
import fire from "../fire";
import loading from "../images/loading.gif";
const dbRef = fire.database().ref();

/**
 * A layout displaying cards from all users.
 * Called in CommunityBoard.js
 */
class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardSelected: "",
      isLoading: true,
      showCards: true,
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
          tag: cards[card].tag,
        });
      }
    }
    this.setState({
      cards: cardCollected,
      isLoading: false,
    });
  }

  /**
   * Grabs the current user's cards from firebase
   * @param {firebaseUser} users
   */
  getUserCards(users) {
    let cardCollected = [];
    let cards = users[this.props.userUID].cards;
    for (let card in cards) {
      let commentNumber = this.countComments(cards[card].comments);
      cardCollected.push({
        id: card,
        background: cards[card].imgOption,
        text: cards[card].text,
        comments: cards[card].comments,
        numComments: commentNumber,
        timestamp: cards[card].timestamp,
        tag: cards[card].tag,
      });
    }
    this.setState({
      cards: cardCollected,
      isLoading: false,
    });
  }

  /**
   * Displays appropriate cards depending on pages
  */
  componentDidMount() {
    dbRef.child("User").on("value", (snap) => {
      const users = snap.val();
      if (this.props.from === "dashboard") {
        this.getUserCards(users);
      } else {
        this.getCards(users);
      }
    });
  }

  /**
   * Updates the board when a tag is clicked to sort the cards
  */
  static getDerivedStateFromProps(props, state) {
    return { tag: props.tag };
  }

  /**
   * Returns the Google UID of card owner
   * @param {string} cardId an id of the card
   */
  getCardOwner = (cardId) => {
    let cardOwnerUID;
    dbRef.child("User").on("value", (snap) => {
      const users = snap.val();
      for (let user in users) {
        let cards = users[user].cards;
        for (let card in cards) {
          if (card === cardId) {
            cardOwnerUID = user;
          }
        }
      }
    });
    return cardOwnerUID;
  };

  /**
   * counts the number of comments a user has.
   * @param {Object} cardCommentObj a card comment object stored in user
   */
  countComments = (cardCommentObj) => {
    // count comments under each card
    let cardComment = cardCommentObj;
    let commentNumber = 0;
    if (cardComment != null) {
      //count and increment commentNumber
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
              tag: cards[card].tag,
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
            tag: cards[card].tag,
          });
        }
      }
    }
    this.sortByTimestamp(cardCollected);
    return cardCollected;
  }

  /**
   * Sorts cards from users by timestamp
   * @param {Object} cardCollected a list of all cards from iterating through all users
   */
  sortByTimestamp(cardCollected) {
    cardCollected.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });
    return cardCollected;
  }

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
            {this.props.from === "dashboard"
              ? Array.from(this.sortByTimestamp(this.state.cards)).map((card) => (
                  <div key={card.id}>
                    <MyCard
                      clickable={true}
                      key={card.id}
                      id={card.id}
                      background={card.background}
                      text={card.text}
                      commentCount={card.numComments}
                      tag={card.tag}
                      timestamp={card.timestamp}
                      cardOwnerUID={this.getCardOwner(card.id)}
                    />
                  </div>
                ))
              : Array.from(this.sortByTag()).map((card) => (
                  <div key={card.id}>
                    <MyCard
                      clickable={true}
                      key={card.id}
                      id={card.id}
                      background={card.background}
                      text={card.text}
                      commentCount={card.numComments}
                      tag={card.tag}
                      timestamp={card.timestamp}
                      cardOwnerUID={this.getCardOwner(card.id)}
                    />
                  </div>
                ))}
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
