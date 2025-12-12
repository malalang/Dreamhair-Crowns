import type { Metadata } from 'next';
import './globals.css';


import Navbar from '@/components/Navbar/Navbar';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
	title: 'DREAMHAIR CROWNS | Premium Wigs & Hair Extensions',
	description: "Shop premium Brazilian hair, exclusive wigs, and electronic styling tools. Crown yourself in luxury with DREAMHAIR CROWNS.",
	keywords: ['Brazilian Hair', 'Wigs', 'Hair Extensions', 'Styling Tools', 'Beauty', 'Dreamhair Crowns', 'Luxury'],
	themeColor: '#D4AF37',
	openGraph: {
		title: 'DREAMHAIR CROWNS | Premium Wigs & Hair Extensions',
		description: "Shop premium Brazilian hair, exclusive wigs, and electronic styling tools. Crown yourself in luxury.",
		url: 'https://dreamhair-crowns.com',
		siteName: 'DREAMHAIR CROWNS',
		images: [
			{
				url: '/Logo.jpg', // We need to update this later when we have a logo
				width: 800,
				height: 600,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
};


import Footer from '@/components/Footer/Footer';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className="scroll-smooth">
			<body className={`antialiased min-h-screen bg-black text-white`}>
				<Navbar />
				{children}
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}