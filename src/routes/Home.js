import React from 'react';
import "./Home.css";
import fire from '../fire.js';
import Quote from '../components/Quote';
import HomeResourceEntry from '../components/HomeResourceEntry';
import ARTICLES from '../components/ResourceArticles';
import MiniBoard from '../components/MiniBoard';


const dbRef = fire.database().ref();

class Home extends React.Component{
    state = { 
        message: "",
        cards: [], 
        studyResources: [],
        healthResources: [],
        relationshipResources: []
    };

    // Get current year, month, date to get a daily message from database
    getDailyMessage(){
        var year = new Date().getFullYear();
        var month = new Date().getMonth(); // Jan:0 ~ Dec:11
        var date = new Date().getDate();
        dbRef.child('Messages').orderByKey().on('value', snap => {
            const messages = snap.val();
            this.setState({
                message: messages[year][month][date]
            });
            console.log(this.state.message) // Testing: print proper daily message
        });
    }
    // Get all cards from the users
    async getCards(users){
        let cardsCollected = [];
        for (let user in users){
            let cards = users[user].cards
            for (let card in cards){
                // Store comments as well if exist
                if (cards[card]['comments']!=null){
                    cardsCollected.push({
                        id: card,
                        background: cards[card].imgOption,
                        text: cards[card].text,
                        comments: cards[card].comments
                    });
                } else {
                    cardsCollected.push({
                        id: card,
                        background: cards[card].imgOption,
                        text: cards[card].text
                    });
                }
            }
        }
        // If the number of total cards is less than 3, display them all
        if(cardsCollected.length <= 3){
            this.setState({ cards: cardsCollected });
            console.log(cardsCollected) // Testing: print all cards stored in the database
            // Else pick top 3 cards
        } else {
        await this.pickTopThreeCards(cardsCollected);
        }
    }
    // Count the number of comments for each card and pick top 3
    pickTopThreeCards(cardsCollected){
        let cardsPicked = [];
        let candidates = [];
        for(let card in cardsCollected){
            if(cardsCollected[card]['comments']!=null){
                candidates.push(cardsCollected[card])
                candidates.push(Object.keys(cardsCollected[card]['comments']).length)
            }
        }
        let first = -1
        let second = -1
        let third = -1
        let firstCard, secondCard, thirdCard
        for(var i=1; i<candidates.length; i+=2){
            /* If current element is greater than first*/
            if (candidates[i] > first){ 
                third = second; 
                second = first; 
                first = candidates[i]; 
                // Keep track of their index
                thirdCard = secondCard;
                secondCard = firstCard;
                firstCard = i;
            /* If candidatesNumOfComments[i] is in between first and second then update second  */
            } else if (candidates[i] > second){ 
                third = second; 
                second = candidates[i]; 
                thirdCard = secondCard;
                secondCard = i;
            } else if (candidates[i] > third) 
                third = candidates[i]; 
                thirdCard = i;
        }
        // store the most popular card
        cardsPicked.push({
            id: candidates[firstCard-1]['id'],
            background: candidates[firstCard-1]['background'],
            text: candidates[firstCard-1]['text'],
        });
        // store the second most popular card
        cardsPicked.push({
            id: candidates[secondCard-1]['id'],
            background: candidates[secondCard-1]['background'],
            text: candidates[secondCard-1]['text'],
        });
        // store the third most popular card
        cardsPicked.push({
            id: candidates[thirdCard-1]['id'],
            background: candidates[thirdCard-1]['background'],
            text: candidates[thirdCard-1]['text'],
        });
        this.setState({ cards: cardsPicked });
    }

    // Read resource entries from the given article list to display by tag
    getResourceEntries(){
        var resources = []
        ARTICLES.map(ARTICLE => {
            resources.push({
                id: ARTICLE.id,
                title: ARTICLE.title,
                image: ARTICLE.image,
                tag: ARTICLE.tag,
                link: ARTICLE.link
            });
            return null; 
        })
        let studyEntries = []
        let healthEntries = []
        let relationshipEntries = []
        for (let entry in resources){
            if (resources[entry].tag === "study"){
                studyEntries.push(resources[entry])
            } else if (resources[entry].tag === "health"){
                healthEntries.push(resources[entry])
            } else if (resources[entry].tag === "relationship"){
                relationshipEntries.push(resources[entry])
            } else {
                console.log("Cannot find the tag")
            }
        }
        return ( 
            <div>
                <HomeResourceEntry tagName="study" resourcesEntries={studyEntries} /> 
                <HomeResourceEntry tagName="health" resourcesEntries={healthEntries} /> 
                <HomeResourceEntry tagName="relationship" resourcesEntries={relationshipEntries} /> 
            </div>
        );
    }


    componentDidMount(){
        // this.getDailyMessage();
        // Get all users to collect their cards
        dbRef.child('User').on('value', snap => {
            const users = snap.val();
            this.getCards(users);
        });
    }

    render(){
        return (
            <div className="wrapper">
                <Quote />

                <div className="card-section">
                    <h2>COMMUNITY BOARD</h2>
                    <p>What is your community talking about today?</p>
                    <MiniBoard />
                </div>

                <div className="resource-section">
                    {this.getResourceEntries()}
                </div>
            </div>
        );
    }
}

export default Home;