import React from 'react';
import TwitterSearch from './TwitterSearch';

class App extends React.Component {
  render() {
    return (
      <div>
        <i className="fa fa-twitter mx-3 mt-2" style={{ fontSize: "60px", color: "#00acee" }}></i>
        <TwitterSearch />
      </div>

    );
  }
}


export default App;
