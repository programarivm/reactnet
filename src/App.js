import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import { Dashboard } from "./components/Dashboard.js";
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><b>nonet</b></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/dashboard">
                    Dashboard
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    IPs
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Source
                    </DropdownItem>
                    <DropdownItem>
                      Destination
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Protocols
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Protocol 1
                    </DropdownItem>
                    <DropdownItem>
                      Protocol 2
                    </DropdownItem>
                    <DropdownItem>
                      ...
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
          <Route path="/dashboard" component={Dashboard}  />
        </div>
      );
    }
}

export default App;
