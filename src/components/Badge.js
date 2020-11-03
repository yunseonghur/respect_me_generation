import React from 'react';

const Badge = (props) => {
  return (
    <div className="badge">
      {/* badge image */}
      <img className="badge_img" src={props.src} alt={props.id}></img>    
    </div>
  );
}

export default Badge;