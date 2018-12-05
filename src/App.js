import React, { Component } from 'react';
import ArtFactoryBuilder from "./contracts/ArtFactoryBuilder.json";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from './components/Layout';
import LandingPage from './components/landing/Index';

import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import { Dimmer, Loader, Segment } from 'semantic-ui-react'


class App extends Component {
  state = {
    loading: true,
    account: null,
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const artFactoryBuilderContract = truffleContract(ArtFactoryBuilder);
      artFactoryBuilderContract.setProvider(web3.currentProvider);
      const contract = await artFactoryBuilderContract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract });
    } catch (error) {
      // Catch any errors for any of the above operations.
      //alert('Failed to load web3, accounts, or contract. Check console for details.');
      console.log(error);
    }
  };

  renderDimmer = () => {
    const { web3, accounts, contract } = this.state

    if(!web3 || accounts.length === 0 || !contract){
      return(
        <Dimmer active inverted>
          <Loader inverted>Loading Web3, accounts, and contracts...</Loader>
        </Dimmer>
      )
    }
  }

  render() {
    if(!this.state.web3)
      return null;

    return (
      <Router>
        <Layout account={this.state.account} >
          {this.renderDimmer()}

          <Route exact path="/" render={ (props) => <LandingPage />} />
        </Layout>
      </Router>
    );
  }
}

export default App;
