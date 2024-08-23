import PostLeftSidebar from "./PostLeftSidebar";
import { PostTabContent } from "./PostTabContent/PostTabContent";
import { Row } from "reactstrap";

const PageBody = () => {
  return (
    <Row className="g-xl-5 g-3">
      <PostLeftSidebar />
      <PostTabContent />
    </Row>
  );
};

export default PageBody;
