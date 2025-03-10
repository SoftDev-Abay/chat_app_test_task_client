"use client";

import React from "react";
import {
  FaHome,
  FaFileAlt,
  FaEnvelope,
  FaTachometerAlt,
  FaSlidersH,
} from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";
import { UseUserStore } from "@/store/useUserStore";
import { cn } from "@/utils/helpers";

type SidebarProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  const router = useRouter();

  const logout = () => {
    UseUserStore.getState().setCurrentUser(null);
    router.push("/login");
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center w-16 pb-4 overflow-auto border-r border-gray-300",
        className
      )}
      {...props}
    >
      <a
        className="flex items-center justify-center flex-shrink-0 w-full h-16  bg-gray-300"
        href="#"
      >
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          ></path>
        </svg>
      </a>

      <SidebarItem
        href="#"
        icon={<FaHome size={18} className="text-gray-600" />}
      />
      <SidebarItem
        href="#"
        icon={<FaFileAlt size={18} className="text-gray-600" />}
      />
      <SidebarItem
        href="#"
        icon={<FaEnvelope size={18} className="text-gray-600" />}
      />
      <SidebarItem
        href="#"
        icon={<FaTachometerAlt className="text-gray-600" size={18} />}
      />
      <SidebarItem
        href="#"
        icon={<FaSlidersH size={18} className="text-gray-600" />}
      />

      <SidebarItem
        href="#"
        className="mt-auto"
        icon={
          <FaRightFromBracket
            size={18}
            className="text-gray-600"
            onClick={logout}
          />
        }
      />
    </div>
  );
};

export default Sidebar;
