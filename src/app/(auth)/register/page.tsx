'use client'
import { Button } from "@/components/ui/button";
import { getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { registerSchema } from "./schema"
import { useFormState, useFormStatus } from "react-dom";
import { register } from "./action";

export default function Example() {
	const [lastResult, action] = useFormState(register, undefined);
	const [form, fields] = useForm({
		// Sync the result of last submission
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: registerSchema });
		},
		// Validate the form on blur event triggered
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	});
	const status = useFormStatus();
	return (
		<form className="max-w-prose p-10" method="POST" encType="multipart/form-data" id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
			<div className="space-y-12">
				<div className="border-b border-white/10 pb-12">
					<h2 className="text-2xl mb-4 sm:text-3xl font-semibold leading-7 text-layer-13">Registration Form</h2>
					<p className="mt-1 text-sm leading-6 text-layer-11">
						{/* little description about registration form */}
						Please fill out the form below to help us with registering your profile as an osteopath.
					</p>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
								Email Address
							</label>
							<div className="mt-2">
								<input
									key={fields.email.key}
									name={fields.email.name}
									defaultValue={fields.email.initialValue}
									id="email"
									type="email"
									autoComplete="email"
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label htmlFor="about" className="block text-sm font-medium leading-6 text-white">
								About
							</label>
							<div className="mt-2">
								<textarea
									id="about"
									key={fields.about.key}
									name={fields.about.name}
									defaultValue={fields.about.initialValue}
									rows={3}
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								/>
							</div>
							<p className="mt-3 text-sm leading-6 text-layer-11">Write a few sentences about yourself.</p>
						</div>
						<div className="col-span-full">
							<label htmlFor="documents" className="block text-sm font-medium leading-6 text-white">
								Documents
							</label>
							<input
								className="mt-4"
								multiple
								{...getInputProps(fields.files, { type: 'file' })}
							/>
							{Array.isArray(fields.files.value) && fields.files.value.map((file, i) => {
								return <div key={i}>{file.name}</div>
							})}
							<div>
								{Object.entries(fields.files.allErrors).flatMap(
									([, messages]) => messages,
								)}
							</div>
						</div>
					</div>
				</div>

			</div>

			<div className="mt-6 flex items-center justify-start gap-x-6">
				<Submit/>
			</div>
		</form>
	)
}

function Submit() {
	// ✅ `pending` will be derived from the form that wraps the Submit component
	const { pending } = useFormStatus();
	return <Button disabled={pending} type="submit" variant="default" size="sm">
		Submit
	</Button>
}