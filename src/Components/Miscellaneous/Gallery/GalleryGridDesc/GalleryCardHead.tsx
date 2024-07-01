import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { GalleryGridWithDescriptions, UploadNewImage } from "@/Constant";
import Link from "next/link";
import { CheckCircle, Info, PlusSquare, Target } from "react-feather";
import {
  Button,
  Card,
  Col,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";

type Props = {};

const GalleryCardHead = (props: Props) => {
  return (
    <Card>
      <Row>
        <Col md="6">
        <Nav tabs className="border-tab" id="top-tab">
          <NavItem>
            <NavLink>Gallery</NavLink>
          </NavItem>
          </Nav>
        </Col>
        <Col md="6" className="common-space nav-right">
          <Link className="btn btn-primary" href={`/gallery/upload_images`}>
            <PlusSquare />
            {UploadNewImage}
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default GalleryCardHead;
