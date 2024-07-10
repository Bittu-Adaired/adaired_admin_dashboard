"use client";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import React from "react";
import { Input } from "reactstrap";
import Editor from "../../Inputs/TextEditor";
import Image from "next/image";

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
    handleInputChange(component, index, "description", content);
  };

  return (
    <div className={`space-y-2`}>
      <div>
        <Input
          type="text"
          name="title"
          value={bodyData[index]?.body?.title ?? ""}
          onChange={handleChange}
          placeholder={`Title`}
        />
      </div>
      <div>
        <Editor
          value={bodyData[index]?.body?.description_1 ?? ""}
          onBlurEditor={onBlurEditor}
        />
      </div>
      <div className="flex justify-between gap-3">
        <div className="border border-dashed rounded-lg p-3 flex w-1/2">
          <div className="flex-shrink-0 ">
            <Image
              src="/assets/images/service_page-components/TwoColumnFeatureSectionIcon.svg"
              alt="alt"
              width={50}
              height={50}
            />
          </div>
          <div className="ml-4">
            <Input type="text" placeholder="Title" />
            <Input type="textarea" placeholder="Description" />
          </div>
        </div>
        <div className="border border-dashed rounded-lg p-3 flex w-1/2">
          <div className="flex-shrink-0">
            <Image
              src="/assets/images/service_page-components/TwoColumnFeatureSectionIcon.svg"
              alt="alt"
              width={50}
              height={50}
            />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold font-nunito">{"title"}</h3>
            <p className="text-gray-600">{"description"}</p>
          </div>
        </div>
      </div>
      <div>
        <Editor
          value={bodyData[index]?.body?.description_2 ?? ""}
          onBlurEditor={onBlurEditor}
        />
      </div>
    </div>
  );
};

export default TwoColumnFeatureSection;
