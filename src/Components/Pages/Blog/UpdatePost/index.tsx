import { PathNameFinder } from "@/Helper/PathNameFinder";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import PageBody from "./PostBody";

export interface UpdatePostProps {
  slug: string;
}

const UpdatePage = ({ slug }: UpdatePostProps) => {
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
              <PageBody slug={slug} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePage;
