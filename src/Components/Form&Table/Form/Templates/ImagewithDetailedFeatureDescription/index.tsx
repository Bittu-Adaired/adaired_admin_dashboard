// "use client";
// import React, { Fragment, useEffect, useState } from "react";
// import { Form, Input, Label } from "reactstrap";
// import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";
// import { BodyDataItem } from "@/Types/PageBodyDataType";
// import Button from "../../Inputs/Button";
// import { Disable } from "../../../../../Constant/index";
// import ImageSelector from "../../Inputs/ImageSelector";
// import { FilePond } from "react-filepond";
// import { ImagePreview } from "@dropzone-ui/react";

// interface ImagewithDetailedFeatureDescription {
//   component: string;
//   index: number;
//   handleInputChange: (
//     component: string,
//     index: number,
//     inputName: string,
//     value: any
//   ) => void;
//   bodyData: BodyDataItem[];
// }

// const ImagewithDetailedFeatureDescription: React.FC<
//   ImagewithDetailedFeatureDescription
// > = ({ component, index, handleInputChange, bodyData }) => {
//   const [layoutState, setLayoutState] = useState(true);
//   const [imgUrl, setImgUrl] = useState("null");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     handleInputChange(component, index, e.target.name, e.target.value);
//   };

//   const handleImageChange = (image: string) => {
//     handleInputChange(component, index, "imageUrl", image);
//   };

//   const onBlurEditor = (content: string) => {
//     handleInputChange(component, index, "description", content);
//   };

//   useEffect(() => {
//     handleInputChange(
//       component,
//       index,
//       "layout",
//       layoutState ? "leftImage" : "rightImage"
//     );
//   }, [layoutState]);

//   const changeLayout = () => {
//     setLayoutState(!layoutState);
//   };

//   return (
//     <Form className="need-validation main-custom-form">
//       <div
//         className={`flex justify-between items-center gap-x-4 pt-3 ${
//           !layoutState ? "flex-row-reverse" : ""
//         }`}
//       >
//         <div className="text-center  rounded-lg w-50 ">
//           <div>
//             <ImageSelector
//               onImageSelect={(e) => {
//                 handleImageChange(e);
//                 setImgUrl(e);
//               }}
//             />
//             <ImagePreview src={imgUrl} />
//           </div>
//         </div>
//         <div className="w-50 space-y-2">
//           <Input
//             type="text"
//             name="title"
//             value={bodyData[index]?.body?.title ?? ""}
//             onChange={handleChange}
//             placeholder={`Title`}
//           />
//           <Editor
//             value={bodyData[index]?.body?.introDescription ?? ""}
//             onBlurEditor={onBlurEditor}
//           />
//           <div className="flex items-center justify-between">
//             <Button
//               component={component}
//               index={index}
//               handleInputChange={handleInputChange}
//               value={Disable}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="form-check form-switch pt-3" onClick={changeLayout}>
//         <Input id="flexSwitchCheckDefault" type="switch" role="switch" />
//         <Label htmlFor="flexSwitchCheckDefault" check>
//           Switch Layout
//         </Label>
//       </div>
//     </Form>
//   );
// };

// export default ImagewithDetailedFeatureDescription;

"use client";
import React, { useRef, useEffect, useState } from "react";
import { Form, Input, Label } from "reactstrap";
import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import Button from "../../Inputs/Button";
import { Disable } from "../../../../../Constant/index";
import ImageSelector from "../../Inputs/ImageSelector";
import { ImagePreview } from "@dropzone-ui/react";

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
  const imageSelectorRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const handleImageChange = (image: string) => {
    handleInputChange(component, index, "imageUrl", image);
    setImgUrl(image);
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

  const handleImagePreviewClick = () => {
    if (imageSelectorRef.current) {
      imageSelectorRef.current.click();
    }
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
            <div
              // className="hidden"
              ref={imageSelectorRef}
            >
              <ImageSelector
                onImageSelect={(e) => {
                  handleImageChange(e);
                  setImgUrl(e);
                }}
                ref={imageSelectorRef}
              />
            </div>

            <div onClick={handleImagePreviewClick}>
              <ImagePreview src={imgUrl} />
            </div>
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

      <div className="form-check form-switch pt-3" onClick={changeLayout}>
        <Input id="flexSwitchCheckDefault" type="switch" role="switch" />
        <Label htmlFor="flexSwitchCheckDefault" check>
          Switch Layout
        </Label>
      </div>
    </Form>
  );
};

export default ImagewithDetailedFeatureDescription;
