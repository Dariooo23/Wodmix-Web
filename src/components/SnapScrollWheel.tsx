"use client";

import { useEffect } from "react";

/** Minimalna suma przesunięć kółka/touchpada, która uruchamia krok. */
const STEP_THRESHOLD_PX = 40;
/** Cisza (ms) po ostatnim zdarzeniu wheel, która kończy gest (inercja touchpada). */
const GESTURE_IDLE_MS = 120;
/** Delta pojedynczego „ząbka” kółka myszy (touchpad daje zwykle mniejsze). */
const MOUSE_NOTCH_MIN_PX = 80;
/** Tolerancja przy porównywaniu pozycji przewinięcia. */
const EPSILON_PX = 2;

const LINE_HEIGHT_PX = 16;

const normalizeDeltaY = (event: WheelEvent): number => {
	if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
		return event.deltaY * LINE_HEIGHT_PX;
	}
	if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
		return event.deltaY * window.innerHeight;
	}
	return event.deltaY;
};

/**
 * Pozycje przyciągania wyliczone z tego samego CSS, którego używa
 * przeglądarka (`scroll-snap-align` + `scroll-padding-top`), plus początek
 * i koniec strony (stopka).
 */
const getSnapPositions = (): number[] => {
	const root = document.documentElement;
	const maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
	const paddingTop = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
	const snapportHeight = window.innerHeight - paddingTop;

	const positions = [0, maxScroll];

	document.querySelectorAll<HTMLElement>("[data-snap-point]").forEach(el => {
		const rect = el.getBoundingClientRect();
		const top = rect.top + window.scrollY;
		const align = getComputedStyle(el).scrollSnapAlign.split(" ")[0];

		let position: number;
		if (align === "center") {
			position = top + rect.height / 2 - (paddingTop + snapportHeight / 2);
		} else if (align === "end") {
			position = top + rect.height - window.innerHeight;
		} else {
			position = top - paddingTop;
		}

		positions.push(Math.min(maxScroll, Math.max(0, Math.round(position))));
	});

	return [...new Set(positions)].sort((a, b) => a - b);
};

/**
 * Krokowe przewijanie kółkiem myszy / touchpadem między punktami CSS
 * scroll snap: jeden gest = dokładnie jeden etap.
 *
 * Dlaczego JS tylko dla `wheel`: klawiatura i dotyk działają poprawnie
 * z natywnym `scroll-snap-type: y mandatory`, ale przy kółku Chrome wybiera
 * punkt najbliższy pozycji końcowej — przy etapach oddalonych o ~400 px
 * krótki ruch wraca do poprzedniego punktu („cofa się”), a touchpad
 * z inercją przeskakuje kilka etapów naraz.
 *
 * Kierunek liczony jest zawsze od bieżącej pozycji (bez zapamiętanego
 * indeksu), więc stan nie może się rozjechać z tym, co widać na ekranie.
 */
export const SnapScrollWheel = () => {
	useEffect(() => {
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		let accumulated = 0;
		let lastWheelAt = 0;
		let isAnimating = false;
		let gestureConsumed = false;
		let settleFrame: number | null = null;

		const waitForScrollToSettle = (target: number) => {
			let lastY = window.scrollY;
			let stableFrames = 0;

			const check = () => {
				const y = window.scrollY;
				stableFrames = Math.abs(y - lastY) < 0.5 ? stableFrames + 1 : 0;
				lastY = y;

				if (Math.abs(y - target) <= EPSILON_PX || stableFrames >= 8) {
					isAnimating = false;
					settleFrame = null;
					return;
				}
				settleFrame = window.requestAnimationFrame(check);
			};

			settleFrame = window.requestAnimationFrame(check);
		};

		const step = (direction: 1 | -1): boolean => {
			const current = window.scrollY;
			const positions = getSnapPositions();
			const target =
				direction === 1
					? positions.find(p => p > current + EPSILON_PX)
					: [...positions].reverse().find(p => p < current - EPSILON_PX);

			if (target === undefined) {
				return false;
			}

			isAnimating = true;
			window.scrollTo({
				top: target,
				behavior: reducedMotion.matches ? "auto" : "smooth",
			});
			waitForScrollToSettle(target);
			return true;
		};

		const handleWheel = (event: WheelEvent) => {
			// Ctrl/⌘ + kółko = zoom; gest poziomy — nie przechwytujemy.
			if (event.ctrlKey || event.metaKey) {
				return;
			}
			if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
				return;
			}

			event.preventDefault();

			const now = performance.now();
			const deltaY = normalizeDeltaY(event);
			const isNewGesture = now - lastWheelAt > GESTURE_IDLE_MS;
			lastWheelAt = now;

			if (isNewGesture) {
				accumulated = 0;
				gestureConsumed = false;
			}

			// Zmiana kierunku w trakcie gestu zaczyna liczenie od nowa.
			if (Math.sign(deltaY) !== Math.sign(accumulated)) {
				accumulated = 0;
			}
			accumulated += deltaY;

			// Szybko kręcone kółko myszy daje duże, równe skoki (~100 px) bez
			// przerw — po zakończeniu animacji traktujemy kolejny taki „ząbek”
			// jako nowy krok. Wygasająca inercja touchpada ma małe delty.
			if (
				gestureConsumed &&
				!isAnimating &&
				Math.abs(deltaY) >= MOUSE_NOTCH_MIN_PX
			) {
				gestureConsumed = false;
				accumulated = deltaY;
			}

			// Jeden gest (łącznie z inercją touchpada) = maksymalnie jeden krok.
			if (isAnimating || gestureConsumed) {
				return;
			}

			if (Math.abs(accumulated) >= STEP_THRESHOLD_PX) {
				step(accumulated > 0 ? 1 : -1);
				gestureConsumed = true;
				accumulated = 0;
			}
		};

		window.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			window.removeEventListener("wheel", handleWheel);
			if (settleFrame !== null) {
				window.cancelAnimationFrame(settleFrame);
			}
		};
	}, []);

	return null;
};
