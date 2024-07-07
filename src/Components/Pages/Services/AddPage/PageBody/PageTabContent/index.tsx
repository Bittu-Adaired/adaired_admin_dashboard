"use client";
import {
  Col,
  Form,
  FormGroup,
  TabContent,
  TabPane,
  Label,
  Input,
  InputGroup,
  InputGroupText,
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
  ServiceName,
  ParentServiceName,
  Slug,
} from "@/Constant";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/Redux/Hooks";
import CommonButton from "../../../CommonButton";
import { Controller, useForm } from "react-hook-form";
import ComponentSelectButton from "@/Components/ComponentSelectButton";
import RenderSelectedInputFields from "@/Components/Form&Table/Form/Templates/RenderSelectedInputFields";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ImageSelector from "@/Components/Form&Table/Form/Inputs/ImageSelector";
import { ServiceFormTypes } from "@/Types/ServiceType";
import { BodyDataItem } from "@/Types/PageBodyDataType";

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
  openGraphImage: z.string().optional(),
  robotsText: z
    .string()
    .includes("index", {
      message: "Robots text must include index/noindex",
    })
    .includes("follow", {
      message: "Robots text must include follow/nofollow",
    }),
  focusKeyword: z.string().min(3, {
    message: "Focus keyword is required",
  }),
  serviceName: z.string().min(3, {
    message: "Service Name is required",
  }),
  slug: z.string().min(3, {
    message: "Slug is required",
  }),
  parentServiceName: z.string().optional(),
});

const PageTabContent = ({ id }: { id: string }) => {
  const [fetchedService, setFetchedService] = useState<ServiceFormTypes>();

  // *** Fetch Service ***
  const fetchService = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/service/findService/${id}`
      );
      setFetchedService(result.data);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };
  useEffect(() => {
    fetchService();
  }, [id]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      metaTitle: fetchedService?.metaTitle,
      metaDescription: fetchedService?.metaTitle,
      canonicalLink: "",
      openGraphImage: "",
      robotsText: "",
      focusKeyword: "",
      serviceName: "",
      slug: "",
      parentServiceName: "",
    },
  });
  const { navId } = useAppSelector((state) => state.addService);
  const [bodyData, setBodyData] = useState<BodyDataItem[]>([]);
  const onSubmit = async (data: any) => {
    const formData = { ...data, bodyData: bodyData };
    console.log("Form Data:", formData);
    try {
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/page/newPage`,
        formData
      );
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = () => {
    handleSubmit(onSubmit)();
  };

  const [selectedComponents, setSelectedComponents] = useState<BodyDataItem[]>(
    []
  );

  const handleComponentSelect = (componentName: string) => {
    const newComponent = {
      id: `${componentName}-` + uuidv4().substr(0, 4),
      componentName,
      body: {},
    };
    setSelectedComponents((prevSelected) => [...prevSelected, newComponent]);
    setBodyData((prevBodyData) => [...prevBodyData, newComponent]);
  };

  return (
    <>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <Form className="need-validation main-custom-form">
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
                    <InputGroup>
                      <InputGroupText id="basic-addon3">
                        {"https://adaired.com/"}
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder={CanonicalLink}
                        {...field}
                        className={errors.canonicalLink ? "is-invalid" : ""}
                      />
                    </InputGroup>
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
                  name="openGraphImage"
                  render={({ field }) => (
                    <ImageSelector
                      onImageSelect={(e) => {
                        setValue("openGraphImage", e);
                      }}
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
                  name="robotsText"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={RobotsTextIndexPlaceholder}
                      {...field}
                      className={errors.robotsText ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.robotsText && (
                  <span className="text-danger">
                    {errors.robotsText.message}
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
              <FormGroup>
                <Label check>{ServiceName}:</Label>
                <Controller
                  control={control}
                  name="serviceName"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={ServiceName}
                      {...field}
                      className={errors.focusKeyword ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.serviceName && (
                  <span className="text-danger">
                    {errors.serviceName.message}
                  </span>
                )}
              </FormGroup>
              <FormGroup>
                <Label check>{Slug}:</Label>
                <Controller
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupText id="basic-addon3">
                        {"https://adaired.com/services/"}
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder={Slug}
                        {...field}
                        className={errors.slug ? "is-invalid" : ""}
                      />
                    </InputGroup>
                  )}
                />
                {errors.slug && (
                  <span className="text-danger">{errors.slug.message}</span>
                )}
              </FormGroup>
              <FormGroup>
                <Label check>{ParentServiceName}:</Label>
                <Controller
                  control={control}
                  name="parentServiceName"
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      className={`form-control ${
                        errors.focusKeyword ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Select Parent Service</option>
                      <option value="Home">Home</option>
                      <option value="About">About</option>
                      <option value="Services">Services</option>
                      <option value="Blog">Blog</option>
                      <option value="Contact">Contact</option>
                    </Input>
                  )}
                />
                {errors.parentServiceName && (
                  <span className="text-danger">
                    {errors.parentServiceName.message}
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
