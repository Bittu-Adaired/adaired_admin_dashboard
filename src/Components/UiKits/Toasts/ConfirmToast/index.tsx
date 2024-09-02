"use client";
import React from "react";
import { Button, Toast, ToastBody } from "reactstrap";
import { Confirm, Deny } from "@/Constant"; // Adjust imports as per your project structure

interface ConfirmToastProps {
  message: string;
  toastName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmToast: React.FC<ConfirmToastProps> = ({
  message,
  toastName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3 toast-index toast-rtl">
      <Toast fade isOpen={true}>
        <div className="toast-header toast-img">
          <strong className="me-auto">{toastName}</strong>
          <Button close className="p-0" onClick={onCancel}></Button>
        </div>
        <ToastBody className="toast-dark">
          <h6 className="mb-2">{message}</h6>
          <div className="mt-2 pt-2 d-flex gap-2">
            <Button color="dark" size="sm" onClick={onCancel}>
              {Deny}
            </Button>
            <Button color="danger" size="sm" onClick={onConfirm}>
              {Confirm}
            </Button>
          </div>
        </ToastBody>
      </Toast>
    </div>
  );
};

export default ConfirmToast;
