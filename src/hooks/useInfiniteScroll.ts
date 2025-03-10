import { useEffect, useRef } from "react";

export default function useInfiniteScroll(
  callback: () => void,
  options?: IntersectionObserverInit,
  enabled: boolean = true
) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, options, enabled]);

  return observerRef;
}
