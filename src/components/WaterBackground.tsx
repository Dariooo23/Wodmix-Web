"use client";

import { useEffect, useRef, useState } from "react";

export function WaterBackground() {
	const animationFrameRef = useRef<number | null>(null);
	const layerBackRef = useRef<HTMLDivElement | null>(null);
	const layerMiddleRef = useRef<HTMLDivElement | null>(null);
	const layerFrontRef = useRef<HTMLDivElement | null>(null);
	const pendingScrollRef = useRef(0);
	const isTickingRef = useRef(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateReducedMotion = () => setReducedMotion(mediaQuery.matches);

		updateReducedMotion();
		mediaQuery.addEventListener("change", updateReducedMotion);

		return () => mediaQuery.removeEventListener("change", updateReducedMotion);
	}, []);

	useEffect(() => {
		if (reducedMotion) {
			return;
		}

		const applyScrollParallax = () => {
			isTickingRef.current = false;
			const scrollY = pendingScrollRef.current;

			if (layerBackRef.current) {
				layerBackRef.current.style.transform = `translate3d(0, ${scrollY * 0.03}px, 0)`;
			}
			if (layerMiddleRef.current) {
				layerMiddleRef.current.style.transform = `translate3d(0, ${scrollY * 0.06}px, 0)`;
			}
			if (layerFrontRef.current) {
				layerFrontRef.current.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
			}
		};

		const onScroll = () => {
			pendingScrollRef.current = window.scrollY;
			if (isTickingRef.current) {
				return;
			}

			isTickingRef.current = true;
			animationFrameRef.current =
				window.requestAnimationFrame(applyScrollParallax);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			isTickingRef.current = false;
			pendingScrollRef.current = 0;
			if (animationFrameRef.current !== null) {
				window.cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [reducedMotion]);

	return (
		<div className='water-bg' aria-hidden='true'>
			<div className='water-bg-base' />
			<div
				ref={layerBackRef}
				className={`water-bg-layer water-bg-wave-back ${reducedMotion ? "water-bg-wave-static" : ""}`}
			/>
			<div
				ref={layerMiddleRef}
				className={`water-bg-layer water-bg-wave-middle ${reducedMotion ? "water-bg-wave-static" : ""}`}
			/>
			<div
				ref={layerFrontRef}
				className={`water-bg-layer water-bg-wave-front ${reducedMotion ? "water-bg-wave-static" : ""}`}
			/>
		</div>
	);
}
