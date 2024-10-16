/* eslint-disable @next/next/no-img-element */
"use client";
import { ImagePath, Logout } from "@/constant";
import { UserProfileData } from "@/data/Layout";
import api from "@/config/axiosConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";
import { getCookie, deleteCookie } from "cookies-next";

export const Profile = () => {
  const router = useRouter();

  const userData = JSON.parse(getCookie("userData") || "");

  const LogOutUser = async () => {
    try {
      await api.post("/auth/logout");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("userData");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <li className="profile-nav onhover-dropdown px-0 py-0">
      <div className="d-flex profile-media align-items-center">
        <img
          className="img-40 rounded-circle bg-gray"
          src={`${ImagePath}/dashboard-4/user.png`}
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
