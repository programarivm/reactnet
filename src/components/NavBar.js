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
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggle() {
    if (this._isMounted) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
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
          render={(props) => <Dashboard {...props} />}
        />
        <Route
          path="/ips/v4"
          render={(props) => <Ipv4 {...props} />}
        />
        <Route
          path="/ips/v6"
          render={(props) => <Ipv6 {...props} />}
        />
        <Route
          path="/protocols/all"
          render={(props) => <AllProtocols {...props} />}
        />
      </div>
    );
  }
}

export { NavBar };
