"use client";
import { Href, ImagePath, Logout } from "@/Constant";
import { UserProfileData } from "@/Data/Layout";
import api from "@/Config/axiosConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";
import Cookies from "js-cookie";

export const Profile = () => {
  const router = useRouter();

  const LogOutUser = async () => {
    try {
      const logout = await api.post("/auth/logout");
      // Remove the tokens from cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");

      // Redirect the user to the login page
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
          alt=""
        />
        <div className="flex-grow-1">
          <span>Bittu Kumar</span>
          <p className="mb-0 font-outfit">
            Software Engineer<i className="fa fa-angle-down"></i>
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
        <li onClick={LogOutUser}>
          <Link href={Href} scroll={false}>
            <LogOut />
            <span>{Logout} </span>
          </Link>
        </li>
      </ul>
    </li>
  );
};
