"use client";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { PostEdit } from "@/Constant";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { FormPost } from "./FormPost";

const AddPostContainer = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={PostEdit} />
            <CardBody className="add-post">
              <FormPost onSubmit={onSubmit} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPostContainer;
