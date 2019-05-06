import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Container,
  Row,
  Col
} from 'reactstrap';
import {HorizontalBar} from 'react-chartjs-2';

class All extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Breadcrumb className="mt-3">
                <BreadcrumbItem>Protocols</BreadcrumbItem>
                <BreadcrumbItem active>All</BreadcrumbItem>
              </Breadcrumb>
              <Card body>
                <h4>Protocol tree</h4>
                <p>Protocol hierarchy statistics listing both number of packets and bytes.</p>
                <Row>
                  <Col lg="4">
                    <ul className="protocol-tree">
                      {
                        this.props.state.protocols.tshark.map(function(item, index) {
                          return (<li key={index}>{'--'.repeat(item.level)} {item.name}</li>)
                        })
                      }
                    </ul>
                  </Col>
                  <Col lg="8">
                    <HorizontalBar data={this.props.state.protocols.chart.bytes} redraw />
                    <HorizontalBar data={this.props.state.protocols.chart.frames} redraw />
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

export { All };
