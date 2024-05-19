'use client'
import { Button } from "@/components/ui/button";
import { FilePlus2Icon } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";

import * as z from 'zod';

const phoneNumberRegExp = new RegExp(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);

const registrationFormSchema = z.object({
	fullName: z.string().min(1, {message: 'Full name is required.'}),
	email: z.string({required_error: 'Email is required.'}).email({message: 'Enter a valid email.'}),
	phoneNumber: z.string().regex(phoneNumberRegExp, 'Enter a valid phone number.'),
	about: z.string().min(1, {message: 'About is required.'}).max(300, {message: 'You can only enter upto 300 characters.'}),
})

const defaultValues = {
	about: '',
	email: '',
	fullName: '',
	phoneNumber: ''
};

type registrationForm = z.infer<typeof registrationFormSchema>;

export function RegistrationForm() {

	const {register, handleSubmit, formState: {errors}} = useForm<registrationForm>({
		resolver: zodResolver(registrationFormSchema),
		defaultValues

	});

	const onFormSubmit = (values: registrationForm) => {
		console.log(values);
	}

	return (
		<div className="w-full max-w-prose flex flex-col items-center justify-center">
			<div className="mb-10 w-full">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900">Fill the Form for registration</h2>
				<p className="mt-2 text-lg leading-8 text-gray-600">
					{/* write a description for user to enter details for registration as osteopath */}
					We will get back to you as soon as possible.
				</p>
			</div>
			<form action="#" method="POST" className="w-full" onSubmit={handleSubmit(onFormSubmit)}>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-6">
					<div className="sm:col-span-3">
						<label htmlFor="full-name" className="block text-sm font-semibold leading-6 text-gray-900">
							Full Name
						</label>
						<div className="mt-2.5">
							<input
								{...register('fullName')}
								type="text"
								name="fullName"
								id="full-name"
								autoComplete="name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
						</div>
					</div>
					<div className="sm:col-span-4">
						<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
							Email
						</label>
						<div className="mt-2.5">
							<input
								{...register('email')}
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
						</div>
					</div>
					<div className="sm:col-span-4">
						<label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
							Phone Number
						</label>
						<div className="mt-2.5">
							<input
								{...register('phoneNumber')}
								type="tel"
								name="phoneNumber"
								id="phone-number"
								autoComplete="tel"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="text-red-500 text-sm mt-1">{errors.phoneNumber?.message}</p>
						</div>
					</div>
					<div className="sm:col-span-6">
						<label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
							About
						</label>
						<div className="mt-2.5">
							<textarea
								{...register('about')}
								name="about"
								id="about"
								rows={3}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								defaultValue={''}
							/>
							<p className="text-red-500 text-sm mt-1">{errors.about?.message}</p>
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
					<Button type='submit'>Submit</Button>
				</div>
			</form>
		</div>
	)
}
