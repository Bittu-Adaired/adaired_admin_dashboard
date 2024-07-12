import React from "react";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import { Input } from "reactstrap";
import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";

type KeyFeatureListLayoutProps = {
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

const KeyFeatureListLayout = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: KeyFeatureListLayoutProps) => {
  return (
    <div>
      <h1>KeyFeatureListLayout</h1>
    </div>
  );
};

export default KeyFeatureListLayout;
