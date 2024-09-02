"use client";
import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { BodyDataItem } from "@/Types/PageBodyDataType"; // Ensure correct import

interface FloatingWidgetProps {
  selectedComponents: BodyDataItem[];
  setSelectedComponents: (components: BodyDataItem[]) => void;
  setBodyData: (bodyData: BodyDataItem[]) => void;
  bodyData: BodyDataItem[];
}

const FloatingWidget: React.FC<FloatingWidgetProps> = ({
  selectedComponents,
  setSelectedComponents,
  setBodyData,
  bodyData,
}) => {
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

  return (
    <div className="floating-widget">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="floating-components">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {selectedComponents.map((component, index) => (
                <Draggable
                  key={component.id}
                  draggableId={component.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="floating-item"
                    >
                      {component.componentName}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FloatingWidget;
