import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import { V4 as Ipv4 } from "./IPs/V4.js";
import { V6 as Ipv6 } from "./IPs/V6.js";
import { All as AllProtocols } from "./Protocols/All.js";

class NavBar extends React.Component {
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
          <NavbarBrand href="/"><b>ReactNet</b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
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
        <Route
          path="/ips/v4"
          render={(props) => <Ipv4 stats={this.props.stats} {...props} />}
        />
        <Route
          path="/ips/v6"
          render={(props) => <Ipv6 stats={this.props.stats} {...props} />}
        />
        <Route
          path="/protocols/all"
          render={(props) => <AllProtocols stats={this.props.stats} {...props} />}
        />
      </div>
    );
  }
}

export { NavBar };
