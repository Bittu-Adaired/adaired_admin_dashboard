import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Plus, Trash } from "react-feather";
import {
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Collapse,
} from "reactstrap";
import { BodyDataItem } from "@/Components/Miscellaneous/Page/AddPage/PageBody/PageTabContent";

type FAQ = {
  question: string;
  answer: string;
};

type FaqComponentProps = {
  component: string;
  index: number;
  handleInputChange: (
    component: string,
    index: number,
    inputName: string,
    value: any
  ) => void;
  bodyData: BodyDataItem[];
};

const FAQ: React.FC<FaqComponentProps> = ({
  component,
  index,
  handleInputChange,
  bodyData,
}) => {
  const [isActivity, setIsActivity] = useState(false);
  const [faq, setFaq] = useState<FAQ[]>([{ question: "", answer: "" }]);

  useEffect(() => {
    handleInputChange(component, index, "faq", faq);
  }, [faq]); // Only re-run the effect if 'faq' changes

  const addFaqField = () => {
    setFaq([...faq, { question: "", answer: "" }]);
  };

  const removeFaqField = (idx: number) => {
    const updatedFAQ = [...faq];
    updatedFAQ.splice(idx, 1);
    setFaq(updatedFAQ);
  };

  const handlefaqChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ) => {
    const { name, value } = e.target;
    const updatedFAQ = [...faq];
    updatedFAQ[idx] = {
      ...updatedFAQ[idx],
      [name]: value,
    };
    setFaq(updatedFAQ);
  };

  const toggleAccordion = () => {
    setIsActivity(!isActivity);
  };

  return (
    <Row className="default-according style-1 faq-accordion">
      <Col>
        {faq.map((item, idx) => (
          <div key={idx}>
            <Card className="shadow-none">
              <CardHeader>
                <div className="btn-link collapsed justify-content-between">
                  <Input
                    type="text"
                    placeholder="Question"
                    name="question"
                    value={item.question}
                    onChange={(e) => handlefaqChange(e, idx)}
                    className="w-100"
                  />
                  <span className="d-flex align-items-center">
                    {isActivity ? (
                      <ChevronDown
                        className="position-relative inset-0 ml-5"
                        onClick={toggleAccordion}
                      />
                    ) : (
                      <ChevronUp
                        className="position-relative inset-0 ml-5"
                        onClick={toggleAccordion}
                      />
                    )}
                    <Plus onClick={addFaqField} />
                    <Trash onClick={() => removeFaqField(idx)} />
                  </span>
                </div>
              </CardHeader>
              <Collapse isOpen={isActivity}>
                <CardBody>
                  <Input
                    type="textarea"
                    placeholder="Answer"
                    rows={3}
                    name="answer"
                    value={item.answer}
                    onChange={(e) => handlefaqChange(e, idx)}
                  />
                </CardBody>
              </Collapse>
            </Card>
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default FAQ;
