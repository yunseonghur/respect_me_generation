import React from 'react';
import "./ResourceImage.css";
import Image from 'react-bootstrap/Image';

/**
 * Represent an entry consist of an image and a caption for each article
 * @param {string} link link to the article
 * @param {string} image image displayed with article
 * @param {string} title subtitle of the article, displayed under image
 */
const ResourceImage = (props) => {
  return (
    <div className="resource-image">
      <a className="resource-image__link" href={props.link} target="blank">
        <Image className="resource-image__img" src={props.image} alt={props.title} rounded />
        <p className="resource-image__title">{props.title}</p>
      </a>
    </div>
  )
}

export default ResourceImage;