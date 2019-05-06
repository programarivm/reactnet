import React from 'react';
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
import { Link, Route, Redirect } from 'react-router-dom';
import { Dashboard } from "./Dashboard.js";
import { V4 as Ipv4 } from "./IPs/V4.js";
import { V6 as Ipv6 } from "./IPs/V6.js";
import { All as AllProtocols } from "./Protocols/All.js";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleConnect() {
    this.props.onConnect();
  }

  handleDisconnect() {
    this.props.onDisconnect();
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/dashboard">
            <b>ReactNet</b>
          </NavbarBrand>
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
                  IP
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/ips/v4">
                    IPv4
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/ips/v6">
                    IPv6
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Protocols
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/protocols/all">
                    All
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
        <Route
          path="/dashboard"
          render={(props) => <Dashboard onConnect={this.handleConnect} onDisconnect={this.handleDisconnect} state={this.props.state} {...props} />}
        />
        <Route
          path="/ips/v4"
          render={(props) => <Ipv4 state={this.props.state} {...props} />}
        />
        <Route
          path="/ips/v6"
          render={(props) => <Ipv6 state={this.props.state} {...props} />}
        />
        <Route
          path="/protocols/all"
          render={(props) => <AllProtocols state={this.props.state} {...props} />}
        />
      </div>
    );
  }
}

export { NavBar };
