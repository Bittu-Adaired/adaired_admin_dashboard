import {
  Col,
  Form,
  FormGroup,
  TabContent,
  TabPane,
  Label,
  Input,
} from "reactstrap";
import {
  MetaTitle,
  MetaDesciption,
  CanonicalLink,
  OGImage,
  RobotsText,
  RobotsTextIndex,
  RobotsTextFollow,
  RobotsTextIndexPlaceholder,
  FocusKeyword,
} from "@/Constant";
import { useState } from "react";
import { useAppSelector } from "@/Redux/Hooks";
import CommonButton from "../../../CommonButton";
import { Controller, useForm } from "react-hook-form";
import ComponentSelectButton from "@/Components/ComponentSelectButton";
import RenderSelectedInputFields from "@/Components/Form&Table/Form/Templates/RenderSelectedInputFields";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
const schema = z.object({
  metaTitle: z.string().min(3, {
    message: "Meta title is required",
  }),
  metaDescription: z.string().min(3, {
    message: "Meta description is required",
  }),
  canonicalLink: z.string().min(3, {
    message: "Canonical link is required",
  }),
  ogImage: z.string().optional(),
  robotsTextIndex: z
    .string()
    .includes("index", {
      message: "Robots text must include index",
    })
    .includes("follow", {
      message: "Robots text must include follow",
    }),
  focusKeyword: z.string().min(3, {
    message: "Focus keyword is required",
  }),
});

export interface BodyDataItem {
  componentName: string;
  body: { [inputName: string]: any };
}

const PageTabContent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      canonicalLink: "",
      ogImage: "",
      robotsTextIndex: "",
      focusKeyword: "",
    },
  });
  const { navId } = useAppSelector((state) => state.addService);
  const [bodyData, setBodyData] = useState<BodyDataItem[]>([]);
  const onSubmit = async (data: any) => {
    const formData = { ...data, bodyData: bodyData };
    console.log(formData);
    try {
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/page/newPage`,
        formData
      );
      console.log(request.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = () => {
    handleSubmit(onSubmit)();
  };

  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const handleComponentSelect = (componentName: string) => {
    setSelectedComponents((prevSelected) => [...prevSelected, componentName]);
  };

  return (
    <>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <Form className="need-validation">
          <TabContent activeTab={navId}>
            <TabPane tabId={1}>
              <RenderSelectedInputFields
                selectedComponents={selectedComponents}
                setSelectedComponents={setSelectedComponents}
                setBodyData={setBodyData}
                bodyData={bodyData}
              />
              <Col className="select-component-buttons">
                <ComponentSelectButton selectedItem={handleComponentSelect} />
              </Col>
            </TabPane>
            <TabPane tabId={2}>
              <FormGroup>
                <Label check>{MetaTitle}:</Label>
                <Controller
                  control={control}
                  name="metaTitle"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={MetaTitle}
                      {...field}
                      className={errors.metaTitle ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.metaTitle && (
                  <span className="text-danger">
                    {errors.metaTitle.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>{MetaDesciption}:</Label>
                <Controller
                  control={control}
                  name="metaDescription"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={MetaDesciption}
                      {...field}
                      className={errors.metaDescription ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.metaDescription && (
                  <span className="text-danger">
                    {errors.metaDescription.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>{CanonicalLink}:</Label>
                <Controller
                  control={control}
                  name="canonicalLink"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={CanonicalLink}
                      {...field}
                      className={errors.canonicalLink ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.canonicalLink && (
                  <span className="text-danger">
                    {errors.canonicalLink.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>{OGImage}:</Label>
                <Controller
                  control={control}
                  name="ogImage"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={OGImage}
                      {...field}
                      className={errors.ogImage ? "is-invalid" : ""}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>
                  {`${RobotsText} (${RobotsTextIndex} & ${RobotsTextFollow} ): `}
                </Label>
                <Controller
                  control={control}
                  name="robotsTextIndex"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={RobotsTextIndexPlaceholder}
                      {...field}
                      className={errors.robotsTextIndex ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.robotsTextIndex && (
                  <span className="text-danger">
                    {errors.robotsTextIndex.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>{FocusKeyword}:</Label>
                <Controller
                  control={control}
                  name="focusKeyword"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={FocusKeyword}
                      {...field}
                      className={errors.focusKeyword ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.focusKeyword && (
                  <span className="text-danger">
                    {errors.focusKeyword.message}
                  </span>
                )}
              </FormGroup>
            </TabPane>
          </TabContent>
        </Form>
      </Col>
      <CommonButton submitForm={submitForm} />
    </>
  );
};

export default PageTabContent;
