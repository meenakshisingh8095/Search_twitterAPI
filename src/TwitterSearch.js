import React from "react";
import axios from 'axios';
import { Tweet } from 'react-twitter-widgets'

export default class TwitterSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
      results: {},
      loading: false
    };
  }
  fetchSearchResults = (textSearch) => {
    const searchUrl = `https://api.twitter.com/1.1/search/tweets.json?q=${textSearch}`;

    axios.get(searchUrl, { headers: { Authorization: 'ACCESS_TOKEN' } })
      .then(res => {
        console.log("ress", res)
        this.setState({
          results: res.data,
          loading: false
        })
      })
      .catch(error => {
        console.error(error)
      })
  };

  handleTextChange = async e => {
    let textSearch = this.state.textSearch;
    e.preventDefault();
    this.setState({ textSearch: e.target.value, loading: true });
  };

  handleSearch = async e => {
    e.preventDefault();
    let textSearch = this.state.textSearch;
    if (!textSearch) {
      this.setState({ textSearch: " ", results: {} });
    } else {
      this.setState({ textSearch: " ", loading: true }, () => {
        this.fetchSearchResults(textSearch);
      });
    }
  };

  render() {
    let textSearch = this.state.textSearch;
    return (
      <div>
        <div className="d-flex flex-row justify-content-center input-group">
          <input
            type="text"
            className="col-md-5 form-control"
            value={textSearch}
            onChange={e => this.handleTextChange(e)}
            placeholder="Search here..."
          />
          <div className="input-group-btn">
            <button
              style={{ height: 40 }}
              className="btn btn-info"
              onClick={e => this.handleSearch(e)}
              type="button"
            >
              Search
          </button>
          </div>
        </div>
        {this.state.results.search_metadata && <div className="h4 mt-3 text-center">
          Searched Keyword {this.state.results.search_metadata.query}
        </div>}

        <div className="d-flex flex-column align-items-center mt-4">
          {this.state.results.statuses && this.state.results.statuses.map((tweet, index) => {
            return (<Tweet tweetId={tweet.id_str} key={index} />)
          })}
        </div>
      </div>
    );
  }
}