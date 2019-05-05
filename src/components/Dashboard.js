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
    console.log("Soon available! Please be patient.");
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
                  <Button color="primary" onClick={this.connect}>Connect</Button>{' '}
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
