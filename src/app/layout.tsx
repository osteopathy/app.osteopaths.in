import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ERP for Osteopaths',
	description: 'A web app for osteopaths to manage their patients and appointments',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={manrope.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
