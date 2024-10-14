"use client";
import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable as PangeaDraggable,
  DropResult,
} from "@hello-pangea/dnd";
import { RootState } from "@/redux/store";
import {
  setSelectedComponents,
  setBodyData,
} from "@/redux/reducers/floatingWidgetSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Badge, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import CommonCardHeader from "@/commonComponent/commonCardHeader";
import Swal from "sweetalert2";

const FloatingWidget: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const selectedComponents = useAppSelector(
    (state: RootState) => state.floatingWidget.selectedComponents
  );
  const bodyData = useAppSelector(
    (state: RootState) => state.floatingWidget.bodyData
  );
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;

    // Reorder selectedComponents
    const items = Array.from(selectedComponents);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    dispatch(setSelectedComponents(items));

    // Reorder bodyData in the same way
    const bodyDataItems = Array.from(bodyData);
    const [reorderedBodyDataItem] = bodyDataItems.splice(source.index, 1);
    bodyDataItems.splice(destination.index, 0, reorderedBodyDataItem);
    setBodyData(bodyDataItems);
    dispatch(setBodyData(bodyDataItems));
  };

  const handleRemoveComponent = (index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this component!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedComponents = selectedComponents.filter(
          (_, i) => i !== index
        );
        const updatedBodyData = bodyData.filter((_, i) => i !== index);
        dispatch(setSelectedComponents(updatedComponents));
        dispatch(setBodyData(updatedBodyData));
        Swal.fire("Deleted!", "Component has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <Card className="z-999">
        <CommonCardHeader
          title="Structure"
          span={[
            {
              text: "Align Components",
            },
          ]}
        />
        <CardBody className="p-3">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="floating-components">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {selectedComponents.length === 0 ? (
                    <div>No components selected.</div>
                  ) : (
                    selectedComponents.map((component, index) => (
                      <>
                        <PangeaDraggable
                          key={component.id}
                          draggableId={component.id}
                          index={index}
                        >
                          {(provided) => (
                            <ListGroup>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <ListGroupItem
                                  key={component.id}
                                  className="p-2 d-flex justify-content-between align-items-center flex-wrap"
                                >
                                  <div>
                                    <i className="icofont icofont-arrow-right"></i>
                                    {component.componentName}
                                  </div>

                                  <Badge
                                    color="danger"
                                    pill
                                    className="p-2 flex justify-center cursor-pointer"
                                    onClick={() => handleRemoveComponent(index)}
                                  >
                                    <i className="icofont icofont-ui-delete m-0"></i>
                                  </Badge>
                                </ListGroupItem>
                              </div>
                            </ListGroup>
                          )}
                        </PangeaDraggable>
                      </>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardBody>
      </Card>
    </>
  );
};

export default FloatingWidget;
