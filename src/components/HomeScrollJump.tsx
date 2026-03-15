"use client";

import { useEffect, useRef } from "react";

interface HomeScrollJumpProps {
  targetIds: string[];
  offset?: number;
}

export const HomeScrollJump = ({
  targetIds,
  offset = 0,
}: HomeScrollJumpProps) => {
  const activeTargetIndexRef = useRef<number | null>(null);
  const targetScrollTopRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const getTargets = () =>
      targetIds
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);

    const stopAnimation = () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const runAnimation = () => {
      if (animationFrameRef.current !== null) {
        return;
      }

      const tick = () => {
        const targetScrollTop = targetScrollTopRef.current;
        if (targetScrollTop === null) {
          stopAnimation();
          return;
        }

        const currentScrollTop = window.scrollY;
        const distance = targetScrollTop - currentScrollTop;

        if (Math.abs(distance) < 0.8) {
          window.scrollTo({ top: targetScrollTop, behavior: "auto" });
          stopAnimation();
          return;
        }

        const easingFactor = 0.09;
        const maxStepPerFrame = 32;
        const rawStep = Math.abs(distance) * easingFactor;
        const clampedStep = Math.min(maxStepPerFrame, rawStep);
        const step = Math.sign(distance) * clampedStep;
        const nextScrollTop = currentScrollTop + step;

        window.scrollTo({ top: nextScrollTop, behavior: "auto" });
        animationFrameRef.current = window.requestAnimationFrame(tick);
      };

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    const getCurrentTargetIndex = (targets: HTMLElement[]) => {
      const maxScrollTop = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );

      if (maxScrollTop - window.scrollY < 2) {
        return targets.length - 1;
      }

      const currentScroll = window.scrollY + offset + 24;
      let index = -1;

      for (let i = 0; i < targets.length; i += 1) {
        const top = targets[i].getBoundingClientRect().top + window.scrollY;
        if (top <= currentScroll) {
          index = i;
        }
      }

      return index;
    };

    const scrollToTarget = (direction: "down" | "up") => {
      const targets = getTargets();
      if (targets.length === 0) {
        return;
      }

      const currentIndex = getCurrentTargetIndex(targets);
      const activeIndex = activeTargetIndexRef.current ?? currentIndex;
      const baseIndex =
        direction === "down"
          ? Math.max(activeIndex, currentIndex)
          : Math.min(activeIndex, currentIndex);

      const nextIndex =
        direction === "down"
          ? Math.min(baseIndex + 1, targets.length - 1)
          : Math.max(baseIndex - 1, -1);

      if (nextIndex === baseIndex) {
        return;
      }

      activeTargetIndexRef.current = nextIndex;
      const scrollTop =
        nextIndex === -1
          ? 0
          : Math.max(
              0,
              targets[nextIndex].getBoundingClientRect().top +
                window.scrollY -
                offset,
            );

      targetScrollTopRef.current = scrollTop;
      runAnimation();
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) {
        return;
      }

      event.preventDefault();
      scrollToTarget(event.deltaY > 0 ? "down" : "up");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const isScrollDownKey =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " " ||
        event.key === "Spacebar";
      const isScrollUpKey = event.key === "ArrowUp" || event.key === "PageUp";

      if (!isScrollDownKey && !isScrollUpKey) {
        return;
      }

      event.preventDefault();
      scrollToTarget(isScrollDownKey ? "down" : "up");
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchStartY = touchStartYRef.current;
      const touchEndY = event.changedTouches[0]?.clientY ?? null;

      if (touchStartY === null || touchEndY === null) {
        touchStartYRef.current = null;
        return;
      }

      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) < 30) {
        touchStartYRef.current = null;
        return;
      }

      scrollToTarget(deltaY > 0 ? "down" : "up");
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      stopAnimation();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [offset, targetIds]);

  return null;
};
