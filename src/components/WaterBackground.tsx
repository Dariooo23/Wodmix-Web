"use client";

import { useEffect, useRef, useState } from "react";

type Ripple = {
	x: number;
	y: number;
	radius: number;
	alpha: number;
};

export function WaterBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const ripplesRef = useRef<Ripple[]>([]);
	const pointerRef = useRef({ x: 0, y: 0, active: false });
	const smoothPointerRef = useRef({ x: 0, y: 0 });
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

		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const context = canvas.getContext("2d");
		if (!context) {
			return;
		}

		const resize = () => {
			const devicePixelRatio = window.devicePixelRatio || 1;
			const { innerWidth, innerHeight } = window;
			canvas.width = Math.floor(innerWidth * devicePixelRatio);
			canvas.height = Math.floor(innerHeight * devicePixelRatio);
			canvas.style.width = `${innerWidth}px`;
			canvas.style.height = `${innerHeight}px`;
			context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

			if (!pointerRef.current.active) {
				pointerRef.current.x = innerWidth * 0.5;
				pointerRef.current.y = innerHeight * 0.4;
				smoothPointerRef.current.x = pointerRef.current.x;
				smoothPointerRef.current.y = pointerRef.current.y;
			}
		};

		const onPointerMove = (event: PointerEvent) => {
			const pointerX = event.clientX;
			const pointerY = event.clientY;

			pointerRef.current.x = pointerX;
			pointerRef.current.y = pointerY;
			pointerRef.current.active = true;

			ripplesRef.current.push({
				x: pointerX,
				y: pointerY,
				radius: 10,
				alpha: 0.18,
			});

			if (ripplesRef.current.length > 14) {
				ripplesRef.current.shift();
			}
		};

		const drawWaves = (time: number) => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			context.clearRect(0, 0, width, height);

			const gradient = context.createLinearGradient(0, 0, 0, height);
			gradient.addColorStop(0, "rgba(248, 252, 255, 0.95)");
			gradient.addColorStop(1, "rgba(235, 246, 255, 0.95)");
			context.fillStyle = gradient;
			context.fillRect(0, 0, width, height);

			smoothPointerRef.current.x +=
				(pointerRef.current.x - smoothPointerRef.current.x) * 0.08;
			smoothPointerRef.current.y +=
				(pointerRef.current.y - smoothPointerRef.current.y) * 0.08;

			const pointerX = smoothPointerRef.current.x;
			const pointerY = smoothPointerRef.current.y;

			const wavesCount = 6;
			for (let layer = 0; layer < wavesCount; layer += 1) {
				const layerRatio = layer / wavesCount;
				const baseY = height * (0.2 + layerRatio * 0.16);
				const waveAmplitudeBase = 8 + layer * 1.7;
				const pointerInfluence =
					1 - Math.min(Math.abs(pointerY - baseY) / (height * 0.5), 1);
				const waveAmplitude = waveAmplitudeBase + pointerInfluence * 14;
				const frequency = 0.011 + layer * 0.0018;
				const speed = 0.001 + layer * 0.00024;

				context.beginPath();
				context.moveTo(0, height);
				context.lineTo(0, baseY);

				for (let x = 0; x <= width; x += 8) {
					const distanceToPointer = Math.abs(x - pointerX);
					const horizontalInfluence = Math.max(
						0,
						1 - distanceToPointer / (width * 0.55),
					);

					const y =
						baseY +
						Math.sin(x * frequency + time * speed + layer * 0.8) *
							waveAmplitude *
							(0.45 + horizontalInfluence * 0.55);

					context.lineTo(x, y);
				}

				context.lineTo(width, height);
				context.closePath();

				context.fillStyle = `rgba(0, 91, 159, ${0.035 + layer * 0.017})`;
				context.fill();
			}

			const light = context.createRadialGradient(
				pointerX,
				pointerY,
				0,
				pointerX,
				pointerY,
				Math.max(width, height) * 0.4,
			);
			light.addColorStop(0, "rgba(120, 190, 255, 0.16)");
			light.addColorStop(1, "rgba(120, 190, 255, 0)");
			context.fillStyle = light;
			context.fillRect(0, 0, width, height);

			ripplesRef.current = ripplesRef.current
				.map(ripple => ({
					...ripple,
					radius: ripple.radius + 1.8,
					alpha: ripple.alpha * 0.97,
				}))
				.filter(ripple => ripple.alpha > 0.015);

			for (const ripple of ripplesRef.current) {
				context.beginPath();
				context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
				context.strokeStyle = `rgba(0, 91, 159, ${ripple.alpha})`;
				context.lineWidth = 1.2;
				context.stroke();
			}

			animationFrameRef.current = window.requestAnimationFrame(drawWaves);
		};

		resize();
		animationFrameRef.current = window.requestAnimationFrame(drawWaves);

		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onPointerMove, { passive: true });

		return () => {
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onPointerMove);
			if (animationFrameRef.current !== null) {
				window.cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [reducedMotion]);

	if (reducedMotion) {
		return <div className='water-bg water-bg-static' aria-hidden='true' />;
	}

	return (
		<div className='water-bg' aria-hidden='true'>
			<canvas ref={canvasRef} className='water-bg-canvas' />
		</div>
	);
}
