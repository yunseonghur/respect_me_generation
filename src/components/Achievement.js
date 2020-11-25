import React, { Component } from "react";
import "./Achievement.css";
import fire from "../fire.js";
import Badge from '../components/Badge';


const dbRef = fire.database().ref();

class Achievement extends Component {
  state = {
    myBadges: [],
    totalBadgeCount: "0",
    myBadgeCount: ""
  };

  // Get current user's badges if exist
  componentDidMount(){
    dbRef.child('User').on('value', snap => {
      const userInfo = snap.val();
      this.getMyBadges(userInfo[this.props.userUID]['myBadges']);
    });
  }

  /**
   * Load the image of the current users's badges.
   */
  getMyBadges(myBadges) {
    let badgeImgArr = [];

    dbRef.child('Badges').on('value', snap => {
      const badgeRepo = snap.val();
      let badgeCount = 0;

      for (let id in badgeRepo){
        badgeCount++;
        // for (let index in myBadges){
        //   if(myBadges[index] === id) {
          for (let badgeID in myBadges){
            if(badgeID === id) {
            badgeImgArr.push({
              id,
              image: badgeRepo[id].image,
              tag: badgeRepo[id].tag,
              title: badgeRepo[id].title
            });
          }
        }
      }
      this.setState({ 
        myBadges: badgeImgArr,
        myBadgeCount: badgeImgArr.length,
        totalBadgeCount: badgeCount
      });
    });
  }

  render() {
    return (
      <div className="achievement">
        <div className="achievement__badges">
          <p className="achievement__badges--subtitle">BADGES</p>
        </div>
        <p className="achievement__badges--count">
          {this.state.myBadgeCount} of {this.state.totalBadgeCount} badges collected
        </p>
        <div className="achievement__badges--container">
          {this.state.myBadges !== undefined ?
            Array.from(this.state.myBadges).map((myBadge, index) =>  
              <Badge
                key={index} 
                src={myBadge.image}
                title={myBadge.title} />
              ) 
          : []}
        </div>
      </div>
    );
  }
}

export default Achievement;
