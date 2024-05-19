import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    const routes = [
		{
			id: 'profile',
			label: 'Profile',
			value: '/settings/profile'
		},
		{
			id: 'account',
			label: 'Account',
			value: '/settings/account'
		},
		{
			id: 'availability',
			label: 'Availability',
			value: '/settings/availability'
		},
		{
			id: 'preferences',
			label: 'Preferences',
			value: '/settings/preferences'
		}
	];
    return <div className="flex w-full flex-col items-stretch justify-start">
	{routes.map(route => {
        return (
		<Link key={route.id} className="group flex w-full items-center justify-between border-b p-4 text-2xl font-light tracking-wide" href={route.value}>
			{route.label}
            <ArrowRightIcon className="h-8 w-8" />
		</Link>
        )
    })}
	<Link
		className="flex w-full items-center justify-between border-b bg-destructive p-4 text-2xl tracking-wide text-destructive-foreground"
		href="/google/logout"
	>
		Logout
		<ArrowRightIcon className="h-8 w-8" />
	</Link>
</div>
}