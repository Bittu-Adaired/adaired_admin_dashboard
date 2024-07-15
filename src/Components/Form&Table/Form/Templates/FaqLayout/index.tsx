// import React, { useState, useEffect } from "react";
// import { ChevronDown, ChevronUp, Plus, Trash } from "react-feather";
// import {
//   Input,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardHeader,
//   Collapse,
// } from "reactstrap";
// import { BodyDataItem } from "@/Types/PageBodyDataType";
// import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";

// type FAQ = {
//   question: string;
//   answer: string;
// };

// type FaqComponentProps = {
//   component: string;
//   index: number;
//   handleInputChange: (
//     component: string,
//     index: number,
//     inputName: string,
//     value: any
//   ) => void;
//   bodyData: BodyDataItem[];
// };

// const FAQ: React.FC<FaqComponentProps> = ({
//   component,
//   index,
//   handleInputChange,
//   bodyData,
// }) => {
//   const [faq, setFaq] = useState<FAQ[]>([{ question: "", answer: "" }]);
//   const [openIndexes, setOpenIndexes] = useState<boolean[]>([false]);

//   useEffect(() => {
//     handleInputChange(component, index, "faq", faq);
//   }, [faq]); // Only re-run the effect if 'faq' changes

//   const addFaqField = () => {
//     setFaq([...faq, { question: "", answer: "" }]);
//     setOpenIndexes([...openIndexes, false]);
//   };

//   const removeFaqField = (idx: number) => {
//     const updatedFAQ = [...faq];
//     const updatedOpenIndexes = [...openIndexes];
//     updatedFAQ.splice(idx, 1);
//     updatedOpenIndexes.splice(idx, 1);
//     setFaq(updatedFAQ);
//     setOpenIndexes(updatedOpenIndexes);
//   };

//   const handlefaqChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     idx: number
//   ) => {
//     const { name, value } = e.target;
//     const updatedFAQ = [...faq];
//     updatedFAQ[idx] = {
//       ...updatedFAQ[idx],
//       [name]: value,
//     };
//     setFaq(updatedFAQ);
//   };

//   const handleEditorChange = (value: string, idx: number) => {
//     const updatedFAQ = [...faq];
//     updatedFAQ[idx] = {
//       ...updatedFAQ[idx],
//       answer: value,
//     };
//     setFaq(updatedFAQ);
//   };

//   const toggleAccordion = (idx: number) => {
//     const updatedOpenIndexes = [...openIndexes];
//     updatedOpenIndexes[idx] = !updatedOpenIndexes[idx];
//     setOpenIndexes(updatedOpenIndexes);
//   };

//   return (
//     <Row className="default-according style-1 faq-accordion">
//       <Col>
//         {faq.map((item, idx) => (
//           <div key={idx}>
//             <Card className="shadow-none">
//               <CardHeader>
//                 <div className="btn-link collapsed justify-content-between">
//                   <Input
//                     type="text"
//                     placeholder="Question"
//                     name="question"
//                     value={item.question}
//                     onChange={(e) => handlefaqChange(e, idx)}
//                     className="w-100"
//                   />
//                   <span className="d-flex align-items-center">
//                     {openIndexes[idx] ? (
//                       <ChevronDown
//                         className="position-relative inset-0 ml-5"
//                         onClick={() => toggleAccordion(idx)}
//                       />
//                     ) : (
//                       <ChevronUp
//                         className="position-relative inset-0 ml-5"
//                         onClick={() => toggleAccordion(idx)}
//                       />
//                     )}
//                     <Plus onClick={addFaqField} />
//                     <Trash onClick={() => removeFaqField(idx)} />
//                   </span>
//                 </div>
//               </CardHeader>
//               <Collapse isOpen={openIndexes[idx]}>
//                 <CardBody>
//                   <Editor
//                     value={item.answer}
//                     onBlurEditor={(value) => handleEditorChange(value, idx)}
//                   />
//                 </CardBody>
//               </Collapse>
//             </Card>
//           </div>
//         ))}
//       </Col>
//     </Row>
//   );
// };

// export default FAQ;


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
import { BodyDataItem } from "@/Types/PageBodyDataType";
import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";

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
  const [faq, setFaq] = useState<FAQ[]>([{ question: "", answer: "" }]);
  const [openIndexes, setOpenIndexes] = useState<boolean[]>([false]);

  useEffect(() => {
    // Initialize faq with existing data from bodyData if it exists
    if (bodyData[index]?.body?.faq) {
      setFaq(bodyData[index].body.faq);
      setOpenIndexes(new Array(bodyData[index].body.faq.length).fill(false));
    }
  }, [bodyData, index]);

  useEffect(() => {
    handleInputChange(component, index, "faq", faq);
  }, [faq]); // Only re-run the effect if 'faq' changes

  const addFaqField = () => {
    setFaq([...faq, { question: "", answer: "" }]);
    setOpenIndexes([...openIndexes, false]);
  };

  const removeFaqField = (idx: number) => {
    const updatedFAQ = [...faq];
    const updatedOpenIndexes = [...openIndexes];
    updatedFAQ.splice(idx, 1);
    updatedOpenIndexes.splice(idx, 1);
    setFaq(updatedFAQ);
    setOpenIndexes(updatedOpenIndexes);
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

  const handleEditorChange = (value: string, idx: number) => {
    const updatedFAQ = [...faq];
    updatedFAQ[idx] = {
      ...updatedFAQ[idx],
      answer: value,
    };
    setFaq(updatedFAQ);
  };

  const toggleAccordion = (idx: number) => {
    const updatedOpenIndexes = [...openIndexes];
    updatedOpenIndexes[idx] = !updatedOpenIndexes[idx];
    setOpenIndexes(updatedOpenIndexes);
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
                    {openIndexes[idx] ? (
                      <ChevronDown
                        className="position-relative inset-0 ml-5"
                        onClick={() => toggleAccordion(idx)}
                      />
                    ) : (
                      <ChevronUp
                        className="position-relative inset-0 ml-5"
                        onClick={() => toggleAccordion(idx)}
                      />
                    )}
                    <Plus onClick={addFaqField} />
                    <Trash onClick={() => removeFaqField(idx)} />
                  </span>
                </div>
              </CardHeader>
              <Collapse isOpen={openIndexes[idx]}>
                <CardBody>
                  <Editor
                    value={item.answer}
                    onBlurEditor={(value) => handleEditorChange(value, idx)}
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
