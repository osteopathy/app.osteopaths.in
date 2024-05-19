import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { validateRequest } from '@/lib/auth'

export async function UserItem() {
	const { user, session } = await validateRequest()
	// TODO: get all data from session
	return (
		<>
			<div className="flex items-center justify-between gap-2 rounded-lg border border-neutral-200 p-2">
				<Avatar>
					<AvatarImage src="https://github.com/007qr.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="grow">
					<p className="text-[16px] font-bold">Ayush Patil</p>
					<p className="text-[12px] text-nuetral-500">james@gmail.com</p>
				</div>
			</div>
		</>
	)
}
