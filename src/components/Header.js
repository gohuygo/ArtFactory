import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react';

// The Header creates links that can be used to navigate
// between routes.
const MenuWrapper = styled.div`
  border-bottom: 1px solid #e6e4e4;
`
const Logo = styled.p`
  font-size:20px;
  color: black;
  text-decoration: none;
`

class Header extends Component {
  render() {
    return(
      <div>
        <MenuWrapper>
          <Menu secondary size="large">
            <Menu.Item>
              <a href="/">
                <Logo>ArtFactory</Logo>
              </a>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item onClick={this.OnAccountNumberClick}>{"0x1234"}</Menu.Item>
            </Menu.Menu>
          </Menu>
        </MenuWrapper>
      </div>
    )
  }
}


export default Header
