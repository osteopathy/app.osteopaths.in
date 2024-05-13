import { ReactNode } from 'react'
import Sidebar from '@/app/(protected)/(routes)/dashboard/_components/sidebar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<main className="flex justify-between items-start">
				<Sidebar />
				<div className="w-full h-full"> {children}</div>
			</main>
		</>
	)
}
