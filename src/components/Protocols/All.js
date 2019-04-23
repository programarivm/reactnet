import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col
} from 'reactstrap';
import {HorizontalBar} from 'react-chartjs-2';

class All extends React.Component {
  ProtocolTree(props) {
    const protocols = props.stats.protocols.tshark;
    const items = protocols.map((protocol) =>
      <li>{protocol.name}</li>
    );
    return (
      <ul>{items}</ul>
    );
  }


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
              <Row>
                <Col lg="4">
                  <ul>
                    {
                      this.props.stats.protocols.tshark.map(function(item, index) {
                        return (<li>{'--'.repeat(item.level)} {item.name}</li>)
                      })
                    }
                  </ul>
                </Col>
                <Col lg="8">
                  <HorizontalBar data={this.props.stats.protocols.chart.bytes} redraw />
                  <HorizontalBar data={this.props.stats.protocols.chart.frames} redraw />
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
