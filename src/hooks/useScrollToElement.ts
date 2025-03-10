import { useRef, useCallback } from "react";

const useScrollToElement = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const scrollToElement = useCallback(
    (options: ScrollIntoViewOptions = { behavior: "smooth", block: "end" }) => {
      elementRef.current?.scrollIntoView(options);
    },
    []
  );

  return { elementRef, scrollToElement };
};

export default useScrollToElement;
