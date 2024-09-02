import React, { useState } from "react";
import Link from "next/link";
import { Globe } from "react-feather";
import ConfirmToast from "@/Components/UiKits/Toasts/ConfirmToast"; // Import ConfirmToast component
import SVG from "@/CommonComponent/SVG";
interface Identifiable {
  _id: string;
}

interface ActionDataSourceProp<T extends Identifiable> {
  id: string;
  slug: string;
  editUrl: string;
  viewUrl: string;
  toastMessage: string;
  toastName: string; // Name of the toast to be displayed upon deletion confirmation
  handleConfirmDelete: (id: string) => void; // Accept id as argument
}

const ActionDataSource = <T extends Identifiable>({
  id,
  slug,
  editUrl,
  viewUrl,
  toastMessage,
  toastName,
  handleConfirmDelete,
}: ActionDataSourceProp<T>) => {
  const [showConfirmToast, setShowConfirmToast] = useState(false); // State to control showing ConfirmToast

  const handleDelete = async () => {
    setShowConfirmToast(true); // Show confirm toast on delete button click
  };

  const actions = [
    {
      name: "edit",
      icon: <SVG iconId="edit-content" className="txt-success h-4 w-4" />,
      tooltip: "Edit",
      link: `${editUrl}/${slug}`,
    },
    {
      name: "delete",
      icon: <SVG iconId="trash1" className="txt-success h-4 w-4" />,
      tooltip: "Delete",
      onClick: handleDelete,
    },
    {
      name: "view",
      icon: <Globe className="txt-primary h-4 w-4 text-black" />,
      tooltip: "View",
      link: `${viewUrl}`,
    },
  ];

  return (
    <ul className="action simple-list d-flex flex-row space-x-2" key={id}>
      {actions.map((action) => (
        <li className={`${action.name} cursor-pointer`} key={action.name}>
          {action.link ? (
            <Link href={action.link}>
              {React.cloneElement(action.icon, {
                id: `Tooltip-${action.name}`,
              })}
            </Link>
          ) : (
            <div onClick={action.onClick}>
              {React.cloneElement(action.icon, {
                id: `Tooltip-${action.name}`,
              })}
            </div>
          )}
        </li>
      ))}
      {showConfirmToast && ( // Conditionally render ConfirmToast
        <ConfirmToast
          message={toastMessage}
          toastName={toastName}
          onConfirm={() => handleConfirmDelete(id)} // Pass id to handleConfirmDelete
          onCancel={() => setShowConfirmToast(false)} // Close toast on cancel
        />
      )}
    </ul>
  );
};

export default ActionDataSource;
