"use client";
import React from "react";
import { Badge } from "reactstrap";
type CustomBadgeProps = {
  color?: string;
  text: string;
  className?: string;
  pill?: boolean;
};

const CustomBadge: React.FC<CustomBadgeProps> = ({
  color,
  text,
  className,
  pill,
}) => {
  return (
    <Badge
      color=""
      className={`text-capitalize badge-light-${color} ${className}`}
    >
      {text}
    </Badge>
  );
};

export default CustomBadge;
