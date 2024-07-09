"use client";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import React, { useState } from "react";
import { Input } from "reactstrap";
import ImageSelector from "@/Components/Form&Table/Form/Inputs/ImageSelector";
import { ImagePreview } from "@dropzone-ui/react";

type ImageWithTitleProps = {
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

const ImageWithTitle: React.FC<ImageWithTitleProps> = ({
  component,
  index,
  handleInputChange,
  bodyData,
}) => {
  const [imgUrl, setImgUrl] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };
  const handleImageChange = (image: string) => {
    handleInputChange(component, index, "imageUrl", image);
    setImgUrl(image);
  };
  return (
    <div className="space-y-2">
      <Input
        type="text"
        name="title"
        value={bodyData[index]?.body?.title ?? ""}
        onChange={handleChange}
        placeholder="Title"
      />
      <ImageSelector onImageSelect={(e) => handleImageChange(e)} />
      <ImagePreview src={imgUrl} />
    </div>
  );
};

export default ImageWithTitle;
