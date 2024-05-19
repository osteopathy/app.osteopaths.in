'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeftIcon, CalendarIcon, InboxIcon, SettingsIcon, StethoscopeIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function AppTopNavbar(props: { sticky?: boolean; title?: string }) {
	const router = useRouter()
	return (
		<header
			className={cn(
				'z-10 flex bg-layer-0 text-layer-12 p-3 w-full justify-between border-b',
				props.sticky && 'sticky top-0'
			)}
		>
			<div className="flex gap-x-4 items-center">
				<button
					type="button"
					onClick={() => {
						router.back()
					}}
				>
					<ArrowLeftIcon className="size-8" />
				</button>
				{props?.title && <h3 className="text-xl">{props.title}</h3>}
			</div>
			<slot />
		</header>
	)
}
export function BottomBar() {
	const pathname = usePathname()

	const routes = useMemo(
		() => [
			{
				id: 'appointments',
				value: '/appointments',
				label: 'Appointments',
				icon: CalendarIcon,
			},
			{
				id: 'inbox',
				value: '/inbox',
				label: 'Inbox',
				icon: InboxIcon,
			},
			{
				id: 'patients',
				value: '/patients',
				label: 'Patients',
				icon: StethoscopeIcon,
			},
			{
				id: 'setting',
				value: '/settings',
				label: 'Settings',
				icon: SettingsIcon,
			},
		],
		[]
	)

	const [currentRouteID, setCurrentRouteID] = useState(routes.find((route) => route.value === pathname)?.id)

	useEffect(() => {
		setCurrentRouteID(routes.find((route) => route.value === pathname)?.id)
	}, [pathname, routes])

	useEffect(() => {
		console.log('CURRENT ROUTE', currentRouteID)
	}, [currentRouteID])

	return (
		<nav className="fixed bottom-0 start-1/2 flex w-full max-w-screen-sm -translate-x-1/2 justify-around sm:bottom-4 rtl:translate-x-1/2">
			{routes.map((route, i) => {
				const Icon = route.icon
				return (
					<Link
						href={route.value}
						key={route.id}
						aria-current={currentRouteID === route.id ? 'page' : 'false'}
						className="group flex w-full items-center justify-center bg-indigo-500/10 py-3 transition-colors duration-300 ease-out hover:bg-indigo-100 aria-[current='page']:bg-indigo-500/40 first:sm:rounded-l-full last:sm:rounded-r-full aria-[current='page']:bg-indigo-500 dark:hover:bg-indigo-500/5 dark:aria-[current='page']:bg-indigo-500/40"
					>
						<div className="flex flex-col items-center gap-y-2">
							<Icon className="h-8 w-8 text-indigo-600 group-hover:text-indigo-500 group-aria-[current='page']:text-white dark:text-indigo-400" />
							<span className="text-xs text-indigo-600 group-hover:text-indigo-500 dark:text-indigo-400  group-aria-[current='page']:text-white">
								{route.label}
							</span>
						</div>
					</Link>
				)
			})}
		</nav>
	)
}
