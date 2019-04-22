import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col
} from 'reactstrap';
import {HorizontalBar} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [1, 10, 100, 200, 300, 400, 500]
    }
  ]
};

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
              <HorizontalBar data={data} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { All };
