import PageLeftSidebar from "./PageLeftSidebar";
import PageTabContent from "./PageTabContent";
import { Row } from "reactstrap";

const PageBody = ({ id }: { id: string }) => {
  return (
    <Row className="g-xl-5 g-3">
      <PageLeftSidebar />
      <PageTabContent id={id} />
    </Row>
  );
};

export default PageBody;
