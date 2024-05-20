'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth/session-provider";
import { useEffect, useState } from "react";

export function UsernameForm({ actions }: { actions: { doesUsernameExist: (username: string) => Promise<boolean>; setUsername: (userId: string, username: string) => any; } }) {
    const [username, setUsername] = useState<string>('');
    const [usernameExist, setUsernameExist] = useState<boolean>(false);
    const { user } = useSession();

    useEffect(() => {
        const throttleTimer = setTimeout(async () => {
            setUsernameExist(await actions.doesUsernameExist(username));
        }, 1000);
        return () => {
            clearTimeout(throttleTimer);
        };
    }, [username, actions]);
    return (
        <>
            <div>
                <Input 
                    className="max-w-sm focus-visible:ring-offset-layer-4" 
                    onInput={(e) => {
                        setUsername(e.currentTarget.value)
                    }} 
                />
                {usernameExist && username !== '' && (<p>username already exist</p>)}
                <Button size='sm' className="mt-4" onClick={async () => {
                    if (!user) return null
                    await actions.setUsername(user.id, username)
                }}>
                    Submit
                </Button>
            </div>
        </>
    )
}