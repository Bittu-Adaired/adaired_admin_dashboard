// "use client";
// import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardBody,
//   Col,
//   Input,
//   InputGroup,
//   InputGroupText,
//   Label,
//   Row,
// } from "reactstrap";
// import { RootState } from "@/Redux/Store";
// import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
// import { fetchImages } from "@/Redux/Reducers/ImageFetchSlice";
// import { CustomFileInputsUpload } from "@/Constant";

// interface ImageSelectorProps {
//   onImageSelect: (image: string) => void;
// }

// const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect }) => {
//   const dispatch = useAppDispatch();
//   const { images, isLoading } = useAppSelector(
//     ({ imageFetch }: RootState) => imageFetch
//   );
//   const [value, setValue] = useState("");
//   const [extraLargeScreen, setExtraLargeScreen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchImages());
//   }, [dispatch]);

//   const extraLargeScreenToggle = () => setExtraLargeScreen(!extraLargeScreen);

//   const handleImageSelect = (image: string) => {
//     setValue(image);
//     onImageSelect(image);
//     extraLargeScreenToggle();
//   };

//   return (
//     <>
//       <InputGroup>
//         <InputGroupText htmlFor="inputGroupFile01">
//           {CustomFileInputsUpload}
//         </InputGroupText>
//         <Input
//           type="text"
//           value={value}
//           onClick={extraLargeScreenToggle}
//           readOnly
//           placeholder="Select Image"
//         />
//       </InputGroup>
//       <CommonModal
//         size="xl"
//         isOpen={extraLargeScreen}
//         toggle={extraLargeScreenToggle}
//         sizeTitle="Select Image"
//       >
//         <Col sm="12">
//           <Card>
//             <CardBody>
//               <div className="main-img-checkbox">
//                 <Row className="g-3">
//                   {isLoading ? (
//                     <Col sm="12" className="text-center">
//                       <div className="error-heading">
//                         <h2 className="font-danger">Loading Images ....</h2>
//                       </div>
//                     </Col>
//                   ) : images && images.length > 0 ? (
//                     images.map((image: string, index: number) => (
//                       <Col key={index} xxl="3" sm="6">
//                         <div className="card-wrapper border rounded-3 checkbox-checked">
//                           <div className="img-checkbox">
//                             <Input
//                               className="main-img-cover"
//                               id={image}
//                               type="radio"
//                               name="radio6"
//                               placeholder="select"
//                               defaultChecked={false}
//                               disabled={false}
//                               onChange={() => handleImageSelect(image)}
//                             />
//                             <Label className="mb-0" htmlFor={image} check>
//                               <Image
//                                 src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image}`}
//                                 alt={image}
//                                 width={500}
//                                 height={500}
//                               />
//                             </Label>
//                           </div>
//                         </div>
//                       </Col>
//                     ))
//                   ) : (
//                     <Col sm="12" className="text-center">
//                       <div className="error-heading">
//                         <h2 className="font-danger">No Images Found</h2>
//                       </div>
//                       <p className="sub-content">
//                         You have not uploaded any images yet. Click the button
//                         above to upload images.
//                       </p>
//                     </Col>
//                   )}
//                 </Row>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>
//       </CommonModal>
//     </>
//   );
// };

// export default ImageSelector;

"use client";
import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { RootState } from "@/Redux/Store";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchImages } from "@/Redux/Reducers/ImageFetchSlice";
import { CustomFileInputsUpload } from "@/Constant";

interface ImageSelectorProps {
  onImageSelect: (image: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect }) => {
  const dispatch = useAppDispatch();
  const { images, isLoading } = useAppSelector(
    ({ imageFetch }: RootState) => imageFetch
  );
  const [value, setValue] = useState("");
  const [extraLargeScreen, setExtraLargeScreen] = useState(false);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const extraLargeScreenToggle = () => setExtraLargeScreen(!extraLargeScreen);

  const handleImageSelect = (image: string) => {
    setValue(image);
    onImageSelect(image);
    extraLargeScreenToggle();
  };

  return (
    <>
      <InputGroup>
        <InputGroupText htmlFor="inputGroupFile01">
          {CustomFileInputsUpload}
        </InputGroupText>
        <Input
          type="text"
          value={value}
          onClick={extraLargeScreenToggle}
          readOnly
          placeholder="Select Image"
        />
      </InputGroup>
      <CommonModal
        size="xl"
        isOpen={extraLargeScreen}
        toggle={extraLargeScreenToggle}
        sizeTitle="Select Image"
      >
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="main-img-checkbox">
                <Row className="g-3">
                  {isLoading ? (
                    <Col sm="12" className="text-center">
                      <div className="error-heading">
                        <h2 className="font-danger">Loading Images ....</h2>
                      </div>
                    </Col>
                  ) : images && images.length > 0 ? (
                    images.map((image: string, index: number) => (
                      <Col key={index} xxl="3" sm="6">
                        <div className="card-wrapper border rounded-3 checkbox-checked">
                          <div className="img-checkbox">
                            <Input
                              className="main-img-cover"
                              id={image}
                              type="radio"
                              name="radio6"
                              placeholder="select"
                              defaultChecked={false}
                              disabled={false}
                              onChange={() => handleImageSelect(image)}
                            />
                            <Label className="mb-0" htmlFor={image} check>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${image}`}
                                alt={image}
                                width={500}
                                height={500}
                              />
                            </Label>
                          </div>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <Col sm="12" className="text-center">
                      <div className="error-heading">
                        <h2 className="font-danger">No Images Found</h2>
                      </div>
                      <p className="sub-content">
                        You have not uploaded any images yet. Click the button
                        above to upload images.
                      </p>
                    </Col>
                  )}
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </CommonModal>
    </>
  );
};

export default ImageSelector;
