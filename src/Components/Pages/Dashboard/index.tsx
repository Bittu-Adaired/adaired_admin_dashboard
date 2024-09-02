import React from "react";
import { Container, Row } from "reactstrap";
import UserInfo from "./UserInfo";

const Dashboard = () => {
  return (
    <Container fluid className="default-dashboard">
      <Row className="widget-grid">
        <UserInfo />
      </Row>
    </Container>
  );
};

export default Dashboard;
