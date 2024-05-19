import { Label } from '@/components/ui/label'
import { AppTopNavbar } from '../../navbars'
import { Input } from '@/components/ui/input'
import { UsernameFormDialog } from './username-dialog'
import { setUsername } from '@/actions'
import { validateRequest } from '@/lib/auth'

// Form fields:
// - Username
// - About
// - Profile Picture
// - Display Name
// - Email
// - Phone Number
// - Location (City, State, Country)
// - Social Media Links

export default async function ProfilePage() {
	const { user, session } = await validateRequest();
	if(!user) return null;
	return (
		<>
			<AppTopNavbar title="Profile" />
			<div className="flex w-full flex-col gap-y-6 px-4 py-6 sm:p-6 lg:pb-8">
				{/*  Profile section */}
				<div>
					<div className="">
						<h2 className="text-lg font-medium leading-6 text-layer-12">Profile</h2>
						<p className="mt-1 text-sm text-layer-11">
							This information will be displayed publicly so be careful what you share.
						</p>
					</div>
					<div className="flex-grow mt-6 space-y-6">
						<div>
							<Label htmlFor="username">Username</Label>
							<div className="my-2 flex rounded-md shadow-sm">
								<span className="inline-flex items-center rounded-l-md border border-r-0 border-layer-8 px-3 text-layer-11 sm:text-sm">
									osteopaths.in/
								</span>
								<Input
									readOnly={true}
									type="text"
									name="username"
									id="username"
									autoComplete="username"
									className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-0 ring-1 ring-inset ring-layer-8 focus:ring-2 focus:ring-inset focus-visible:ring-offset-0"
								/>
							</div>
							<UsernameFormDialog action={setUsername} />
						</div>
						<div>
							<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
								About
							</label>
							<div className="mt-2">
								<textarea
									id="about"
									name="about"
									rows={3}
									className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-layer-border-layer-8 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
									defaultValue={''}
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500">
								Brief description for your profile. URLs are hyperlinked.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
