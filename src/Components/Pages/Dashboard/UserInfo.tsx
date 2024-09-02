"use client";
import { Card, CardBody, Col } from "reactstrap";
import { GoodDay } from "@/Constant";
import axiosInstance from "@/Config/axiosConfig";
import { useEffect, useState } from "react";

type UserType = {
  _id: string;
  name: string;
  email: string;
  contact: string;
  isAdmin: boolean;
  avatar: string;
};

const UserInfo = () => {
  const [userData, setUserData] = useState<UserType | null>(null);

  // Fetch user data from the API and update the state with the response data
  const fetchUser = async () => {
    try {
      const data = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refetch`
      );
      setUserData(data.data[0]);
    } catch (error) {
      console.error("Error checking user validity:", error);
      return false;
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
