"use client";

import { useEffect, useRef, useState } from "react";

export function WaterBackground() {
	const animationFrameRef = useRef<number | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const context = canvas.getContext("2d");
		if (!context) {
			return;
		}

		const drawScene = (scrollY: number) => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			context.clearRect(0, 0, width, height);

			const gradient = context.createLinearGradient(0, 0, 0, height);
			gradient.addColorStop(0, "rgba(248, 252, 255, 0.95)");
			gradient.addColorStop(1, "rgba(220, 239, 252, 0.98)");
			context.fillStyle = gradient;
			context.fillRect(0, 0, width, height);

			const wavesCount = 6;
			for (let layer = 0; layer < wavesCount; layer += 1) {
				const layerRatio = layer / wavesCount;
				const baseY = height * (0.2 + layerRatio * 0.16);
				const waveAmplitudeBase = 6 + layer * 1.0;
				const frequency = 0.0065 + layer * 0.0011;
				const scrollPhase = scrollY * (0.03 + layer * 0.0012);

				context.beginPath();
				context.moveTo(0, height);
				context.lineTo(0, baseY);

				for (let x = 0; x <= width; x += 9) {
					const distanceToCenter = Math.abs(x - width * 0.5);
					const horizontalInfluence = Math.max(
						0,
						1 - distanceToCenter / (width * 0.58),
					);
					const waveAmplitude =
						waveAmplitudeBase * (0.72 + horizontalInfluence * 0.28);
					const y =
						baseY +
						Math.sin(x * frequency + scrollPhase + layer * 0.8) * waveAmplitude;

					context.lineTo(x, y);
				}

				context.lineTo(width, height);
				context.closePath();

				context.fillStyle = `rgba(0, 91, 159, ${0.055 + layer * 0.022})`;
				context.fill();
			}

			const light = context.createRadialGradient(
				width * 0.3,
				height * 0.26,
				0,
				width * 0.3,
				height * 0.26,
				Math.max(width, height) * 0.52,
			);
			light.addColorStop(0, "rgba(120, 190, 255, 0.16)");
			light.addColorStop(1, "rgba(120, 190, 255, 0)");
			context.fillStyle = light;
			context.fillRect(0, 0, width, height);
		};

		const resize = () => {
			const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.4);
			const { innerWidth, innerHeight } = window;
			canvas.width = Math.floor(innerWidth * devicePixelRatio);
			canvas.height = Math.floor(innerHeight * devicePixelRatio);
			canvas.style.width = `${innerWidth}px`;
			canvas.style.height = `${innerHeight}px`;
			context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

			drawScene(reducedMotion ? 0 : window.scrollY);
		};

		const applyScrollParallax = () => {
			isTickingRef.current = false;
			drawScene(pendingScrollRef.current);
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

		resize();
		window.addEventListener("resize", resize);

		if (!reducedMotion) {
			onScroll();
			window.addEventListener("scroll", onScroll, { passive: true });
		}

		return () => {
			window.removeEventListener("resize", resize);
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
			<canvas ref={canvasRef} className='water-bg-canvas' />
		</div>
	);
}
