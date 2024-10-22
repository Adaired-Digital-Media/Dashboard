"use client";
import React, { useState } from "react";
import Link from "next/link";
import Swal, { SweetAlertResult } from "sweetalert2";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { MoreVertical } from "react-feather";

interface Identifiable {
  _id: string;
}

interface ActionDataSourceProp<T extends Identifiable> {
  id: string;
  slug: string;
  editUrl: string;
  viewUrl: string;
  handleConfirmDelete: (id: string) => void;
  duplicateFunction: (id: string) => void;
}

const ActionDataSource = <T extends Identifiable>({
  id,
  slug,
  editUrl,
  viewUrl,
  handleConfirmDelete,
  duplicateFunction,
}: ActionDataSourceProp<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // Function to handle the delete action
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        handleConfirmDelete(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        Swal.fire("Your file is safe!");
      }
    });
  };

  const handleDuplicate = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will duplicate the current post and its related content!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, duplicate it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        duplicateFunction(id);
        Swal.fire("Duplicated!", "Your file has been duplicated.", "success");
      } else {
        Swal.fire("Your file is safe!");
      }
    });
  };

  const actions = [
    {
      name: "update",
      icon: <i className="icofont icofont-edit"></i>,
      tooltip: "Edit",
      link: `${editUrl}/${slug}`,
    },
    {
      name: "delete",
      icon: <i className="icofont icofont-ui-delete"></i>,
      tooltip: "Delete",
      onClick: handleDelete,
    },
    {
      name: "duplicate",
      icon: <i className="icofont icofont-ui-copy"></i>,
      tooltip: "Duplicate",
      onClick: handleDuplicate,
    },
    {
      name: "view",
      icon: <i className="icofont icofont-web"></i>,
      tooltip: "View",
      link: `${viewUrl}`,
    },
  ];

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle tag={"div"}>
          <MoreVertical />
        </DropdownToggle>
        <DropdownMenu start>
          {actions.map((action, index) => (
            <DropdownItem key={action.name}>
              {action.link ? (
                <Link href={action.link} className="p-2 d-flex gap-2">
                  {React.cloneElement(action.icon, {
                    id: `Tooltip-${action.name}`,
                  })}
                  {action.tooltip}
                </Link>
              ) : (
                <div onClick={action.onClick} className="p-2 d-flex gap-2">
                  {React.cloneElement(action.icon, {
                    id: `Tooltip-${action.name}`,
                  })}
                  {action.tooltip}
                </div>
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ActionDataSource;
