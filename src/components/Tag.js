import React from 'react';
import './Tag.css'
import { Nav, Col, Button } from 'react-bootstrap';


class Tag extends React.Component{

    // TODO: Add click event handling
    render() {
        return (
            // <a className="btn btn-info btn-xs">{this.props.tagName}</a>
            // <Col>
            //     <Nav.Item>
            //         <Nav.Link eventKey={this.props.name} name={this.props.name}>{this.props.name}</Nav.Link>
            //     </Nav.Item>
            // </Col>
            <Button variant="outline-primary" className="rounded-pill">{this.props.name}</Button>
        )}
}

export default Tag;