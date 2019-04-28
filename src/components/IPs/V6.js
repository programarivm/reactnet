import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';
import {Polar} from 'react-chartjs-2';

const options = {
  animation: {
    animateRotate: false,
    animateScale: true,
    easing: 'easeOutQuad'
  }
};

class V6 extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Breadcrumb className="mt-3">
                <BreadcrumbItem>IP</BreadcrumbItem>
                <BreadcrumbItem active>IPv6</BreadcrumbItem>
              </Breadcrumb>
              <Card body>
                <h4>Occurrences</h4>
                <p>The number of times that IPv6 addresses appear in the network traffic capture.</p>
                <Row>
                  <Col lg="4" className="ip-occurrences">
                    <Table>
                      <thead>
                        <tr>
                          <th>IP</th>
                          <th>Occurrences</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            Object.keys(this.props.stats.ips.v6.history).map((item, index) => {
                              return (<tr key={index}>
                                <td>{item}</td>
                                <td>{this.props.stats.ips.v6.history[item]}</td>
                              </tr>)
                            })
                          }
                      </tbody>
                    </Table>
                  </Col>
                  <Col lg="8">
                    <Polar data={this.props.stats.ips.v6.chart.occurrences} options={options} redraw />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { V6 };
