import React from "react";
import { Container, Row } from "reactstrap";
import RecentCustomers from "./RecentCustomers";

const Dashboard = () => {
  return (
    <Container fluid className="dashboard-3">
      <Row>
        <RecentCustomers />
      </Row>
    </Container>
  );
};

export default Dashboard;
