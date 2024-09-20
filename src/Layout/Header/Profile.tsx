/* eslint-disable @next/next/no-img-element */
"use client";
import { ImagePath, Logout } from "@/Constant";
import { UserProfileData } from "@/Data/Layout";
import api from "@/Config/axiosConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";
import Cookies from "js-cookie";
import { useState } from "react";

export const Profile = () => {
  const router = useRouter();
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const userData = JSON.parse(Cookies.get("userData") || "");
  console.log(userData);

  const LogOutUser = async () => {
    try {
      const logout = await api.post("/auth/logout");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <li className="profile-nav onhover-dropdown px-0 py-0">
      <div className="d-flex profile-media align-items-center">
        <img
          className="img-30 rounded-circle"
          src={`${ImagePath}/dashboard/profile.jpg`}
          alt="Profile"
        />
        <div className="flex-grow-1">
          <span>{userData.name}</span>
          <p className="mb-0 font-outfit">
            {userData.email}
            <i className="fa fa-angle-down"></i>
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {UserProfileData.map((item, index) => (
          <li key={index}>
            <Link href={`/${item.link}`}>
              {item.icon}
              <span>{item.title} </span>
            </Link>
          </li>
        ))}
        <li
          className="cursor-pointer d-flex align-items-center"
          onClick={LogOutUser}
        >
          <LogOut />
          <span>{Logout} </span>
        </li>
      </ul>
    </li>
  );
};
