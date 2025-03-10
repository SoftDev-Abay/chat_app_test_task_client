import { RefObject, useEffect } from "react";

const debounce = (func: () => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(), wait);
  };
};

const useIntersectionObserver = (
  elementRef: RefObject<HTMLElement | null>,
  callback: () => void,
  options?: IntersectionObserverInit,
  debounceDelay: number = 2000
) => {
  useEffect(() => {
    if (!elementRef) return;
    const target = elementRef.current;
    if (!target) return;

    const debouncedCallback = debounce(callback, debounceDelay);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        debouncedCallback();
      }
    }, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, callback, options, debounceDelay]);
};

export default useIntersectionObserver;
