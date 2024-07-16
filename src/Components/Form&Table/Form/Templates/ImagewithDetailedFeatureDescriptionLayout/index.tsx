"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Label } from "reactstrap";
import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import Button from "../../Inputs/Button";
import { Disable } from "../../../../../Constant/index";
import ImageSelector from "../../Inputs/ImageSelector";
import { ImagePreview } from "@dropzone-ui/react";
import { findImage } from "../../CommonFunctions";

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
  const [imgUrl, setImgUrl] = useState("");

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

  return (
    <Form className="need-validation main-custom-form">
      <div
        className={`flex justify-between items-center gap-x-4 pt-3 ${
          !layoutState ? "flex-row-reverse" : ""
        }`}
      >
        <div className="text-center rounded-lg w-50">
          <div>
            <ImagePreview
              className="h-250 w-300 rounded-md"
              src={imgUrl || "https://via.placeholder.com/250"}
              alt="Preview"
            />

            <ImageSelector
              onImageSelect={async (name: string) => {
                const secureUrl = await findImage(name);
                setImgUrl(secureUrl);
                handleInputChange(component, index, "image", secureUrl);
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
            <Button
              component={component}
              index={index}
              handleInputChange={handleInputChange}
              value={Disable}
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
