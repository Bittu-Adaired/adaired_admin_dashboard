"use client";
import PageLeftSidebar from "./PageLeftSidebar";
import PageTabContent from "./PageTabContent";
import { Row } from "reactstrap";
import { UpdatePageProps } from "../index";

const PageBody = ({ slug }: UpdatePageProps) => {
  return (
    <Row className="g-xl-5 g-3">
      <PageLeftSidebar />
      <PageTabContent slug={slug} />
    </Row>
  );
};

export default PageBody;
