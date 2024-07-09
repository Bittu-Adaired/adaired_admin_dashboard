import React, { useState } from "react";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import { Input } from "reactstrap";
import ImageSelector from "@/Components/Form&Table/Form/Inputs/ImageSelector";
import { ImagePreview } from "@dropzone-ui/react";
import Editor from "../../Inputs/TextEditor";

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
const KeyBenefitswithCentralConnector: React.FC<
  ImagewithDetailedFeatureDescription
> = ({ component, index, handleInputChange, bodyData }) => {
  const [imgUrl, setImgUrl] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };
  const handleImageChange = (image: string) => {
    handleInputChange(component, index, "imageUrl", image);
    setImgUrl(image);
  };
  return (
    <>
      <Input
        type="text"
        name="title"
        value={bodyData[index]?.body?.title ?? ""}
        onChange={handleChange}
        placeholder="Title"
      />
      <div>
        <ImageSelector onImageSelect={(e) => handleImageChange(e)} />
        {imgUrl && <ImagePreview src={imgUrl} alt="Preview" />}
      </div>
    </>
  );
};

export default KeyBenefitswithCentralConnector;
