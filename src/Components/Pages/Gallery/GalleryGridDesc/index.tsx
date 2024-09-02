"use client";
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { DescriptionMyGallery } from "./DescriptionMyGallery";
import GalleryCardHead from "./GalleryCardHead";

const GalleryDridDescContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col md="12" className="project-list">
          <GalleryCardHead />
        </Col>
        <Col sm="12">
          <Card>
            <CardBody className="my-gallery gallery-with-description p-3">
              <Row>
                <DescriptionMyGallery />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GalleryDridDescContainer;
