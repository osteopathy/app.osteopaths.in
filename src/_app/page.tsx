import { GoogleIcon } from '@/components/icons'
import { Logo } from '@/components/icons/Logo'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, UserCircle2Icon } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<LoginBox />
		</main>
	)
}

function LoginBox() {
	return (
		<div className="relative flex max-w-64 flex-col gap-y-4">
			<div className="flex flex-col">
				<div className="flex items-center gap-x-4">
					<Logo size={64} />
					<h3 className="text-4xl italic font-bold">V2O</h3>
				</div>
				{/* <p className="mt-2 text-right">venture to osteopathy</p> */}
				<p className="my-2">web app, for osteopaths</p>
			</div>
			<Button size="sm" className="group w-full justify-between gap-x-2" variant="outline" asChild>
				<Link className="flex gap-x-2" href="/google/login">
					<GoogleIcon className="w-5 h-5" />
					Continue with Google <ArrowRightIcon />
				</Link>
			</Button>
			<div className="flex items-center gap-x-4">
				<div className="w-full h-px rounded-full bg-layer-8"></div>
				<span>OR</span>
				<div className="w-full h-px rounded-full bg-layer-8"></div>
			</div>
			<Button size="sm" className="group w-full justify-between gap-x-2" variant="outline" asChild>
				<Link className="flex gap-x-2" href="google/form">
					<UserCircle2Icon className="w-5 h-5" /> Yet, to register? <ArrowRightIcon />
				</Link>
			</Button>
		</div>
	)
}
