"use client";
import { useRouter } from "next/navigation";
import { UseUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const router = useRouter();
  const user = UseUserStore((state) => state.currentUser);

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (rendered && !user) {
      router.push("/login");
    }
  }, [user, rendered, router]); 

  const content = user ? children : null;

  return <>{content}</>;
};

export default RequireAuth;
