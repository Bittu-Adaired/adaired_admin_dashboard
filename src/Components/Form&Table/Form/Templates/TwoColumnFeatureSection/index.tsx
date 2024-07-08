import { BodyDataItem } from "@/Types/PageBodyDataType";
import React from "react";
import { Input } from "reactstrap";
import Editor from "../../Inputs/TextEditor";

interface TwoColumnFeatureSection {
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

const TwoColumnFeatureSection: React.FC<TwoColumnFeatureSection> = ({
  component,
  index,
  handleInputChange,
  bodyData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const onBlurEditor = (content: string) => {
    handleInputChange(component, index, "introDescription", content);
  };

  return (
    <div className={`space-y-2`}>
      <div>
        <Input
          type="text"
          name="introTitle"
          value={bodyData[index]?.body?.introTitle ?? ""}
          onChange={handleChange}
          placeholder={`${component} Title`}
        />
      </div>
      <div>
        <Editor
          value={bodyData[index]?.body?.introDescription ?? ""}
          onBlurEditor={onBlurEditor}
        />
      </div>
    </div>
  );
};

export default TwoColumnFeatureSection;
