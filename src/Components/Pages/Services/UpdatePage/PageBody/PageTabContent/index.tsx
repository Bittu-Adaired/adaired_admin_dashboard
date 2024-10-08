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
  ColorScheme,
  Status,
} from "@/Constant";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/Redux/Hooks";
import CommonButton from "../../../CommonButton";
import { Controller, useForm } from "react-hook-form";
import ComponentSelectButton from "@/Components/ComponentSelectButton";
import RenderSelectedInputFields from "@/Components/Form&Table/Form/Templates/RenderSelectedInputFields";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import ImageSelector from "@/Components/Form&Table/Form/Inputs/ImageSelector";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import { ImageWithRadioDataList } from "@/Data/Form&Table/Form";
import { ServiceFormTypes } from "@/Types/ServiceType";
import { UpdatePageProps } from "../../index";
import api from "@/Config/axiosConfig";
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
  colorScheme: z.string().min(3, {
    message: "Color Scheme is required",
  }),
  parentService: z.string().optional(),
  status: z.string().min(3, {
    message: "Please the status of the page!",
  }),
});

const PageTabContent = ({ slug }: UpdatePageProps) => {
  const { navId } = useAppSelector((state) => state.addService);
  const [bodyData, setBodyData] = useState<BodyDataItem[]>([]);
  const [services, setServices] = useState<ServiceFormTypes[]>([]);
  const [serviceId, setServiceId] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      canonicalLink: "",
      openGraphImage: "",
      robotsText: "",
      focusKeyword: "",
      serviceName: "",
      slug: "",
      colorScheme: "",
      parentService: undefined,
      status: "",
    },
  });

  const fetchCurrentService = async () => {
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/service/getServices/${slug}`
      );
      setServiceId(result.data._id);
      const fetchedBodyData = result.data.bodyData || [];
      setBodyData(fetchedBodyData);
      setSelectedComponents(fetchedBodyData);

      // Extract the last segment after the last forward slash and remove any file extension
      const extractLastSegment = (url: string) => {
        if (!url) return "";
        const segments = url.split("/");
        const lastSegment = segments[segments.length - 1];
        return lastSegment.replace(/\.[^/.]+$/, ""); // Remove file extension
      };

      reset({
        metaTitle: result.data.metaTitle || "",
        metaDescription: result.data.metaDescription || "",
        canonicalLink: extractLastSegment(result.data.canonicalLink),
        openGraphImage: result.data.openGraphImage || "",
        robotsText: result.data.robotsText || "",
        focusKeyword: result.data.focusKeyword || "",
        serviceName: result.data.serviceName || "",
        slug: result.data.slug || "",
        colorScheme: result.data.colorScheme || "",
        parentService:
          result.data.parentService === ""
            ? undefined
            : result.data.parentService || undefined,
        status: result.data.status || "",
      });
    } catch (error) {
      console.error("Error fetching current service:", error);
    }
  };

  const fetchAllServices = async () => {
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/service/getServices`
      );
      setServices(result.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchCurrentService();
    fetchAllServices();
  }, []);

  const onSubmit = async (data: any) => {
    const formData = { ...data, bodyData: bodyData };
    console.log("Form Data:", formData);
    try {
      const request = await api.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/service/updateService/${serviceId}`,
        formData
      );
      console.log("Request", request);

      const revalidate = await axios.post(
        `${process.env.NEXT_PUBLIC_WEB_URI}/api/revalidatePage`,
        {
          slug: `/services/${formData.slug}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000,
        }
      );

      console.log("Revalidate:", revalidate);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const submitForm = () => {
    handleSubmit(onSubmit)();
  };

  const [selectedComponents, setSelectedComponents] = useState<BodyDataItem[]>(
    []
  );

  const handleComponentSelect = (componentName: string) => {
    const label = ImageWithRadioDataList.find(
      (item) => item.componentName === componentName
    );
    if (label) {
      const newComponent = {
        id: `${componentName}-${uuidv4().substr(0, 4)}`,
        componentName,
        label: label.label,
        body: {},
      };
      setSelectedComponents((prevSelected) => [...prevSelected, newComponent]);
      setBodyData((prevBodyData) => [...prevBodyData, newComponent]);
    } else {
      console.error("Component not found:", componentName);
    }
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
                      imageName={field.value} // Pass field value as imageName
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
                      className={errors.serviceName ? "is-invalid" : ""}
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
                <Label check>{ColorScheme}:</Label>
                <Controller
                  control={control}
                  name="colorScheme"
                  render={({ field }) => (
                    <Input
                      type="color"
                      placeholder={ColorScheme}
                      {...field}
                      className={errors.colorScheme ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.colorScheme && (
                  <span className="text-danger">
                    {errors.colorScheme.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>{ParentServiceName}:</Label>
                <Controller
                  control={control}
                  name="parentService"
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      className={`form-control ${
                        errors.parentService ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Select Parent Service</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.serviceName}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                {errors.parentService && (
                  <span className="text-danger">
                    {errors.parentService.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>{Status}:</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      className={`form-control ${
                        errors.status ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Select Status</option>
                      <option value="publish">Publish</option>
                      <option value="draft">Draft</option>
                    </Input>
                  )}
                />
                {errors.status && (
                  <span className="text-danger">{errors.status.message}</span>
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
