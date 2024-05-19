import Link from 'next/link'
import { UserItem } from './user-item'
import { Command, CommandItem, CommandList } from '@/components/ui/command'

const menuList = [
	{
		link: '/appointments',
		text: 'Appointments',
	},
	{
		link: '/patients',
		text: 'Patients',
	},
	{
		link: '/notifications',
		text: 'Notifications',
	},
	{
		link: '/settings',
		text: 'Settings',
	},
]

export default function Sidebar() {
	return (
		<>
			<div className="w-[300px] border-r min-h-screen p-4 flex flex-col gap-4 sticky top-0">
				<div className="">
					<UserItem />
				</div>
				<div className="grow ">
					<Command>
						<CommandList>
							{menuList.map((menuItems, idx) => (
								<Link href={menuItems.link} key={`${idx}-${menuItems.text}`}>
									<CommandItem>{menuItems.text}</CommandItem>
								</Link>
							))}
						</CommandList>
					</Command>
				</div>
				<div>Settings/Notification</div>
			</div>
		</>
	)
}
