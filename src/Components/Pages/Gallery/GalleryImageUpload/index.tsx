"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { UploadImages } from "@/Constant";
import ImageUploadBody from "./ImageUploadBody";

const GalleryImageUploadContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={UploadImages} />
            <CardBody>
              <ImageUploadBody />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GalleryImageUploadContainer;
