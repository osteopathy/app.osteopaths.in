import { AppTopNavbar } from '../../navbars'
import { SelectTheme } from './select-theme'

// Features to be implemented:
// - Select Theme
// - Select Booking Strategy
// - Toggle, Pre Request Approval for Booking

export default async function PreferencesPage() {
	return (
		<>
			<AppTopNavbar />
			<div className="flex w-full flex-col gap-y-6 px-4 py-6 sm:p-6 lg:pb-8">
				<div className="flex flex-col gap-x-4 justify-between">
					<h3 className="mb-4 font-semibold text-xl">Theme</h3>
					<SelectTheme />
				</div>
			</div>
		</>
	)
}
