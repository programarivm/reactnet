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
import {HorizontalBar, Polar} from 'react-chartjs-2';

const polar = {
  animation: {
    animateRotate: false,
    animateScale: true,
    easing: 'easeOutQuad'
  }
};

const horizontalBar = {
  aspectRatio: 1
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
                            Object.keys(this.props.stats.ips.v6.chart.occurrences.history).map((item, index) => {
                              return (<tr key={index}>
                                <td>{item}</td>
                                <td>{this.props.stats.ips.v6.chart.occurrences.history[item]}</td>
                              </tr>)
                            })
                          }
                      </tbody>
                    </Table>
                  </Col>
                  <Col lg="8">
                    <Polar data={this.props.stats.ips.v6.chart.occurrences} options={polar} redraw />
                  </Col>
                </Row>
              </Card>
              <Card body className="mt-3">
                <h4>Endpoints</h4>
                <p>Endpoints that can be seen in the capture ordered by number of bytes.</p>
                <Row>
                  <Col lg="12">
                    <HorizontalBar data={this.props.stats.ips.v6.chart.endpoints} height={350} width={null} options={horizontalBar} redraw />
                  </Col>
                  <Col lg="12" className="ip-endpoints">
                    <Table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>IP</th>
                          <th>Packets</th>
                          <th>Bytes</th>
                          <th>TX packets</th>
                          <th>TX bytes</th>
                          <th>RX packets</th>
                          <th>RX bytes</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            this.props.stats.ips.v6.chart.endpoints.history.map((item, index) => {
                              return (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.ip}</td>
                                <td>{item.packets}</td>
                                <td>{item.bytes}</td>
                                <td>{item.tx_packets}</td>
                                <td>{item.tx_bytes}</td>
                                <td>{item.rx_packets}</td>
                                <td>{item.rx_bytes}</td>
                              </tr>)
                            })
                          }
                      </tbody>
                    </Table>
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
