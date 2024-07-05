import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Edit, Globe } from "react-feather";
import { Tooltip } from "reactstrap";
import ConfirmToast from "@/Components/UiKits/Toasts/ConfirmToast"; // Import ConfirmToast component

interface Identifiable {
  _id: string;
}

interface ActionDataSourceProp<T extends Identifiable> {
  id: string;
  editUrl: string;
  viewUrl: string;
  toastMessage: string;
  toastName: string; // Name of the toast to be displayed upon deletion confirmation
  handleConfirmDelete: () => void;
}

type TooltipType = "edit" | "delete" | "view";

const ActionDataSource = <T extends Identifiable>({
  id,
  editUrl,
  viewUrl,
  toastMessage,
  toastName,
  handleConfirmDelete,
}: ActionDataSourceProp<T>) => {
  const [tooltipOpen, setTooltipOpen] = useState<{
    [key in TooltipType]: boolean;
  }>({
    edit: false,
    delete: false,
    view: false,
  });

  const [showConfirmToast, setShowConfirmToast] = useState(false); // State to control showing ConfirmToast

  const toggle = (type: TooltipType) => {
    setTooltipOpen((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleDelete = async () => {
    setShowConfirmToast(true); // Show confirm toast on delete button click
  };


  const actions = [
    {
      name: "edit",
      icon: <Edit className="txt-success h-4 w-4" />,
      tooltip: "Edit",
      link: `${editUrl}/${id}`,
    },
    {
      name: "delete",
      icon: <Trash2 className="txt-danger h-4 w-4" />,
      tooltip: "Delete",
      onClick: handleDelete,
    },
    {
      name: "view",
      icon: <Globe className="txt-primary h-4 w-4" />,
      tooltip: "View",
      link: `${viewUrl}/${id}`,
    },
  ];

  return (
    <ul className="action simple-list d-flex flex-row space-x-2" key={id}>
      {actions.map((action) => (
        <li className={action.name} key={action.name}>
          {action.link ? (
            <Link href={action.link}>
              {React.cloneElement(action.icon, {
                id: `Tooltip-${action.name}`,
              })}
              <Tooltip
                target={`Tooltip-${action.name}`}
                placement="top"
                isOpen={tooltipOpen[action.name as TooltipType]}
                toggle={() => toggle(action.name as TooltipType)}
              >
                {action.tooltip}
              </Tooltip>
            </Link>
          ) : (
            <div onClick={action.onClick} className="cursor-pointer">
              {React.cloneElement(action.icon, {
                id: `Tooltip-${action.name}`,
              })}
              <Tooltip
                target={`Tooltip-${action.name}`}
                placement="top"
                isOpen={tooltipOpen[action.name as TooltipType]}
                toggle={() => toggle(action.name as TooltipType)}
              >
                {action.tooltip}
              </Tooltip>
            </div>
          )}
        </li>
      ))}
      {showConfirmToast && ( // Conditionally render ConfirmToast
        <ConfirmToast
          message={toastMessage}
          toastName={toastName}
          onConfirm={handleConfirmDelete} // Pass handleConfirmDelete as prop
          onCancel={() => setShowConfirmToast(false)} // Close toast on cancel
        />
      )}
    </ul>
  );
};

export default ActionDataSource;
