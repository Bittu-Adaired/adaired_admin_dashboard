"use client";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import React, { useEffect, useState } from "react";
import { Input, Button } from "reactstrap";
import Editor from "../../Inputs/TextEditor";
import Image from "next/image";
import ImageSelector from "../../Inputs/ImageSelector";

interface TwoColumnFeatureSectionProps {
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

interface FeatureCard {
  title: string;
  description: string;
}

const TwoColumnFeatureSection: React.FC<TwoColumnFeatureSectionProps> = ({
  component,
  index,
  handleInputChange,
  bodyData,
}) => {
  const [featureCardData, setFeatureCardData] = useState<FeatureCard[]>([]);

  useEffect(() => {
    // Initialize featureCardData with existing data from bodyData if it exists
    if (bodyData[index]?.body?.featuredSection) {
      setFeatureCardData(bodyData[index].body.featuredSection);
    }
  }, [bodyData, index]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const handleAddFeatureCard = () => {
    setFeatureCardData([...featureCardData, { title: "", description: "" }]);
  };

  const handleFeatureCardChange = (
    idx: number,
    field: keyof FeatureCard,
    value: string
  ) => {
    const newFeatureCardData = featureCardData.map((card, cardIdx) =>
      cardIdx === idx ? { ...card, [field]: value } : card
    );
    setFeatureCardData(newFeatureCardData);
  };

  const handleDeleteFeatureCard = (idx: number) => {
    const newFeatureCardData = featureCardData.filter(
      (_, cardIdx) => cardIdx !== idx
    );
    setFeatureCardData(newFeatureCardData);
  };

  useEffect(() => {
    handleInputChange(component, index, "featuredSection", featureCardData);
  }, [featureCardData]);

  const onBlurEditor = (
    content: string,
    editorType: "description_1" | "description_2"
  ) => {
    handleInputChange(component, index, editorType, content);
  };

  const onImageSelect = (imgUrl: string) => {
    handleInputChange(component, index, "imgUrl", imgUrl);
  };

  return (
    <div className="space-y-2">
      <div>
        <Input
          type="text"
          name="title"
          value={bodyData[index]?.body?.title ?? ""}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>
      <div>
        <Editor
          value={bodyData[index]?.body?.description_1 ?? ""}
          onBlurEditor={(content) => onBlurEditor(content, "description_1")}
        />
      </div>
      <div className="flex flex-row gap-3">
        {featureCardData.map((card, idx) => (
          <div
            key={idx}
            className="border border-dashed rounded-lg p-3 flex gap-3 w-1/2"
          >
            <div className="flex-shrink-0">
              <Image
                src="/assets/images/service_page-components/TwoColumnFeatureSectionIcon.svg"
                alt="alt"
                width={50}
                height={50}
              />
            </div>
            <div className="w-full space-y-2">
              <Input
                type="text"
                placeholder="Title"
                value={card.title}
                onChange={(e) =>
                  handleFeatureCardChange(idx, "title", e.target.value)
                }
              />
              <Input
                type="textarea"
                placeholder="Description"
                value={card.description}
                onChange={(e) =>
                  handleFeatureCardChange(idx, "description", e.target.value)
                }
              />
              <Button
                color="danger"
                onClick={() => handleDeleteFeatureCard(idx)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {featureCardData.length < 2 && (
        <Button className="w-full" onClick={handleAddFeatureCard}>
          Add Feature Card
        </Button>
      )}
      <div>
        <Editor
          value={bodyData[index]?.body?.description_2 ?? ""}
          onBlurEditor={(content) => onBlurEditor(content, "description_2")}
        />
      </div>
      <div>
        <ImageSelector
          onImageSelect={(e) => {
            handleInputChange(component, index, "imgUrl", e);
          }}
        />
      </div>
    </div>
  );
};

export default TwoColumnFeatureSection;
