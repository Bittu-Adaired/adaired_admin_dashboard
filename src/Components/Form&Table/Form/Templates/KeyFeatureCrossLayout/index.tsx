"use client";
import React from "react";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import { Card, Input } from "reactstrap";
import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";
import ImageSelector from "../../Inputs/ImageSelector";
import parse from "html-react-parser";
import { ClientRemoveTags } from "@/utils/HtmlToString";

type KeyFeatureCrossLayoutProps = {
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

const KeyFeatureCrossLayout: React.FC<KeyFeatureCrossLayoutProps> = ({
  component,
  index,
  handleInputChange,
  bodyData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };
  return (
    <>
      <div className={`space-y-2`}>
        <div className={`space-y-2`}>
          <Input
            type="text"
            name="title"
            value={bodyData[index]?.body?.title ?? ""}
            onChange={handleChange}
            placeholder="Title"
          />
          <Editor
            value={bodyData[index]?.body?.description ?? ""}
            onBlurEditor={(content) =>
              handleInputChange(content, index, "description", content)
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />

            <Input
              type="text"
              name="point_1"
              value={bodyData[index]?.body?.point_1 ?? ""}
              onChange={handleChange}
              placeholder="Point 1"
            />
          </div>

          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />
            <Input
              type="text"
              name="point_2"
              value={bodyData[index]?.body?.point_2 ?? ""}
              onChange={handleChange}
              placeholder="Point 2"
            />
          </div>

          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />
            <Input
              type="text"
              name="point_3"
              value={bodyData[index]?.body?.point_3 ?? ""}
              onChange={handleChange}
              placeholder="Point 3"
            />
          </div>

          <div>
            <ImageSelector
              onImageSelect={(e) => {
                handleInputChange(component, index, "imgUrl", e);
              }}
            />
            <Input
              type="text"
              name="point_4"
              value={bodyData[index]?.body?.point_4 ?? ""}
              onChange={handleChange}
              placeholder="Point 4"
            />
          </div>
        </div>
      </div>

      {/* Display */}
      {/* <div className="space-y-3">
        <h2
          className={`text-2xl md:text-[38px] leading-snug font-nunito font-semibold `}
        >
          {bodyData[index]?.body?.title ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,perspiciatis"}
        </h2>
        <div className="text-justify hyphens-auto text-base sm:hyphens-none sm:text-left sm:text-lg space-y-3">
          {parse(bodyData[index]?.body?.description ?? "") ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, minima corrupti! Unde quam perspiciatis nemo pariatur incidunt laboriosam minima culpa iure laudantium dolorum, consectetur, dolorem cum, facilis blanditiis. Tempore dolore molestiae animi nulla quidem blanditiis, impedit incidunt earum ipsam cum aut asperiores laudantium consectetur quia, nemo alias eveniet delectus minus?"}
        </div>
        <div className="pt-5">
          <div className="relative">
            <div className="flex justify-between pb-8">
              <Box className="box1 basis-[45%] justify-end text-sm xl:text-lg  after:absolute after:content=[''] after:h-0.5 after:w-14 after:rotate-[30deg] after:bg-[#000] after:-bottom-3 after:-right-12 after:z-[-1]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
                tempore!
              </Box>
              <Box className="box2 basis-[45%] justify-start text-sm xl:text-lg after:absolute after:content=[''] after:h-0.5 after:w-14 after:rotate-[-30deg] after:bg-[#000] after:-bottom-3 after:-left-12 after:z-[-1]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
                tempore!
              </Box>
            </div>

            <Circle className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black">
              <svg
                width="52"
                height="48"
                viewBox="0 0 52 48"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1204_6712)">
                  <path
                    d="M25.8868 13.3079C27.569 13.3079 29.1811 12.4539 30.4261 10.9039C31.5631 9.48837 32.2151 7.703 32.2151 6.00392C32.2151 2.58112 29.4949 0 25.8868 0C22.2788 0 19.5586 2.57775 19.5586 6.00392C19.5586 7.703 20.2106 9.48837 21.3476 10.9039C22.5925 12.455 24.2046 13.3079 25.8868 13.3079ZM25.8868 1.84926C28.4902 1.84926 30.3794 3.59653 30.3794 6.00392C30.3794 9.02998 27.9217 11.4587 25.8868 11.4587C23.398 11.4587 21.3943 8.47408 21.3943 6.00392C21.3943 3.60101 23.2834 1.84926 25.8868 1.84926Z"
                    fill="white"
                  />
                  <path
                    d="M18.4004 22.1822L17.7563 31.4386C17.7476 31.5597 17.7628 31.6814 17.8009 31.7967C17.8391 31.9119 17.8994 32.0184 17.9784 32.1101C18.0575 32.2019 18.1538 32.277 18.2617 32.3312C18.3696 32.3854 18.4871 32.4176 18.6074 32.426H18.6719C18.9041 32.4257 19.1276 32.3369 19.2974 32.1774C19.4673 32.018 19.5709 31.7996 19.5875 31.5663L20.2317 22.3178C20.2402 22.1967 20.2249 22.075 20.1867 21.9599C20.1485 21.8447 20.0882 21.7382 20.0092 21.6465C19.9301 21.5549 19.8339 21.4797 19.7261 21.4255C19.6182 21.3713 19.5008 21.3389 19.3806 21.3304C19.2604 21.3219 19.1396 21.3373 19.0253 21.3757C18.911 21.4142 18.8053 21.475 18.7142 21.5546C18.6232 21.6342 18.5487 21.7311 18.4948 21.8398C18.441 21.9484 18.4089 22.0667 18.4004 22.1878V22.1822Z"
                    fill="white"
                  />
                  <path
                    d="M38.3381 32.4245C38.5872 32.4023 38.8173 32.2815 38.9781 32.0887C39.1389 31.8958 39.2172 31.6466 39.1959 31.3956C39.1959 31.3956 38.2258 24.3875 38.0834 22.0362C37.8197 17.8143 35.2597 14.4273 31.26 13.8109C29.8537 13.5935 27.2993 13.4298 25.9642 13.4287C24.1418 13.4606 22.3221 13.5874 20.5127 13.8086C18.6368 14.0674 16.9186 15.0057 15.6797 16.448C14.378 17.9622 13.7962 19.8977 13.6771 22.0406C13.5436 24.3942 12.6591 31.4057 12.6591 31.4057C12.6296 31.6492 12.6973 31.8945 12.8473 32.0876C12.9973 32.2808 13.2174 32.406 13.459 32.4357C13.7007 32.4654 13.9442 32.3972 14.1359 32.2461C14.3277 32.095 14.452 31.8733 14.4815 31.6299C14.4809 31.6217 14.4809 31.6134 14.4815 31.6052C14.4815 31.6052 15.3793 24.5175 15.5073 22.1404C15.6897 18.7714 17.669 16.0636 20.7608 15.64C22.4864 15.4288 24.2217 15.3076 25.9598 15.2768C27.2036 15.2768 29.6724 15.436 30.9785 15.6377C32.4146 15.8566 33.7277 16.5799 34.6856 17.6798C35.7047 18.8588 36.1464 20.4424 36.2432 22.146C36.3845 24.5265 37.3702 31.6153 37.3702 31.6153C37.4054 31.8461 37.5234 32.0558 37.7017 32.2049C37.8801 32.354 38.1065 32.4322 38.3381 32.4245Z"
                    fill="white"
                  />
                  <path
                    d="M32.3701 21.3246C32.2498 21.3329 32.1323 21.365 32.0244 21.419C31.9164 21.4731 31.8201 21.5481 31.7409 21.6397C31.6617 21.7313 31.6013 21.8377 31.563 21.9529C31.5248 22.0681 31.5094 22.1898 31.5179 22.3109V22.3176L32.1632 31.5729C32.1795 31.8062 32.2828 32.0247 32.4525 32.1843C32.6222 32.344 32.8455 32.4331 33.0777 32.4336H33.1433C33.386 32.4158 33.6117 32.302 33.7712 32.1169C33.9307 31.9319 34.011 31.6907 33.9945 31.4462L33.3492 22.1899C33.3334 21.9447 33.2217 21.7158 33.0385 21.5536C32.8554 21.3913 32.6157 21.309 32.3723 21.3246H32.3701Z"
                    fill="white"
                  />
                  <path
                    d="M31.7447 40.7968L36.1593 36.4617C36.2823 36.3414 36.3694 36.1889 36.4107 36.0213C36.4519 35.8537 36.4457 35.6779 36.3928 35.5137C36.3399 35.3494 36.2423 35.2035 36.1111 35.0923C35.98 34.9812 35.8206 34.9093 35.6509 34.8848L29.5507 33.9882L26.8227 28.4236C26.747 28.2687 26.6297 28.1384 26.4842 28.0472C26.3387 27.956 26.1708 27.9077 25.9994 27.9077C25.8281 27.9077 25.6602 27.956 25.5146 28.0472C25.3691 28.1384 25.2519 28.2687 25.1761 28.4236L22.4481 33.9915L16.348 34.8881C16.1785 34.913 16.0194 34.9851 15.8885 35.0963C15.7577 35.2075 15.6603 35.3534 15.6074 35.5175C15.5545 35.6815 15.5482 35.8572 15.5892 36.0246C15.6303 36.1921 15.7169 36.3446 15.8395 36.465L20.2542 40.8001L19.2128 46.9161C19.1833 47.0867 19.202 47.2621 19.2666 47.4225C19.3312 47.5829 19.4392 47.7218 19.5783 47.8234C19.7174 47.9249 19.882 47.9852 20.0534 47.9972C20.2249 48.0092 20.3962 47.9725 20.5479 47.8912L25.9994 45.0019L31.451 47.8912C31.591 47.9654 31.7477 48.0019 31.9059 47.9971C32.064 47.9923 32.2182 47.9464 32.3536 47.8638C32.4889 47.7812 32.6008 47.6649 32.6783 47.5259C32.7559 47.387 32.7964 47.2302 32.7961 47.0708C32.7961 47.019 32.7916 46.9672 32.7827 46.9161L31.7447 40.7968ZM25.5722 43.1392C24.5064 43.6861 21.3356 45.3807 21.3356 45.3807L22.1444 40.6276C22.1696 40.4799 22.1587 40.3282 22.1128 40.1857C22.0668 40.0432 21.9872 39.914 21.8807 39.8094L18.4529 36.4471L23.1902 35.7534C23.3374 35.7318 23.4772 35.6745 23.5976 35.5865C23.7179 35.4984 23.8152 35.3822 23.8811 35.2479L25.995 30.9229L28.1088 35.2479C28.1747 35.3822 28.272 35.4984 28.3924 35.5865C28.5128 35.6745 28.6525 35.7318 28.7997 35.7534L33.537 36.4471L30.1092 39.8094C30.0028 39.914 29.9231 40.0432 29.8772 40.1857C29.8313 40.3282 29.8204 40.4799 29.8456 40.6276L30.6544 45.3807C30.6544 45.3807 27.4836 43.6839 26.4178 43.1392C26.2879 43.0686 26.1426 43.0316 25.995 43.0316C25.8474 43.0316 25.7021 43.0686 25.5722 43.1392Z"
                    fill="white"
                  />
                  <path
                    d="M51.2122 37.6957L46.7519 37.0423L44.7571 32.9717C44.6815 32.8168 44.5644 32.6864 44.419 32.5951C44.2736 32.5039 44.1057 32.4556 43.9344 32.4556C43.7631 32.4556 43.5952 32.5039 43.4498 32.5951C43.3043 32.6864 43.1872 32.8168 43.1116 32.9717L41.1168 37.0423L36.6566 37.6957C36.4871 37.7206 36.328 37.7927 36.1971 37.9039C36.0663 38.0151 35.9689 38.161 35.916 38.325C35.8631 38.4891 35.8568 38.6647 35.8978 38.8322C35.9388 38.9997 36.0255 39.1522 36.1481 39.2726L39.3745 42.4421L38.6124 46.9162C38.583 47.0867 38.6016 47.2622 38.6662 47.4226C38.7308 47.5829 38.8388 47.7218 38.9779 47.8234C39.117 47.925 39.2817 47.9852 39.4531 47.9972C39.6245 48.0092 39.7958 47.9725 39.9475 47.8913L43.936 45.7787L47.9257 47.8913C48.0657 47.9655 48.2224 48.0019 48.3806 47.9971C48.5387 47.9923 48.693 47.9464 48.8283 47.8639C48.9636 47.7813 49.0755 47.6649 49.153 47.526C49.2306 47.387 49.2711 47.2303 49.2708 47.0709C49.2708 47.019 49.2663 46.9673 49.2574 46.9162L48.4953 42.4421L51.7217 39.2726C51.8447 39.1524 51.9318 38.9998 51.9731 38.8323C52.0143 38.6647 52.0082 38.4888 51.9552 38.3246C51.9023 38.1604 51.8047 38.0144 51.6735 37.9033C51.5424 37.7921 51.383 37.7202 51.2133 37.6957H51.2122ZM43.5077 43.9159C42.8079 44.2701 40.7363 45.383 40.7363 45.383L41.2659 42.2752C41.291 42.1275 41.2802 41.9758 41.2343 41.8333C41.1883 41.6908 41.1087 41.5616 41.0022 41.457L38.7604 39.2558L41.8578 38.8075C42.0051 38.786 42.1451 38.7287 42.2655 38.6404C42.3859 38.5521 42.4831 38.4356 42.5487 38.3009L43.9338 35.4744L45.319 38.3009C45.3848 38.4356 45.4822 38.5521 45.6028 38.6404C45.7234 38.7287 45.8635 38.786 46.011 38.8075L49.1072 39.2558L46.8665 41.457C46.7598 41.5615 46.68 41.6906 46.6341 41.8332C46.5881 41.9757 46.5774 42.1275 46.6029 42.2752L47.1369 45.383C47.1369 45.383 45.0664 44.2701 44.3666 43.9159C44.2347 43.8442 44.0871 43.8067 43.9372 43.8067C43.7872 43.8067 43.6397 43.8442 43.5077 43.9159Z"
                    fill="white"
                  />
                  <path
                    d="M15.3411 37.6957L10.8808 37.0423L8.88602 32.9717C8.81045 32.8168 8.69332 32.6864 8.5479 32.5951C8.40248 32.5039 8.23459 32.4556 8.06328 32.4556C7.89197 32.4556 7.72408 32.5039 7.57866 32.5951C7.43325 32.6864 7.31611 32.8168 7.24054 32.9717L5.24572 37.0423L0.785462 37.6957C0.61604 37.7206 0.456903 37.7927 0.326035 37.9039C0.195166 38.0151 0.0977845 38.161 0.0448939 38.325C-0.00799674 38.4891 -0.0142875 38.6647 0.0267324 38.8322C0.0677523 38.9997 0.154448 39.1522 0.277021 39.2726L3.50345 42.4421L2.74691 46.9162C2.71743 47.0867 2.73606 47.2622 2.80068 47.4226C2.86529 47.5829 2.9733 47.7218 3.11241 47.8234C3.25152 47.925 3.41614 47.9852 3.58755 47.9972C3.75895 48.0092 3.93026 47.9725 4.08198 47.8913L8.07163 45.7787L12.0602 47.8913C12.2002 47.9655 12.3569 48.0019 12.515 47.9971C12.6732 47.9923 12.8274 47.9464 12.9628 47.8639C13.0981 47.7813 13.21 47.6649 13.2875 47.526C13.365 47.387 13.4056 47.2303 13.4052 47.0709C13.4052 47.019 13.4008 46.9673 13.3919 46.9162L12.6298 42.4421L15.8562 39.2726C15.9792 39.1524 16.0663 38.9998 16.1075 38.8323C16.1488 38.6647 16.1426 38.4888 16.0897 38.3246C16.0367 38.1604 15.9392 38.0144 15.808 37.9033C15.6769 37.7921 15.5174 37.7202 15.3478 37.6957H15.3411ZM7.64218 43.9159L4.86077 45.383L5.38924 42.2752C5.41468 42.1275 5.40396 41.9757 5.35801 41.8332C5.31206 41.6906 5.23227 41.5615 5.12556 41.457L2.89043 39.2558L5.98669 38.8075C6.13419 38.786 6.27429 38.7287 6.39486 38.6404C6.51543 38.5521 6.61285 38.4356 6.6787 38.3009L8.06384 35.4744L9.44898 38.3009C9.51457 38.4356 9.61177 38.5521 9.73216 38.6404C9.85256 38.7287 9.9925 38.786 10.1399 38.8075L13.2372 39.2558L10.9954 41.457C10.889 41.5616 10.8093 41.6908 10.7634 41.8333C10.7175 41.9758 10.7066 42.1275 10.7318 42.2752L11.2613 45.383L8.48995 43.9159C8.36234 43.8373 8.21566 43.7957 8.06606 43.7957C7.91647 43.7957 7.76978 43.8373 7.64218 43.9159Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1204_6712">
                    <rect width="52" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Circle>

            <div className="flex justify-between pt-8">
              <Box className="box3 basis-[45%] justify-end text-sm xl:text-lg after:absolute after:content=[''] after:h-0.5 after:w-14 after:rotate-[-30deg] after:bg-[#000] after:-top-3 after:-right-12 after:z-[-1]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
                tempore!
              </Box>
              <Box className="box4 basis-[45%] justify-start text-sm xl:text-lg after:absolute after:content=[''] after:h-0.5 after:w-14 after:rotate-[30deg] after:bg-[#000] after:-top-3 after:-left-12 after:z-[-1]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
                tempore!
              </Box>
            </div>
          </div>
        </div>
      </div> */}
      {/* Display */}
    </>
  );
};

export default KeyFeatureCrossLayout;

const Box = ({
  colorScheme,
  className,
  children,
  style,
}: {
  colorScheme?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={`cursor-pointer relative flex items-center justify-center border-2 bg-white p-3  rounded-[4px]
        ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

const Circle = ({
  className,
  children,
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={`z-10 flex w-12 h-12 items-center justify-center rounded-full border-2 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]
        ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
