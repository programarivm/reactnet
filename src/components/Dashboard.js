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

    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  handleConnect() {
    this.props.onConnect();
  }

  handleDisconnect() {
    this.props.onDisconnect();
  }

  render() {
    let button;
    if (!this.props.state.connected) {
      button = <Button color="primary" onClick={this.handleConnect}>Connect</Button>;
    } else {
      button = <Button color="primary" onClick={this.handleDisconnect}>Disconnect</Button>;
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
