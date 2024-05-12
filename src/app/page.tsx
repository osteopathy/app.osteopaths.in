import { GoogleIcon } from "@/components/icons";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, UserCircle2Icon, FilePlus2Icon } from "lucide-react";
import Link from "next/link";

function RegistrationForm() {
	return (
		<div className="w-full max-w-prose flex flex-col items-center justify-center">
			<div className="mb-12 w-full">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900">Fill the Form for registration</h2>
				<p className="mt-6 text-lg leading-8 text-gray-600">
					{/* write a description for user to enter details for registration as osteopath */}
					We will get back to you as soon as possible.
				</p>
			</div>
			<form action="#" method="POST" className="w-full">
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-6">
					<div className="sm:col-span-3">
						<label htmlFor="full-name" className="block text-sm font-semibold leading-6 text-gray-900">
							Full Name
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="full-name"
								id="full-name"
								autoComplete="name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-4">
						<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
							Email
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-4">
						<label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
							Phone Number
						</label>
						<div className="mt-2.5">
							<input
								type="tel"
								name="phone-number"
								id="phone-number"
								autoComplete="tel"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-6">
						<label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
							About
						</label>
						<div className="mt-2.5">
							<textarea
								name="about"
								id="about"
								rows={3}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								defaultValue={''}
							/>
						</div>
						<button
							type="button"
							className="relative mt-12 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<FilePlus2Icon className="mx-auto h-12 w-12 text-gray-400"/>
							<span className="mt-2 block text-sm font-semibold text-gray-900">add your documents here</span>
						</button>
					</div>
				</div>

				<div className="mt-8 flex justify-start">
					<Button>Submit</Button>
				</div>
			</form>
		</div>
	)
}

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<RegistrationForm />
		</main>
	)
}

function LoginBox() {
	return <div className="relative flex max-w-64 flex-col gap-y-4">
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
				<GoogleIcon className="w-5 h-5" />Continue with Google <ArrowRightIcon />
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
}