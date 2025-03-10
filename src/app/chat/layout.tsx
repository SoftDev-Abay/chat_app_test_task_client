import React from "react";
import RootWrapper from "@/pages/Wrappers/Root";
import { SocketProvider } from "@/context/SocketContext";

const ChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SocketProvider>
      <RootWrapper>{children}</RootWrapper>
    </SocketProvider>
  );
};

export default ChatLayout;
