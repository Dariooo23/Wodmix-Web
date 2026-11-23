import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
	"Wodmix – sklep hydrauliczny i instalacje, Pacanów i Łubnice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Obrazek podglądu linku (Facebook, Messenger, WhatsApp, X, LinkedIn). */
export default async function OpenGraphImage() {
	const logo = await readFile(join(process.cwd(), "public", "logo-full.png"));
	const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(180deg, #ffffff 0%, #e8f1f9 100%)",
				color: "#003f73",
			}}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={logoSrc} width={560} height={200} alt='' />
			<div
				style={{
					marginTop: 36,
					fontSize: 56,
					fontWeight: 800,
					letterSpacing: -1,
				}}>
				Pacanów · Łubnice
			</div>
			<div style={{ marginTop: 16, fontSize: 32, color: "#005b9f" }}>
				Hydraulika · Instalacje · Pompy ciepła · Prace ziemne
			</div>
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: 18,
					background: "#005b9f",
				}}
			/>
		</div>,
		size,
	);
}
