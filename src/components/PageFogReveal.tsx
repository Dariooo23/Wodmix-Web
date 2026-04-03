"use client";

import { usePathname } from "next/navigation";

interface PageFogRevealProps {
	children: React.ReactNode;
}

export function PageFogReveal({ children }: PageFogRevealProps) {
	const pathname = usePathname();
	const isSubpage = pathname !== "/";

	return (
		<div key={pathname} className={isSubpage ? "fog-reveal-page" : undefined}>
			{children}
		</div>
	);
}
