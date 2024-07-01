import { BodyDataItem } from "@/Components/Miscellaneous/Page/AddPage/PageBody/PageTabContent";
import React from "react";
import { Input } from "reactstrap";
import Editor from "../../Inputs/TextEditor";

interface IntroComponentProps {
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

const IntroComponent: React.FC<IntroComponentProps> = ({
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

  const Textarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(component, index, "introDescription", e.target.value);
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
        {/* <textarea
          value={bodyData[index]?.body?.introDescription ?? ""}
          onChange={Textarea}
        /> */}
        <Editor
          // key={index}
          value={bodyData[index]?.body?.introDescription ?? ""}
          onBlurEditor={onBlurEditor}
        />
      </div>
    </div>
  );
};

export default IntroComponent;
