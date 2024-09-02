"use client";
import PageLeftSidebar from "./PageLeftSidebar";
import PageTabContent from "./PageTabContent";
import { Row } from "reactstrap";

const PageBody = () => {
  return (
    <Row className="g-xl-5 g-3">
      <PageLeftSidebar />
      <PageTabContent />
    </Row>
  );
};

export default PageBody;
