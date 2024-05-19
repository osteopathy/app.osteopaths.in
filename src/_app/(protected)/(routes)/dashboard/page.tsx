import { validateRequest } from '@/lib/auth';
import { redirect } from "next/navigation";


export default async function DashboardPage() {
    const {user, session} = await validateRequest();

    if (user) {
        redirect('/appointments');
    } else {
        redirect('/');
    }

	return (
		<>
			<div>
			</div>
		</>
	)
}

