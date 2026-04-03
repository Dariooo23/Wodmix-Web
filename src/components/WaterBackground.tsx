"use client";

import { useEffect, useRef, useState } from "react";

type Ripple = {
	x: number;
	y: number;
	strength: number;
	age: number;
	speed: number;
	wavelength: number;
};

export function WaterBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const ripplesRef = useRef<Ripple[]>([]);
	const pointerRef = useRef({ x: 0, y: 0, active: false });
	const smoothPointerRef = useRef({ x: 0, y: 0 });
	const previousFrameTimeRef = useRef<number | null>(null);
	const lastEmitTimeRef = useRef(0);
	const lastPointerSampleRef = useRef<{
		x: number;
		y: number;
		time: number;
	} | null>(null);
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
			const now = performance.now();

			pointerRef.current.x = pointerX;
			pointerRef.current.y = pointerY;
			pointerRef.current.active = true;

			let movementStrength = 0.7;
			const lastSample = lastPointerSampleRef.current;
			if (lastSample) {
				const deltaTime = Math.max(16, now - lastSample.time);
				const distance = Math.hypot(
					pointerX - lastSample.x,
					pointerY - lastSample.y,
				);
				const velocity = distance / deltaTime;
				movementStrength = Math.min(1.2, 0.35 + velocity * 1.1);
			}

			if (now - lastEmitTimeRef.current > 100) {
				ripplesRef.current.push({
					x: pointerX,
					y: pointerY,
					strength: movementStrength,
					age: 0,
					speed: 135 + Math.random() * 55,
					wavelength: 160 + Math.random() * 60,
				});
				lastEmitTimeRef.current = now;
			}

			lastPointerSampleRef.current = { x: pointerX, y: pointerY, time: now };

			if (ripplesRef.current.length > 6) {
				ripplesRef.current.shift();
			}
		};

		const drawWaves = (time: number) => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const previousFrameTime = previousFrameTimeRef.current ?? time;
			const deltaTimeSeconds = Math.min(
				0.033,
				(time - previousFrameTime) / 1000,
			);
			previousFrameTimeRef.current = time;

			context.clearRect(0, 0, width, height);

			const gradient = context.createLinearGradient(0, 0, 0, height);
			gradient.addColorStop(0, "rgba(248, 252, 255, 0.95)");
			gradient.addColorStop(1, "rgba(210, 234, 252, 0.98)");
			context.fillStyle = gradient;
			context.fillRect(0, 0, width, height);

			smoothPointerRef.current.x +=
				(pointerRef.current.x - smoothPointerRef.current.x) * 0.08;
			smoothPointerRef.current.y +=
				(pointerRef.current.y - smoothPointerRef.current.y) * 0.08;

			const pointerX = smoothPointerRef.current.x;
			const pointerY = smoothPointerRef.current.y;

			ripplesRef.current = ripplesRef.current
				.map(ripple => ({
					...ripple,
					age: ripple.age + deltaTimeSeconds,
				}))
				.filter(ripple => ripple.age < 2.4);

			const wavesCount = 6;
			for (let layer = 0; layer < wavesCount; layer += 1) {
				const layerRatio = layer / wavesCount;
				const baseY = height * (0.2 + layerRatio * 0.16);
				const waveAmplitudeBase = 6 + layer * 1.0;
				const pointerInfluence =
					1 - Math.min(Math.abs(pointerY - baseY) / (height * 0.5), 1);
				const waveAmplitude = waveAmplitudeBase + pointerInfluence * 10;
				const frequency = 0.0065 + layer * 0.0011;
				const speed = 0.00075 + layer * 0.00017;

				context.beginPath();
				context.moveTo(0, height);
				context.lineTo(0, baseY);

				for (let x = 0; x <= width; x += 8) {
					const distanceToPointer = Math.abs(x - pointerX);
					const horizontalInfluence = Math.max(
						0,
						1 - distanceToPointer / (width * 0.55),
					);

					let disturbanceOffset = 0;
					for (const ripple of ripplesRef.current) {
						const waveRadius = ripple.age * ripple.speed;
						const distance = Math.hypot(x - ripple.x, baseY - ripple.y);
						const frontDistance = distance - waveRadius;
						if (Math.abs(frontDistance) > ripple.wavelength * 2.4) {
							continue;
						}

						const crest = Math.exp(
							-(
								(frontDistance * frontDistance) /
								(2 * ripple.wavelength * ripple.wavelength)
							),
						);
						const trough = Math.exp(
							-(
								((frontDistance + ripple.wavelength * 0.9) *
									(frontDistance + ripple.wavelength * 0.9)) /
								(2 * (ripple.wavelength * 1.3) * (ripple.wavelength * 1.3))
							),
						);

						disturbanceOffset +=
							(crest - trough * 0.35) *
							ripple.strength *
							(1 + layer * 0.12) *
							2.85;
					}

					const y =
						baseY +
						Math.sin(x * frequency + time * speed + layer * 0.8) *
							waveAmplitude *
							(0.45 + horizontalInfluence * 0.55) +
						disturbanceOffset;

					context.lineTo(x, y);
				}

				context.lineTo(width, height);
				context.closePath();

				context.fillStyle = `rgba(0, 91, 159, ${0.055 + layer * 0.022})`;
				context.fill();
			}

			const light = context.createRadialGradient(
				pointerX,
				pointerY,
				0,
				pointerX,
				pointerY,
				Math.max(width, height) * 0.2,
			);
			light.addColorStop(0, "rgba(120, 190, 255, 0.19)");
			light.addColorStop(1, "rgba(120, 190, 255, 0)");
			context.fillStyle = light;
			context.fillRect(0, 0, width, height);

			animationFrameRef.current = window.requestAnimationFrame(drawWaves);
		};

		resize();
		animationFrameRef.current = window.requestAnimationFrame(drawWaves);

		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", onPointerMove, { passive: true });

		return () => {
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", onPointerMove);
			previousFrameTimeRef.current = null;
			lastPointerSampleRef.current = null;
			lastEmitTimeRef.current = 0;
			ripplesRef.current = [];
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
