import { useAppSelector } from "@/Redux/Hooks";
import React from "react";
import { Card, CardBody, Col, Collapse, Input, Row } from "reactstrap";

export const CollapseFilterData = () => {
  // const { filterToggle } = useAppSelector((state) => state.product);

  return (
    <Collapse
    //  isOpen={filterToggle}
    >
      <Card className="shadow-none">
        <CardBody className="list-product-body">
          <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
            {FiltersData.map((item, index) => (
              <Col key={index}>
                <Input type="select">
                  <option selected>{item.name}</option>
                  {item.options.map((data, optionIndex) => (
                    <option key={optionIndex} value={optionIndex + 1}>
                      {data}
                    </option>
                  ))}
                </Input>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Collapse>
  );
};

export const FiltersData = [
  {
    name: "Choose Product",
    options: [
      "Apple iphone 13 Pro",
      "Wood Chair",
      "M185 Compact Wireless Mouse",
    ],
  },
  {
    name: "Choose Category",
    options: ["Furniture", "Smart Gadgets", "Electrics"],
  },
  {
    name: "Choose Sub Category",
    options: ["Smart Phones", "Smart Watches", "Wireless headphone"],
  },
  {
    name: "Status",
    options: ["Sold Out", "In Stock", "Pre Order", "Limited Stock"],
  },
  {
    name: "Price",
    options: ["56000.00", "19000.00", "10000.00", "15000.00", "99000.00"],
  },
];
