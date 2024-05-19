"use client";
import { setUsername } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateRequest } from "@/lib/auth";
import { useSession } from "@/lib/auth/session-provider";
import { cn } from "@/lib/utils";

export function UsernameForm({ className }: React.ComponentProps<'form'>) {
    const { user } = useSession();
	if (!user) return null;
    let err = null;
	return (
		<form className={cn('grid items-start gap-4', className)} action={async (formData: FormData) => {
            const username = formData.get('username');
            if(!username) return;
            const res = await setUsername(user.id, username.toString())
            res.error && (err = res.message)
          }}>
			<div>
				<Label htmlFor="username">Username</Label>
				<div className="mt-2 flex rounded-md shadow-sm">
					<span className="inline-flex items-center rounded-l-md border border-r-0 border-layer-8 px-3 text-layer-11 sm:text-sm">
						osteopaths.in/
					</span>
					<Input
						type="text"
						name="username"
						id="username"
						autoComplete="username"
						className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-0 ring-1 ring-inset ring-layer-8 focus:ring-2 focus:ring-inset focus-visible:ring-offset-0"
					/>
				</div>
                {err && <p>{err}</p>}
			</div>
			<Button type="submit" variant="secondary" size="sm" className="w-max">
				Submit changes
			</Button>
		</form>
	)
}
