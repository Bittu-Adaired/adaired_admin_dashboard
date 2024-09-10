"use client";
import { Card, CardBody, Col } from "reactstrap";
import { GoodDay } from "@/Constant";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type UserType = {
  _id: string;
  name: string;
  email: string;
  userName: string;
  contact: string;
  userStatus: boolean;
  isAdmin: boolean;
  role: {
    _id?: string;
    roleName?: string;
    roleDescription?: string;
    roleStatus?: boolean;
    rolePermissions?: {
      entityName: string;
      entityValues: number[];
      _id: string;
    }[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  } | null;
};

const UserInfo = () => {
  const user = JSON.parse(Cookies.get("userData") ?? "{}");

  if (!user) {
    return null; // Return early if user data is not available
  }

  return (
    <Col xl="5" md="6" className="proorder-xl-1 proorder-md-1">
      <Card className="profile-greeting p-0">
        <CardBody>
          <div className="img-overlay">
            <h1 className="mt-0">
              {GoodDay}
              {user?.name}
            </h1>
            <p>
              Welcome to the Adaired family! We are delighted that you have
              visited our dashboard.
            </p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserInfo;
