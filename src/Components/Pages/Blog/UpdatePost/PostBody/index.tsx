import PageLeftSidebar from "./PostLeftSidebar";
import PageTabContent from "./PostTabContent";
import { Row } from "reactstrap";
import { UpdatePostProps } from "../index";

const PageBody = ({ slug }: UpdatePostProps) => {
  return (
    <Row className="g-xl-5 g-3">
      <PageLeftSidebar />
      <PageTabContent slug={slug} />
    </Row>
  );
};

export default PageBody;
