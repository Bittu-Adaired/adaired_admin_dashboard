import React, { useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

// Components
import IntroComponent from "../Intro";
import FAQComponent from "../FAQ";

interface RenderSelectedInputFieldsProps {
  selectedComponents: string[];
  setSelectedComponents: (components: string[]) => void;
  setBodyData: (bodyData: BodyDataItem[]) => void;
  bodyData: BodyDataItem[];
}

interface BodyDataItem {
  componentName: string;
  body: { [inputName: string]: any };
}

const RenderSelectedInputFields: React.FC<RenderSelectedInputFieldsProps> = ({
  selectedComponents,
  setSelectedComponents,
  setBodyData,
  bodyData,
}) => {
  const handleInputChange = (
    component: string,
    index: number,
    inputName: string,
    value: any
  ) => {
    const newData = [...bodyData];
    if (!newData[index]) {
      newData[index] = { componentName: component, body: {} };
    }
    newData[index].body = {
      ...newData[index].body,
      [inputName]: value,
    };
    setBodyData(newData);
  };

  const handleDelete = (index: number) => {
    const newData = selectedComponents.filter((_, i) => i !== index);
    const newBodyData = bodyData.filter((_, i) => i !== index);
    setSelectedComponents(newData);
    setBodyData(newBodyData);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;

    // Reorder selectedComponents
    const items = Array.from(selectedComponents);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setSelectedComponents(items);

    // Reorder bodyData in the same way
    const bodyDataItems = Array.from(bodyData);
    const [reorderedBodyDataItem] = bodyDataItems.splice(source.index, 1);
    bodyDataItems.splice(destination.index, 0, reorderedBodyDataItem);
    setBodyData(bodyDataItems);
  };

  console.log(bodyData)

  const renderInputFields = (component: string, index: number) => {
    const commonProps = { component, index, handleInputChange, bodyData };
    switch (component) {
      case "Intro":
        return <IntroComponent {...commonProps} />;
      case "FAQ":
        return <FAQComponent {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="components">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {selectedComponents.map((component, index) => (
              <Draggable
                key={`${component}-${index}`}
                draggableId={`${component}-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="rounded-lg dashed border-1 p-3 mb-3"
                    key={index} 
                  >
                    <FormGroup>
                      <div className="common-space">
                        <Label check>{component}:</Label>

                        <div>
                          <span
                            className="task-action-btn action-box large pointer "
                            title="Move Component"
                            {...provided.dragHandleProps}
                          >
                            <i className="icon">
                              <i className="fa fa-arrows-alt"> Move</i>
                            </i>
                          </span>
                        </div>
                        <span
                          className="task-action-btn action-box large delete-btn pointer "
                          title="Delete Component"
                          onClick={() => handleDelete(index)}
                        >
                          <i className="icon">
                            <i className="icon-trash text-danger"></i>
                          </i>
                        </span>
                      </div>
                      {renderInputFields(component, index)}
                    </FormGroup>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RenderSelectedInputFields;
