import React from "react";
import { FormGroup, Label } from "reactstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { BodyDataItem } from "@/Types/PageBodyDataType"; // Ensure correct import

// Components
import TwoColumnFeatureSection from "../TwoColumnFeatureSection";
import FAQComponent from "../FAQ";
import ImagewithDetailedFeatureDescription from "../ImagewithDetailedFeatureDescription";

interface RenderSelectedInputFieldsProps {
  selectedComponents: BodyDataItem[];
  setSelectedComponents: (components: BodyDataItem[]) => void;
  setBodyData: (bodyData: BodyDataItem[]) => void;
  bodyData: BodyDataItem[];
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
      newData[index] = {
        componentName: component,
        body: {},
        id: uuidv4().substr(0, 4), // Generate 4-character UUID
      };
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

  const renderInputFields = (component: BodyDataItem, index: number) => {
    const commonProps = {
      component: component.componentName,
      index,
      handleInputChange,
      bodyData,
    };
    switch (component.componentName) {
      case "TwoColumnFeatureSection":
        return <TwoColumnFeatureSection {...commonProps} />;
      case "FAQ":
        return <FAQComponent {...commonProps} />;
      case "ImagewithDetailedFeatureDescription":
        return <ImagewithDetailedFeatureDescription {...commonProps}/>;
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
                key={component.id}
                draggableId={component.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="rounded-lg dashed border-1 p-3 mb-3"
                  >
                    <FormGroup>
                      <div className="common-space">
                        <Label check>{component.label}:</Label>

                        <div>
                          <span
                            className="task-action-btn action-box large pointer"
                            title="Move Component"
                            {...provided.dragHandleProps}
                          >
                            <i className="icon">
                              <i className="fa fa-arrows-alt"> Move</i>
                            </i>
                          </span>
                        </div>
                        <span
                          className="task-action-btn action-box large delete-btn pointer"
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

export default React.memo(RenderSelectedInputFields);

// import React from "react";
// import { FormGroup, Label } from "reactstrap";
// import { v4 as uuidv4 } from "uuid";

// // Components
// import IntroComponent from "../Intro";
// import FAQComponent from "../FAQ";
// import FloatingWidget from "./FloationgWidget"; // Import the FloatingWidget
// import { BodyDataItem } from "@/Types/PageBodyDataType"; // Ensure correct import

// interface RenderSelectedInputFieldsProps {
//   selectedComponents: BodyDataItem[];
//   setSelectedComponents: (components: BodyDataItem[]) => void;
//   setBodyData: (bodyData: BodyDataItem[]) => void;
//   bodyData: BodyDataItem[];
// }

// const RenderSelectedInputFields: React.FC<RenderSelectedInputFieldsProps> = ({
//   selectedComponents,
//   setSelectedComponents,
//   setBodyData,
//   bodyData,
// }) => {
//   const handleInputChange = (
//     component: string,
//     index: number,
//     inputName: string,
//     value: any
//   ) => {
//     const newData = [...bodyData];
//     if (!newData[index]) {
//       newData[index] = {
//         componentName: component,
//         body: {},
//         id: uuidv4().substr(0, 4), // Generate 4-character UUID
//       };
//     }
//     newData[index].body = {
//       ...newData[index].body,
//       [inputName]: value,
//     };
//     setBodyData(newData);
//   };

//   const handleDelete = (index: number) => {
//     const newData = selectedComponents.filter((_, i) => i !== index);
//     const newBodyData = bodyData.filter((_, i) => i !== index);
//     setSelectedComponents(newData);
//     setBodyData(newBodyData);
//   };

//   const renderInputFields = (component: BodyDataItem, index: number) => {
//     const commonProps = {
//       component: component.componentName,
//       index,
//       handleInputChange,
//       bodyData,
//     };
//     switch (component.componentName) {
//       case "Intro":
//         return <IntroComponent {...commonProps} />;
//       case "FAQ":
//         return <FAQComponent {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <FloatingWidget
//         selectedComponents={selectedComponents}
//         setSelectedComponents={setSelectedComponents}
//         setBodyData={setBodyData}
//         bodyData={bodyData}
//       />
//       {selectedComponents.map((component, index) => (
//         <div key={component.id} className="rounded-lg dashed border-1 p-3 mb-3">
//           <FormGroup>
//             <div className="common-space">
//               <Label check>{component.componentName}:</Label>
//               <span
//                 className="task-action-btn action-box large delete-btn pointer"
//                 title="Delete Component"
//                 onClick={() => handleDelete(index)}
//               >
//                 <i className="icon">
//                   <i className="icon-trash text-danger"></i>
//                 </i>
//               </span>
//             </div>
//             {renderInputFields(component, index)}
//           </FormGroup>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default React.memo(RenderSelectedInputFields);
