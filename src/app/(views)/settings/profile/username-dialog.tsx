'use client'
import * as React from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UsernameForm } from './username-form'

export function UsernameFormDialog(props: {action: (userId:string,username:string) => any}) {
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
				<UsernameForm className="px-4" />
				<DrawerFooter className="pt-2"></DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
