import React, { Component } from "react";
import '../components/Quote.css';
import axios from 'axios';

/**
 * Quote API that is called in Home.js
 * API: https://quotes.rest/
 */
class Quote extends Component {

    state = {
        quoteText: "",
        quoteAuthor: ""
    }

    /**
     * Gets daily quote
     */
    getQuotes() {
        axios.get('https://quotes.rest/qod?category=inspire&language=en')
          .then(res => {

            let quoteObject = res.data.contents.quotes[0];
            let text = quoteObject.quote;
            let author = quoteObject.author;

            this.setState({ 
                quoteText: text,
                quoteAuthor: author
            });
        });
    }

    componentDidMount() {
        this.getQuotes();
    }

    render() {
        return (
            <div className="quote-section">
                <blockquote className="blockquote mb-0">
                    <div id="quoteSym">"</div>
                    <div className="quote">
                        {this.state.quoteText}
                    </div>
                    <footer className="blockquote-footer">
                    <cite title="Source Title" className="author">{this.state.quoteAuthor}</cite>
                    </footer>
                </blockquote>
            </div>
        );
    }
}

export default Quote;