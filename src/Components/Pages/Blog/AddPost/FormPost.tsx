"use client";
import { FC } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  BlogMetaDescription,
  BlogMetaDescriptionPlaceholder,
  BlogMetaTitle,
  BlogMetaTitlePlaceholder,
  PostCategory,
  PostContent,
  PostSlug,
  PostTitle,
  PostTitlePlaceholder,
  PostTypePlaceholder,
  RichTextBoxPlaceHolder,
} from "@/Constant";
import { PostTypeData } from "@/Data/Miscellaneous/Blog";
import DropzoneClass from "./DropzoneClass";
import { useForm, Controller } from "react-hook-form";
import { BlogDiscardButton, BlogPostButton } from "@/Constant";

interface FormPostProps {
  onSubmit: (data: any) => void;
}

export const FormPost: FC<FormPostProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  return (
    <Form className=" needs-validation" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label check>{BlogMetaTitle}:</Label>
            <Controller
              control={control}
              name="blogMetaTitle"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder={BlogMetaTitlePlaceholder}
                  {...field}
                  className={errors.metaTitle ? "is-invalid" : ""}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label check>{BlogMetaDescription}:</Label>
            <Controller
              control={control}
              name="blogMetaDescription"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder={BlogMetaDescriptionPlaceholder}
                  {...field}
                  className={errors.metaDescription ? "is-invalid" : ""}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <div className="col-form-Label">
              {PostCategory}:{" "}
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Typeahead
                    id="multiple-typeahead"
                    className="mt-2"
                    labelKey="name"
                    options={PostTypeData}
                    placeholder={PostTypePlaceholder}
                    {...field}
                  />

                  // <Input
                  //   type="select"
                  //   {...field}
                  //   className={errors.category ? "is-invalid" : ""}
                  // >
                  //   {PostTypeData.map((item) => (
                  //     <option key={item.name} value={item.name}>
                  //       {item.name}
                  //     </option>
                  //   ))}
                  // </Input>
                )}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label check>{PostTitle}:</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder={PostTitlePlaceholder}
                  {...field}
                  className={errors.title ? "is-invalid" : ""}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label check>{PostSlug}:</Label>
            <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <Input type="text" placeholder={PostSlug} {...field} />
              )}
            />
          </FormGroup>
          <div className="email-wrapper">
            <div className="theme-form">
              <FormGroup>
                <Label check>{PostContent}:</Label>
                <Controller
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <SimpleMdeReact
                      id="editor_container"
                      placeholder={RichTextBoxPlaceHolder}
                      options={{ spellChecker: false }}
                      // {...field}
                      // className={errors.content ? "is-invalid" : ""}
                    />
                  )}
                />
              </FormGroup>
            </div>
          </div>
        </Col>
        <Controller
          control={control}
          name="image"
          render={({ field }) => <DropzoneClass {...field} />}
        />
      </Row>
      <div className="btn-showcase text-end">
        <Button color="primary" type="submit">
          {BlogPostButton}
        </Button>
        <Button color="light" type="reset">
          {BlogDiscardButton}
        </Button>
      </div>
    </Form>
  );
};
