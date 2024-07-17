import React, { useEffect, useState } from "react";
import { BodyDataItem } from "@/Types/PageBodyDataType";
import { Button, Input, Label } from "reactstrap";
import { Trash2 } from "react-feather";
import ImageSelector from "../../Inputs/ImageSelector";
import Editor from "@/Components/Form&Table/Form/Inputs/TextEditor";

type StickyScrollLayoutProps = {
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

interface IlistItems {
  icon: string;
  title: string;
  description: string;
}

const StickyScrollLayout = ({
  component,
  index,
  handleInputChange,
  bodyData,
}: StickyScrollLayoutProps) => {
  const [listItems, setListItems] = useState<IlistItems[]>([]);

  // Synchronize the list items with the existing body data when the component mounts or re-renders.
  useEffect(() => {
    if (bodyData[index]?.body?.listItems) {
      setListItems(bodyData[index].body.listItems); // Set the initial list items from the existing body data if available.
    }
  }, [bodyData, index]);

  // Ensure the listItems state is kept in sync with the bodyData prop
  useEffect(() => {
    handleInputChange(component, index, "listItems", listItems);
  }, [listItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(component, index, e.target.name, e.target.value);
  };

  const addListItem = () => {
    const newListItem = [
      ...listItems,
      { icon: "", title: "", description: "" },
    ];
    setListItems(newListItem);
  };

  const removeListItem = (itemIndex: number) => {
    const newListItems = listItems.filter((_, idx) => idx !== itemIndex);
    setListItems(newListItems);
  };

  const handleListItemChange = (
    itemIndex: number,
    field: keyof IlistItems,
    value: string
  ) => {
    const newListItems = listItems.map((item, idx) =>
      idx === itemIndex ? { ...item, [field]: value } : item
    );
    setListItems(newListItems);
  };

  const renderListItems = () =>
    listItems.map((item, i) => (
      <div key={i} className="border border-dashed rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <Label>Item {i + 1} :</Label>
          <Trash2
            className="text-danger cursor-pointer"
            size={20}
            onClick={() => removeListItem(i)}
          />
        </div>
        <ImageSelector
          onImageSelect={(e) => {
            handleListItemChange(i, "icon", e);
          }}
        />
        <Input
          type="text"
          name={`title_${i}`}
          value={item.title}
          onChange={(e) => handleListItemChange(i, "title", e.target.value)}
          placeholder="Title"
        />
        <Input
          type="textarea"
          name={`description_${i}`}
          value={item.description}
          onChange={(e) =>
            handleListItemChange(i, "description", e.target.value)
          }
          placeholder="Description"
        />
      </div>
    ));

  return (
    <div className="space-y-2 flex gap-2 ">
      <div className="space-y-2">
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
            handleInputChange(component, index, "description", content)
          }
        />
      </div>

      <div className="grid gap-2">
        {renderListItems()}
        <Button onClick={addListItem} className="h-10">
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default StickyScrollLayout;
