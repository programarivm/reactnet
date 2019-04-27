import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col,
  Table
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
              <Row>
                <Col lg="4">
                  <Table>
                    <thead>
                      <tr>
                        <th>IP</th>
                        <th>Occurrences</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                          Object.keys(this.props.stats.ips.history).map((item, index) => {
                            let occurrences = 'foo';
                            return (<tr key={index}>
                              <td>{item}</td>
                              <td>{this.props.stats.ips.history[item]}</td>
                            </tr>)
                          })
                        }
                    </tbody>
                  </Table>
                </Col>
                <Col lg="8">
                  <Polar data={this.props.stats.ips.chart.occurrences} redraw />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { All };
