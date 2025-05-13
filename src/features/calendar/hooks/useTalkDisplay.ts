import { useState, useEffect, useRef } from "react";

/**
 * Handle responsive display logic for talk items
 */
export function useTalkDisplay() {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [isTitleTruncated, setIsTitleTruncated] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      if (!cardRef.current) return;
      setIsCompact(cardRef.current.offsetWidth < 150);
    };

    const checkTitleTruncation = () => {
      if (!titleRef.current) return;
      setIsTitleTruncated(
        titleRef.current.scrollWidth > titleRef.current.clientWidth,
      );
    };

    const updateMeasurements = () => {
      checkWidth();
      checkTitleTruncation();
    };

    updateMeasurements();

    // Capture current element reference
    const currentCard = cardRef.current;

    const observer = new ResizeObserver(updateMeasurements);
    if (currentCard) observer.observe(currentCard);

    return () => {
      // Use the captured reference in cleanup
      if (currentCard) observer.unobserve(currentCard);
    };
  }, []);

  return {
    cardRef,
    titleRef,
    isCompact,
    isTitleTruncated,
    needsTooltip: isCompact || isTitleTruncated,
  };
}
