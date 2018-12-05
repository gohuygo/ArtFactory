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
    drizzleState: null,
    account: null,
  }

  componentWillMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({
          loading: false,
          account: drizzleState.accounts[0],
          drizzleState
        });
      }
    });
  }

  // TODO: Move to pure component
  renderDimmer = (loading) => {
    if(loading){
      return(
        <Dimmer active inverted>
          <Loader inverted>Loading Web3, accounts, and contracts...</Loader>
        </Dimmer>
      )
    }
  }

  render() {
    const { loading, account } = this.state

    if(loading)
      return "Loading Web3, accounts, and contracts...";

    return (
      <Router>
        <Layout account={account} drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} >
          {this.renderDimmer(loading)}

          <Route exact path="/" render={ (props) => <LandingPage drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />} />
        </Layout>
      </Router>
    );
  }
}

export default App;
