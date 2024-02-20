import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AuthSession from "@/app/_component/AuthSession";
import "@/style/globals.scss";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100", "400", "700"],
});

export const metadata: Metadata = {
	title: "MovieFolio",
	description: "capturing your cinematic journey",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<AuthSession>{children}</AuthSession>
			</body>
		</html>
	);
}
