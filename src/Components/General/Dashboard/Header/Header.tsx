import { DashboardCommonHeaderType } from "@/Types/DashboardType";
import React, { useState } from "react";
import { CardHeader } from "reactstrap";
import { CommonDropdown } from "./Dropdown";

const Header: React.FC<DashboardCommonHeaderType> = ({
  title,
  tagClass,
  dropDownFalse,
  children,
}) => {
  return (
    <CardHeader className="card-no-border pb-0 d-flex justify-content-between">
      <h4 className={tagClass ? tagClass : ""}>{title}</h4>
      {!dropDownFalse ? <CommonDropdown /> : null}
      {children}
    </CardHeader>
  );
};

export default Header;
