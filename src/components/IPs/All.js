import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col
} from 'reactstrap';
import {Polar} from 'react-chartjs-2';

class All extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Breadcrumb className="mt-3">
                <BreadcrumbItem>IPs</BreadcrumbItem>
                <BreadcrumbItem active>All</BreadcrumbItem>
              </Breadcrumb>
              <Polar data={this.props.stats.ips.chart.occurrences} redraw />
              </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { All };
