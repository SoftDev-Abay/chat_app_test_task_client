import React from "react";

export type SidebarItemProps = {
  href: string;
  icon: React.ReactNode;
  extraClasses?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  extraClasses = "",
  ...props
}) => {
  return (
    <div
      {...props}
      className={`flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300 ${extraClasses} ${
        props.className || ""
      }`}
    >
      {icon}
    </div>
  );
};

export default SidebarItem;
