import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from "@/lib/auth/session-provider";
import { validateRequest } from '@/lib/auth';

import './globals.css'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ERP for Osteopaths',
	description: 'A web app for osteopaths to manage their patients and appointments',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await validateRequest();
	return (
		<html lang="en">
			<body className={manrope.className}>
				<SessionProvider value={session}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	)
}
