'use client'
import { useTheme } from 'next-themes'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ComputerIcon, MoonIcon, SunIcon } from 'lucide-react'

export function SelectTheme() {
	const { theme, setTheme } = useTheme()
	return (
		<Select defaultValue={theme} onValueChange={(value) => setTheme(value)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Theme" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">
					<span className="flex items-center gap-x-2">
						<SunIcon className="size-5" />
						Light
					</span>
				</SelectItem>
				<SelectItem value="dark">
					<span className="flex items-center gap-x-2">
						<MoonIcon className="size-5" />
						Dark
					</span>
				</SelectItem>
				<SelectItem value="system">
					<span className="flex items-center gap-x-2">
						<ComputerIcon className="size-5" />
						System
					</span>
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
