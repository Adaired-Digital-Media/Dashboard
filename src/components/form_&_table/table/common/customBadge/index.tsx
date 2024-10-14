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
    <Badge pill={pill} color={color} className={`text-capitalize ${className}`}>
      {text}
    </Badge>
  );
};

export default CustomBadge;
