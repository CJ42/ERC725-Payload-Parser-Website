import React, { Component } from "react";
import getWeb3 from "./hooks/getWeb3";

import "./App.css";

// layout
import Header from "./components/Header/Header";
import Body from "./Body";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null /*, contract: null */ };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      this.setState({ web3 });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to instantiate web3.`);
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3</div>;
    }
    return (
      <div className="App">
        <Header />
        <Body web3={this.state.web3} />
      </div>
    );
  }
}

export default App;
