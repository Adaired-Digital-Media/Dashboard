import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { FormGroup, Label } from "reactstrap";
import { BodyDataItem } from "@/types/pageType";

interface DragDropComponentProps {
  items: BodyDataItem[];
  onReorder: (reorderedItems: BodyDataItem[]) => void;
  onDelete: (index: number) => void;
  renderComponent: (component: BodyDataItem, index: number) => React.ReactNode;
}

const DragDropComponent: React.FC<DragDropComponentProps> = ({
  items,
  onReorder,
  onDelete,
  renderComponent,
}) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    onReorder(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="components">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="rounded-lg dashed border-1 p-3 mb-3"
                  >
                    <FormGroup>
                      <div className="common-space">
                        <Label check>{item.label}:</Label>
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
                          onClick={() => onDelete(index)}
                        >
                          <i className="icon">
                            <i className="icon-trash text-danger"></i>
                          </i>
                        </span>
                      </div>
                      {renderComponent(item, index)}
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

export default DragDropComponent;
