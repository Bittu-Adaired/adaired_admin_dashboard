import { PathNameFinder } from "@/Helper/PathNameFinder";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import PageBody from "./PageBody";

const AddPage = ({ id }: { id: string }) => {
  const pathName = PathNameFinder();
  return (
    <Container fluid>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <h5>{pathName.Last}</h5>
            </CardHeader>
            <CardBody>
              <PageBody id={id} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPage;
