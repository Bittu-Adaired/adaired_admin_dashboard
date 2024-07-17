"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Label } from "reactstrap";
import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import ButtonComp from "../../Inputs/Button";
import ImageSelector from "../../Inputs/ImageSelector";

interface ImageWithIconBoxListProps {
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
const ImageWithIconBoxList = (props: ImageWithIconBoxListProps ) => {
  return <div>ImageWithIconBoxList</div>;
};

export default ImageWithIconBoxList;
