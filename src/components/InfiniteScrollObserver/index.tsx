import React from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface InfiniteScrollObserverProps {
  onIntersect: () => void;
  className?: string;
  enabled?: boolean;
}

const InfiniteScrollObserver: React.FC<InfiniteScrollObserverProps> = ({
  onIntersect,
  className = "",
  enabled = true,
}) => {
  const observerRef = useInfiniteScroll(
    onIntersect,
    { rootMargin: "100px" },
    enabled
  );
  return <div ref={observerRef} className={className} />;
};

export default InfiniteScrollObserver;