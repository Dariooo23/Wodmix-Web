"use client";

import { usePathname } from "next/navigation";

interface PageFogRevealProps {
	children: React.ReactNode;
}

export function PageFogReveal({ children }: PageFogRevealProps) {
	const pathname = usePathname();

	return (
		<div key={pathname} className='fog-reveal-page'>
			{children}
		</div>
	);
}
