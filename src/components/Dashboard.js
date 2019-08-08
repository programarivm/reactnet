import AppActions from '../actions/AppActions.js';
import AppStore from '../stores/AppStore.js';
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
  connect() {
    AppActions.connect();
  }

  disconnect() {
    AppActions.disconnect();
  }

  render() {
    let button;
    if (!AppStore.getState().connected) {
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
