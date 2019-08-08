import AppActions from '../actions/AppActions.js';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Container,
  Row,
  Col
} from 'reactstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
    }
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  connect() {
    AppActions.connect();
    this.setState({
      connected: true
    });
  }

  disconnect() {
    AppActions.disconnect();
    this.setState({
      connected: false
    });
  }

  render() {
    let button;
    if (!this.state.connected) {
      button = <Button color="primary" onClick={this.connect}>Connect</Button>;
    } else {
      button = <Button color="primary" onClick={this.disconnect}>Disconnect</Button>;
    }
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Breadcrumb className="mt-3">
                <BreadcrumbItem active>Dashboard</BreadcrumbItem>
              </Breadcrumb>
              <Card body>
                <Col lg="12">
                  {button}
                </Col>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { Dashboard };
