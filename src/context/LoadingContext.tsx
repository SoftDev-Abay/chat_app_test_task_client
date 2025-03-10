import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => setIsLoading(false);
    const end = () => setIsLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return { isLoading, setIsLoading };
};

export const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};
