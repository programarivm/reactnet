import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col
} from 'reactstrap';
import {Doughnut} from 'react-chartjs-2';

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
              <Doughnut data={this.props.stats.ips.chart.src} redraw />
              <Doughnut data={this.props.stats.ips.chart.dest} redraw />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { All };
