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
      <div className="quote">
        <blockquote className="quote__block">
          <div className="quote__symbol">"</div>
          <div className="quote__text">
            {this.state.quoteText}
          </div>
          <footer className="quote__footer">
            <cite className="quote__author" title="Source Title">{this.state.quoteAuthor}</cite>
          </footer>
        </blockquote>
      </div>
    );
  }
}

export default Quote;