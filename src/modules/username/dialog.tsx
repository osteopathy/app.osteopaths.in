'use client'
import * as React from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { UsernameForm } from './index'

export function UsernameFormDialog() {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">Update Username</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<UsernameForm />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">Update Username</Button>
			</DrawerTrigger>
			<DrawerContent>
				<UsernameForm />
				<DrawerFooter className="pt-2"></DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
