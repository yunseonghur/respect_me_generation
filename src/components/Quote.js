import React, { Component } from "react";
import '../components/Quote.css';
import axios from 'axios';


class Quote extends Component {

    state = {
        quoteText: "",
        quoteAuthor: ""
    }

    getQuotes() {
        axios.get('https://quotes.rest/qod?category=inspire&language=en')
          .then(res => {
            console.log(res.data.contents);

            let quoteObject = res.data.contents.quotes[0];
            console.log("object: " + quoteObject);

            let text = quoteObject.quote;
            console.log("text: " + text);

            let author = quoteObject.author;
            console.log("author: " + author);

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