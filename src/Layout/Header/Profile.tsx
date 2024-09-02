"use client";
import { Href, ImagePath, Logout } from "@/Constant";
import { UserProfileData } from "@/Data/Layout";
import { useAppSelector } from "@/Redux/Hooks";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";

export const Profile = () => {
  const router = useRouter();
  // const LogOutUser = () => {
  //   Cookies.remove("ad_access");
  //   router.push("/auth/login");
  // };

  const LogOutUser = async () => {
    try {
      // Make a request to the logout endpoint
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });

      // Clear cookies on the client side
      Cookies.remove("ad_access");

      // Redirect to login page
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
