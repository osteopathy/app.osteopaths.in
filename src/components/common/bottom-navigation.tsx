'use client'
import { usePathname } from 'next/navigation'
import { Settings, Calendar, Patients, Notification } from '@/components/icons'
import Link from 'next/link'

const routes = [
	{ pathname: '/', icon: <Calendar /> },
	{ pathname: '/patients', icon: <Patients /> },
	{ pathname: '/notifications', icon: <Notification /> },
	{ pathname: '/settings', icon: <Settings /> },
]

export default function BottomNavigation() {
	const pathname = usePathname()
	return (
		<>
			<div className="sm:hidden bottom-0 absolute max-w-[320px] w-full right-1/2 translate-x-1/2">
				<div className="border border-slate-200 my-[16px] p-3 rounded-3xl mx-[12px] shadow-lg flex items-center justify-between">
					{routes.map((route) => (
						<Link key={route.pathname} href={route.pathname}>
							<div
								className={`${
									pathname == route.pathname ? 'bg-black/90 fill-white ' : 'bg-black/10 fill-black '
								} p-1.5 rounded-2xl`}
							>
								{route.icon}
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	)
}
