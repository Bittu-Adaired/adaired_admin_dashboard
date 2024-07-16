"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Label } from "reactstrap";
import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import ButtonComp from "../../Inputs/Button";
import ImageSelector from "../../Inputs/ImageSelector";

interface ImagewithDetailedFeatureDescription {
  component: string;
  index: number;
  handleInputChange: (
    component: string,
    index: number,
    inputName: string,
    value: any
  ) => void;
  bodyData: BodyDataItem[];
}

const ImagewithDetailedFeatureDescription: React.FC<
  ImagewithDetailedFeatureDescription
> = ({ component, index, handleInputChange, bodyData }) => {
  const [layoutState, setLayoutState] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const onBlurEditor = (content: string) => {
    handleInputChange(component, index, "description", content);
  };

  useEffect(() => {
    handleInputChange(
      component,
      index,
      "layout",
      layoutState ? "leftImage" : "rightImage"
    );
  }, [layoutState]);

  const changeLayout = () => {
    setLayoutState(!layoutState);
  };

  // Extract button data from bodyData
  const buttonData = bodyData[index]?.body?.button ?? {
    buttonStatus: false,
    buttonLink: "",
    buttonClassname: "",
    buttonInnerText: "Button",
  };

  return (
    <Form className="need-validation main-custom-form">
      <div
        className={`flex justify-between items-center gap-x-4 pt-3 ${
          !layoutState ? "flex-row-reverse" : ""
        }`}
      >
        <div className="text-center rounded-lg w-50">
          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />
          </div>
        </div>
        <div className="w-50 space-y-2">
          <Input
            type="text"
            name="title"
            value={bodyData[index]?.body?.title ?? ""}
            onChange={handleChange}
            placeholder="Title"
          />
          <Editor
            value={bodyData[index]?.body?.introDescription ?? ""}
            onBlurEditor={onBlurEditor}
          />
          <div className="flex items-center justify-between">
            <ButtonComp
              component={component}
              index={index}
              handleInputChange={handleInputChange}
              value={buttonData}
            />
          </div>
        </div>
      </div>

      <div className="form-check form-switch pt-3">
        <Input
          id="flexSwitchCheckDefault"
          type="switch"
          role="switch"
          onClick={changeLayout}
        />
        <Label htmlFor="flexSwitchCheckDefault" check>
          Switch Layout
        </Label>
      </div>
    </Form>
  );
};

export default ImagewithDetailedFeatureDescription;
