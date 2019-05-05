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
  }

  handleConnect() {
    this.props.onConnect();
  }

  render() {
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
                  <Button color="primary" onClick={this.handleConnect}>Connect</Button>{' '}
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
