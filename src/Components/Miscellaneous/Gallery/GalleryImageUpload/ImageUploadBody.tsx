"use client";
import React, { useState } from "react";
import { Button, Toast, ToastBody } from "reactstrap";
import { ConfirmUpload } from "@/Constant";
import { RootState } from "@/Redux/Store";
import { uploadImages } from "@/Redux/Reducers/ImageUploadSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {
  Dropzone,
  ExtFile,
  FileMosaic,
  FileMosaicProps,
  FullScreen,
  ImagePreview,
} from "@dropzone-ui/react";

const ImageUploadBody = () => {
  const [extFiles, setExtFiles] = useState<ExtFile[]>([]);
  const [imageSrc, setImageSrc] = useState<File | string | undefined>(
    undefined
  );
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useAppSelector(
    (state: RootState) => state.imageUpload
  );

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setExtFiles(incomingFiles);
  };
  const onDelete = (id: FileMosaicProps["id"]) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource: File | string | undefined) =>
    setImageSrc(imageSource);
  const handleAbort = (id: FileMosaicProps["id"]) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id: FileMosaicProps["id"]) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };

  const onSubmit = () => {
    try {
      const filesToUpload = extFiles
        .map((extFile) => extFile.file)
        .filter(Boolean) as File[];
      dispatch(uploadImages(filesToUpload));
      toggle();
      if (success) {
        setExtFiles([]);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      return;
    }
  };

  return (
    <div className="m-b-10">
      <div className="toast-container position-fixed top-0 end-0 p-3 toast-index toast-rtl">
        <Toast fade isOpen={open}>
          <div className="toast-header toast-img">
            <strong className="me-auto txt-success">
              {" "}
              {isLoading ? "Uploading" : "Success !"}{" "}
            </strong>
            <Button close onClick={() => setOpen(false)}></Button>
          </div>
          <ToastBody className="toast-dark">
            {isLoading
              ? "Please wait, Images are uploading"
              : "Images uploaded successfully !"}
          </ToastBody>
        </Toast>
      </div>

      <Dropzone onChange={updateFiles} value={extFiles} header={false}>
        {extFiles.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onAbort={handleAbort}
            onCancel={handleCancel}
            resultOnTooltip
            alwaysActive
            preview
          />
        ))}
        {extFiles.length === 0 && (
          <div className="dz-message needsclick">
            <i className="icon-cloud-up fs-1 txt-primary"></i>
            <h6 className="f-w-700 mb-1">
              Drop files here or click to upload.
            </h6>
            <h6 className="note needsclick">
              (You can upload more than <strong>one</strong> Image at a time.)
            </h6>
          </div>
        )}
      </Dropzone>

      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>

      <div className="btn-showcase text-end mt-4">
        <Button color="primary" onClick={onSubmit}>
          {ConfirmUpload}
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadBody;
