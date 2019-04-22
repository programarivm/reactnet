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
import { Link, Route } from 'react-router-dom';
import { Dashboard } from "./Dashboard.js";
import { All as AllIPs } from "./IPs/All.js";
import { Destination as DestinationIPs } from "./IPs/Destination.js";
import { Source as SourceIPs } from "./IPs/Source.js";
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
          <NavbarBrand href="/"><b>reactnet</b></NavbarBrand>
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
                  <DropdownItem tag={Link} to="/ips/all">
                    All
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem tag={Link} to="/ips/source">
                    Source
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/ips/destination">
                    Destination
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
                  <DropdownItem divider />
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
        <Route path="/ips/all" component={AllIPs}  />
        <Route path="/ips/source" component={SourceIPs}  />
        <Route path="/ips/destination" component={DestinationIPs}  />
        <Route
          path="/protocols/all"
          render={(props) => <AllProtocols stats={this.props.stats} {...props} />}
        />
      </div>
    );
  }
}

export { NavBar };
