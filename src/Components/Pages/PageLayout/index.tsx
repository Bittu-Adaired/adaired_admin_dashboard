"use client";
import { PathNameFinder } from "@/Helper/PathNameFinder";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

interface PageLayoutProps {
  LeftSidebar: React.ReactNode;
  TabContent: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ LeftSidebar, TabContent }) => {
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
              <Row className="g-xl-5 g-3">
                {LeftSidebar}
                {TabContent}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PageLayout;
