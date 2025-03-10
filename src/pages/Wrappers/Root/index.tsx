import React from "react";
import Sidebar from "./Sidebar";
import RequireAuth from "@/pages/Login/RequireAuth";
const RootWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <RequireAuth>
      <div className="flex w-screen h-screen text-gray-700">
        <Sidebar className="max-lg:hidden" />
        <>{children}</>
      </div>
    </RequireAuth>
  );
};

export default RootWrapper;
