import React, { Component } from "react";
import '../components/Quote.css';


class Quote extends Component {

    render() {
        return (
            <div className="quote-section">
                <blockquote className="blockquote mb-0">
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                        erat a ante.
                    </div>
                    <footer className="blockquote-footer">
                        <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
            </div>
        );
    }
}

export default Quote;