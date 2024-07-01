import { Card, CardBody, Col } from "reactstrap";
import { Href, ImagePath, RecentCustomer } from "@/Constant";
import Image from "next/image";
import Link from "next/link";

const RecentCustomers = () =>{
    return(
        <Col xl="3" lg="5" sm="6">
            <Card>
                <CardBody className="pt-0">
                    <ul className="recent-customers">
                        hello there
                    </ul>
                </CardBody>
            </Card>
        </Col>
    )
}
export default RecentCustomers;