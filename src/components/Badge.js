import React from 'react';
import "./Badge.css";

const Badge = (props) => {
  return (
    <div className="badge">
      <img className="badge_img" src={props.src} alt={props.title}></img>    
      <p className="badge_title">{props.title}</p>    
    </div>
  );
}

export default Badge; 