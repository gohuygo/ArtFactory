import React, { Component } from "react";
import Header from './Header'
import Main from './Main'
import Layout from './Layout'
import styled from 'styled-components'

import ArtFactoryBuilder from "../contracts/ArtFactoryBuilder.json";
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";


const AppWrapper = styled.div`
  text-align: center;
`
const Logo = styled.p`
  font-size:20px;
  color: black;
  text-decoration: none;
`

class App extends Component {
  state = {
    web3: null,
    accounts: null
  }

  constructor (props) {
    super(props)
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const artFactoryContract = truffleContract(ArtFactoryBuilder);
      artFactoryContract.setProvider(web3.currentProvider);
      const instance = await artFactoryContract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return(<div className="alert alert-info col-sm-12" role="alert">Loading Web3, accounts, and contract...</div>)
    }

    return (
    	<div className="App">
        <Layout>
        	<Header />
        	<Main />
        </Layout>
    	</div>
    )
  }

}

export default App
