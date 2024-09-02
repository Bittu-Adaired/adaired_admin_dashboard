"use client";
import { Card, CardBody, Col } from "reactstrap";
import { GoodDay } from "@/Constant";
import axiosInstance from "@/Config/axiosConfig";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [userData, setUserData] = useState<UserType | null>(null);

  // Fetch user data from the API and update the state with the response data
  const fetchUser = async () => {
    try {
      // const response = await axiosInstance.get<UserType[]>('/auth/refetch');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refetch`,
        {
          withCredentials: true,
        }
      );

      // Log the request headers, which may include cookies
      console.log("Request Headers:", response.config.headers);

      // Log the response status and data
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.data.length > 0) {
        setUserData(response.data[0]);
      } else {
        console.error("No user data found.");
      }
    } catch (error) {
      console.error("Error checking user validity:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <Col xl="5" md="6" className="proorder-xl-1 proorder-md-1">
      <Card className="profile-greeting p-0">
        <CardBody>
          <div className="img-overlay">
            <h1 className="mt-0">
              {GoodDay}
              {userData?.name}
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
