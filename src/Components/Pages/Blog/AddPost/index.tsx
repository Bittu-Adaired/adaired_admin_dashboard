"use client";
import { PathNameFinder } from "@/Helper/PathNameFinder";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import PostBody from "./PostBody";

const AddPostContainer = () => {
  const pathName = PathNameFinder();
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>{pathName.Last}</h5>
            </CardHeader>
            <CardBody>
              <PostBody />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPostContainer;
