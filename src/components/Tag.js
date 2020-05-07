import React from 'react';
import './Tag.css'
import Button from 'react-bootstrap/Button';


class Tag extends React.Component{

    // TODO: Add click event handling
    render() {
        return (
            <a className="btn btn-info btn-xs">{this.props.tagName}</a>
        )}
}

export default Tag;