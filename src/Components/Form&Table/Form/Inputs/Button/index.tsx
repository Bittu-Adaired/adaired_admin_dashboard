"use client";
import { useState } from "react";
import { ArrowRight } from "react-feather";
import {
  Button,
  Modal,
  ModalBody,
  Input,
  ModalFooter,
  ModalHeader,
  Label,
} from "reactstrap";
type ButtonProps = {
  component: string;
  index: number;
  handleInputChange: (
    component: string,
    index: number,
    inputName: string,
    value: any
  ) => void;
  value: any;
};

const ButtonComp: React.FC<ButtonProps> = ({
  component,
  index,
  handleInputChange,
  value,
}) => {
  const [simpleModal, setSimpleModal] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [innerText, setInnerText] = useState("Button");

  const changeButtonStatus = () => {
    setButtonStatus(!buttonStatus);
    handleInputChange(component, index, "buttonStatus", !buttonStatus);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const toggle = () => setSimpleModal(!simpleModal);
  return (
    <>
      <Button
        color={`${buttonStatus ? "primary" : "btn-light border"}`}
        onClick={toggle}
      >
        {innerText}
      </Button>
      <Modal isOpen={simpleModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Button Props</ModalHeader>
        <ModalBody>
          <div className="modal-toggle-wrapper space-y-2">
            <div className="tg-list-item flex  items-center gap-x-2">
              <Input
                className={`tgl tgl-flip`}
                id="btn1"
                type="checkbox"
                checked={buttonStatus}
                onChange={changeButtonStatus}
              />
              <Label
                className="tgl-btn"
                data-tg-off="Nope!"
                data-tg-on="Yeah"
                htmlFor="btn1"
              ></Label>
              <p className="m-0">Disable Button</p>
            </div>
            <Input
              type="text"
              name="buttonLink"
              placeholder="Link"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="buttonClassname"
              placeholder="Button Classname"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="buttonInnerText"
              placeholder="Inner Text"
              value={innerText}
              onChange={(e) => {
                setInnerText(e.target.value);
                handleInputChange(
                  component,
                  index,
                  "buttonInnerText",
                  e.target.value
                );
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="d-flex align-items-center gap-2 text-light ms-auto"
            onClick={toggle}
          >
            Done <ArrowRight />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ButtonComp;
